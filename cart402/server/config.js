// Cart402 runtime configuration.
// SIM mode (default): base-sepolia chain parameters, off-chain simulated settlement.
// LIVE mode: Base mainnet (or base-sepolia) real settlement — set CART402_MODE=live + wallet envs.

export const PORT = Number(process.env.PORT || 4020);
export const MODE = process.env.CART402_MODE === 'live' ? 'live' : 'sim';

export const NETWORK = MODE === 'live' ? (process.env.CART402_NETWORK || 'base') : 'base-sepolia';

export const CHAINS = {
  base: { id: 8453, name: 'Base' },
  'base-sepolia': { id: 84532, name: 'Base Sepolia' },
};

export const USDC = {
  base: {
    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    name: 'USDC',
    version: '2',
    decimals: 6,
  },
  'base-sepolia': {
    address: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
    name: 'USDC',
    version: '2',
    decimals: 6,
  },
};

export const USDC_INFO = USDC[NETWORK] || USDC['base-sepolia'];
export const CHAIN = CHAINS[NETWORK] || CHAINS['base-sepolia'];

// Merchant wallet that receives USDC (the "payTo" of every x402 payment).
export const MERCHANT_WALLET =
  process.env.CART402_MERCHANT_WALLET || '0x0000000000000000000000000000000000402402';

// Agent signing key. SIM mode uses a well-known public test key (hardhat #0).
// For LIVE mode set CART402_AGENT_KEY to a real key funded with USDC (+ ETH for gas if self-custodied).
export const AGENT_KEY =
  process.env.CART402_AGENT_KEY ||
  '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d';

export const round2 = (n) => Math.round(Number(n) * 100) / 100;
export const round6 = (n) => Math.round(Number(n) * 1e6) / 1e6;
