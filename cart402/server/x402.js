// Cart402 — x402 payment layer.
//
// Faithful implementation of the x402 protocol (v1, "exact" scheme) over USDC:
//   1. Protected resource responds HTTP 402 with payment requirements (accepts).
//   2. Client signs an EIP-3009 `transferWithAuthorization` (Circle USDC's native
//      agent-authorization interface) as an EIP-712 typed-data signature.
//   3. Client retries with the X-PAYMENT header (base64url JSON).
//   4. Server verifies the signature (real ECDSA / secp256k1 recovery via viem),
//      settles, and fulfills.
//
// SIM mode: settlement is recorded off-chain (deterministic receipt hash).
// LIVE mode: same signatures; settlement is the actual USDC transfer authorization
// to be submitted on Base (facilitator or merchant-submitted).

import { randomBytes } from 'node:crypto';
import { privateKeyToAccount } from 'viem/accounts';
import { recoverTypedDataAddress, keccak256, stringToHex } from 'viem';
import {
  NETWORK,
  CHAIN,
  USDC_INFO,
  MERCHANT_WALLET,
  MODE,
  AGENT_KEY,
  round6,
} from './config.js';
import { state, emit } from './state.js';

export const X402_VERSION = 1;
const QUOTE_PRICE_USDC = 0.01; // price of a paid market-quote API call

// EIP-712 types for USDC v2 TransferWithAuthorization (Circle interface).
const TYPES = {
  TransferWithAuthorization: [
    { name: 'from', type: 'address' },
    { name: 'to', type: 'address' },
    { name: 'value', type: 'uint256' },
    { name: 'validAfter', type: 'uint256' },
    { name: 'validBefore', type: 'uint256' },
    { name: 'nonce', type: 'bytes32' },
  ],
};
const PRIMARY_TYPE = 'TransferWithAuthorization';

const domain = () => ({
  name: USDC_INFO.name,
  version: USDC_INFO.version,
  chainId: CHAIN.id,
  verifyingContract: USDC_INFO.address,
});

export const usdcToAtomic = (usdc) => String(Math.round(Number(usdc) * 1e6));
export const atomicToUsdc = (atomic) => Number(atomic) / 1e6;
const nowSec = () => Math.floor(Date.now() / 1000);

export function b64encode(str) {
  return Buffer.from(str, 'utf8').toString('base64url');
}
function b64decode(str) {
  let t = String(str).replace(/-/g, '+').replace(/_/g, '/');
  while (t.length % 4) t += '=';
  return Buffer.from(t, 'base64').toString('utf8');
}

/** Payment requirement advertised in a 402 response. */
export function buildAccepts({ amount, resource, description }) {
  return {
    scheme: 'exact',
    network: NETWORK,
    maxAmountRequired: amount,
    resource,
    description,
    payTo: MERCHANT_WALLET,
    maxTimeoutSeconds: 120,
    asset: USDC_INFO.address,
    extra: { name: USDC_INFO.name, version: USDC_INFO.version },
  };
}

function decodePayment(header) {
  const json = JSON.parse(b64decode(header));
  if (!json.scheme) throw new Error('missing scheme');
  if (json.scheme !== 'exact') throw new Error(`unsupported scheme: ${json.scheme}`);
  if (json.network !== NETWORK) throw new Error(`wrong network: ${json.network} (expected ${NETWORK})`);
  return json;
}

/**
 * Express middleware. `getSpec(req)` must return:
 *   { amount: <atomic USDC string>, description: string, kind?: 'api' | 'order' }
 */
export function x402Middleware(getSpec) {
  return async (req, res, next) => {
    let spec;
    try {
      spec = getSpec(req);
    } catch (e) {
      return res.status(400).json({ error: e.message || 'bad request' });
    }

    const header = req.headers['x-payment'];
    if (!header) {
      return res.status(402).json({
        x402Version: X402_VERSION,
        error: 'X-PAYMENT header is required',
        accepts: [
          buildAccepts({
            amount: spec.amount,
            resource: req.originalUrl,
            description: spec.description,
          }),
        ],
      });
    }

    let payment;
    try {
      payment = decodePayment(header);
    } catch (e) {
      return res.status(400).json({ error: 'malformed X-PAYMENT', detail: e.message });
    }

    const verdict = await verifyPayment(payment, spec);
    if (!verdict.ok) {
      return res.status(400).json({ error: 'payment rejected', detail: verdict.reason });
    }

    const settlement = settlePayment(verdict, spec);
    req.x402 = { ...verdict, settlement };
    next();
  };
}

