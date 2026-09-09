// Cart402 — autonomous shopping agents.
//
// A session is a full agent-commerce loop over real HTTP:
//   1. bootstrap wallet (USDC on Base)
//   2. browse catalog (free endpoint)
//   3. pay per request (x402, 0.01 USDC) for live market quotes per category
//   4. score candidates under budget guardrails
//   5. settle the cart via a signed EIP-3009 USDC authorization (x402 exact)
//   6. emit a receipt (onchain-verifiable hash)

import { randomUUID } from 'node:crypto';
import { PORT, NETWORK, round2 } from './config.js';
import { emit, state } from './state.js';
import { CATALOG } from './catalog.js';
import { demoAgentAccount, signPayment, QUOTE_PRICE_USDC } from './x402.js';
import { scoreForWallet } from './bureau.js';

const SELF = `http://127.0.0.1:${PORT}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const jitter = (a, b) => a + Math.random() * (b - a);

export const PERSONAS = [
  {
    id: 'noor',
    name: 'Noor',
    title: 'Procurement Agent — Dubai dental clinic',
    focus: ['AI Services', 'Operations'],
    goal: 'Restock the clinic’s AI front-desk tooling within budget',
    style: 'conservative',
  },
  {
    id: 'atlas',
    name: 'Atlas',
    title: 'Creator Ops Agent — Riyadh media studio',
    focus: ['AI Services', 'Data & Feeds'],
    goal: 'Cover a launch-week content & analytics push',
    style: 'aggressive',
  },
  {
    id: 'vela',
    name: 'Vela',
    title: 'Logistics Optimizer Agent — Singapore hub',
    focus: ['Infrastructure', 'Operations', 'Data & Feeds'],
    goal: 'Keep the agent fleet’s operations running next month',
    style: 'balanced',
  },
];

export function startSession({ personaId, budgetUsdc, customGoal } = {}) {
  const persona = PERSONAS.find((p) => p.id === personaId) || PERSONAS[0];
  const session = {
    id: randomUUID().slice(0, 8),
    persona: { id: persona.id, name: persona.name, title: persona.title },
    focus: persona.focus,
    style: persona.style,
    goal: customGoal || persona.goal,
    budgetUsdc: round2(budgetUsdc),
    spentUsdc: 0,
    status: 'running',
    startedAt: Date.now(),
    wallet: null,
    orderId: null,
  };
  state.sessions.push(session);
  state.stats.agentsRun += 1;
  log(session, 'start', { goal: session.goal, budget: session.budgetUsdc, network: NETWORK });
  setImmediate(() =>
    runSession(session).catch((e) => {
      session.status = 'error';
      log(session, 'error', { error: String(e.message || e) });
    })
  );
  return session;
}

function log(session, type, payload) {
  emit(`agent.${type}`, { sessionId: session.id, agent: session.persona.name, payload });
}

async function runSession(session) {
  const wallet = demoAgentAccount();
  session.wallet = wallet.address;

  log(
    session,
    'thinking',
    `Bootstrapped agent wallet ${wallet.address} on ${NETWORK}. Settlement asset: USDC.`
  );
  await sleep(jitter(700, 1200));

  log(session, 'thinking', 'Fetching catalog (free endpoint)…');
  const products = CATALOG;
  log(session, 'catalog', { count: products.length, network: NETWORK });
  await sleep(jitter(500, 900));

  // --- Paid market quotes: real x402 round-trips, 0.01 USDC per call ---
  for (const category of session.focus.slice(0, 3)) {
    log(session, 'paying', `Paying ${QUOTE_PRICE_USDC} USDC via x402 for a live market quote (${category})…`);
    const res = await paidQuote(category, wallet);
    session.spentUsdc = round2(session.spentUsdc + QUOTE_PRICE_USDC);
    log(session, 'quote', {
      category,
      items: res.data.quote.items.map((i) => ({ id: i.id, priceUsdc: i.priceUsdc, trendPct: i.trendPct })),
      tx: res.receipt.txHash,
    });
    await sleep(jitter(800, 1400));
  }

  // --- Decision under budget guardrails ---
  const candidates = products.filter((p) => p.priceUsdc < session.budgetUsdc * 0.85);
  if (!candidates.length) {
    session.aborted = true;
    log(session, 'done', {
      aborted: true,
      reason: 'budget below guardrail minimum — no purchase. Guardrails working as designed.',
      spent: session.spentUsdc,
    });
    log(session, 'scored', scorePayload(wallet.address));
    session.status = 'done';
    return;
  }

  const scored = candidates
    .map((p) => {
      let score = 40;
      if (session.focus.includes(p.category)) score += 30;
      if (p.priceUsdc <= session.budgetUsdc * 0.5) score += 10;
      score += stableJitter(p.id);
      if (session.style === 'aggressive') score += 5;
      if (session.style === 'conservative' && p.priceUsdc > session.budgetUsdc * 0.45) score -= 8;
      return { item: p, score: Math.round(score), reason: reasonFor(p, session) };
    })
    .sort((a, b) => b.score - a.score);

  log(session, 'deciding', {
    top: scored.slice(0, 4).map((s) => ({ name: s.item.name, score: s.score, reason: s.reason })),
  });
  await sleep(jitter(900, 1500));

  const cart = [];
  let total = 0;
  for (const s of scored) {
    if (cart.length >= 3) break;
    if (total + s.item.priceUsdc <= session.budgetUsdc) {
      cart.push(s.item);
      total = round2(total + s.item.priceUsdc);
    }
  }
  if (!cart.length) {
    session.aborted = true;
    log(session, 'done', {
      aborted: true,
      reason: 'no combination fit the budget guardrail — no purchase.',
      spent: session.spentUsdc,
    });
    log(session, 'scored', scorePayload(wallet.address));
    session.status = 'done';
    return;
  }

  // --- Settle the cart over x402 (signed EIP-3009 USDC authorization) ---
  log(
    session,
    'ordering',
    `Settling ${cart.length} item(s) for ${total} USDC — signing EIP-3009 authorization, merchant wallet receives USDC on ${NETWORK}…`
  );
  const order = await placeOrder(session, cart, wallet);
  session.spentUsdc = round2(session.spentUsdc + order.totalUsdc);
  session.orderId = order.id;
  log(session, 'receipt', {
    orderId: order.id,
    total: order.totalUsdc,
    tx: order.settlement.txHash,
    items: order.lines.map((l) => l.name),
    mode: order.settlement.mode,
  });
  await sleep(400);
  log(session, 'done', {
    spent: session.spentUsdc,
    budget: session.budgetUsdc,
    remaining: round2(session.budgetUsdc - session.spentUsdc),
    items: cart.length,
    receipt: { tx: order.settlement.txHash, mode: order.settlement.mode },
  });
  log(session, 'scored', scorePayload(wallet.address));
  session.status = 'done';
}

function scorePayload(walletAddress) {
  const file = scoreForWallet(walletAddress);
  return {
    score: file.score,
    category: file.category,
    factors: file.factors,
    basis: file.basis,
  };
}

async function paidQuote(category, wallet) {
  const url = `${SELF}/api/market/quote?category=${encodeURIComponent(category)}`;
  let r = await fetch(url);
  if (r.status === 402) {
    const body = await r.json();
    const spec = body.accepts[0];
    const header = await signPayment(wallet, { amount: spec.maxAmountRequired, payTo: spec.payTo });
    r = await fetch(url, { headers: { 'X-PAYMENT': header } });
  }
  if (r.status !== 200) throw new Error(`quote failed: HTTP ${r.status} ${await r.text()}`);
  const body = await r.json();
  return { data: body, receipt: body.payment };
}

async function placeOrder(session, cart, wallet) {
  const body = {
    agent: { name: session.persona.name, id: session.id },
    items: cart.map((i) => ({ id: i.id, qty: 1 })),
  };
  const url = `${SELF}/api/orders`;
  const post = (headers = {}) =>
    fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...headers },
      body: JSON.stringify(body),
    });

  let r = await post();
  if (r.status === 402) {
    const accepts = (await r.json()).accepts[0];
    const header = await signPayment(wallet, { amount: accepts.maxAmountRequired, payTo: accepts.payTo });
    r = await post({ 'X-PAYMENT': header });
  }
  if (r.status !== 200) throw new Error(`order failed: HTTP ${r.status} ${await r.text()}`);
  return r.json();
}

function stableJitter(id) {
  let h = 0;
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) % 997;
  return h % 16;
}

function reasonFor(p, session) {
  if (session.focus.includes(p.category)) return `matches goal focus (${p.category})`;
  if (p.priceUsdc <= session.budgetUsdc * 0.3) return 'high value per USDC, leaves budget headroom';
  return 'fills remaining budget efficiently';
}