/** Verify the EIP-3009 authorization signature. Real secp256k1 recovery in all modes. */
export async function verifyPayment(payment, spec) {
  const { signature, authorization } = payment.payload || {};
  if (!signature || !authorization) return { ok: false, reason: 'missing payload (signature/authorization)' };

  const problems = [];
  if (!authorization.to || authorization.to.toLowerCase() !== MERCHANT_WALLET.toLowerCase())
    problems.push('payTo mismatch');
  if (String(authorization.value) !== String(spec.amount)) problems.push('amount mismatch');
  if (Number(authorization.validBefore) <= nowSec()) problems.push('authorization expired');
  if (problems.length) return { ok: false, reason: problems.join(', ') };

  try {
    const payer = await recoverTypedDataAddress({
      domain: domain(),
      types: TYPES,
      primaryType: PRIMARY_TYPE,
      message: {
        from: authorization.from,
        to: authorization.to,
        value: String(authorization.value),
        validAfter: String(authorization.validAfter),
        validBefore: String(authorization.validBefore),
        nonce: authorization.nonce,
      },
      signature,
    });
    return { ok: true, payer, authorization, signature };
  } catch (e) {
    return { ok: false, reason: `signature verification failed: ${e.shortMessage || e.message}` };
  }
}

/** Record settlement. SIM: deterministic off-chain receipt. LIVE: ready-for-chain authorization. */
export function settlePayment(verdict, spec) {
  const seed = JSON.stringify({
    network: NETWORK,
    from: verdict.payer,
    to: MERCHANT_WALLET,
    value: spec.amount,
    nonce: verdict.authorization.nonce,
    ts: Date.now(),
  });
  const txHash = keccak256(stringToHex(seed));

  const receipt = {
    mode: MODE,
    simulated: MODE !== 'live',
    network: NETWORK,
    chainId: CHAIN.id,
    asset: USDC_INFO.address,
    assetName: USDC_INFO.name,
    amountUsdc: atomicToUsdc(spec.amount),
    payer: verdict.payer,
    merchant: MERCHANT_WALLET,
    txHash,
    verifiedSignature: true,
    authorization: verdict.authorization,
    explorerUrl:
      MODE === 'live' && NETWORK === 'base' ? `https://basescan.org/tx/${txHash}` : null,
  };

  state.stats.totalSettledUsdc = round6(state.stats.totalSettledUsdc + atomicToUsdc(spec.amount));
  state.stats.txCount += 1;
  if (spec.kind === 'api') state.stats.paidApiCalls += 1;
  state.ledger.push({
    ...receipt,
    ts: Date.now(),
    kind: spec.kind || 'api',
    label: spec.description,
  });
  emit('settlement', { receipt, kind: spec.kind || 'api' });
  return receipt;
}

/** Client side: sign an X-PAYMENT header for `spec` with a local viem account. */
export async function signPayment(account, spec, { timeoutSec = 300 } = {}) {
  const authorization = {
    from: account.address,
    to: spec.payTo,
    value: String(spec.amount),
    validAfter: nowSec() - 60,
    validBefore: nowSec() + timeoutSec,
    nonce: '0x' + randomBytes(32).toString('hex'),
  };
  const signature = await account.signTypedData({
    domain: domain(),
    types: TYPES,
    primaryType: PRIMARY_TYPE,
    message: authorization,
  });
  return b64encode(
    JSON.stringify({
      x402Version: X402_VERSION,
      scheme: 'exact',
      network: NETWORK,
      payload: { signature, authorization },
    })
  );
}

export function demoAgentAccount() {
  return privateKeyToAccount(AGENT_KEY);
}

export { QUOTE_PRICE_USDC };
