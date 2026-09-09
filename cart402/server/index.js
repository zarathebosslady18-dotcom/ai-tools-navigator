// Cart402 server — agentic commerce on Base.
// x402 (exact scheme) · USDC on Base · EIP-3009 agent-authorized transfers.

import express from 'express';
import cors from 'cors';
import { PORT, MODE, NETWORK, CHAIN, USDC_INFO, MERCHANT_WALLET, round2 } from './config.js';
import { CATALOG, CATEGORIES } from './catalog.js';
import { state, emit, subscribe, unsubscribe, recentEvents } from './state.js';
import { x402Middleware, usdcToAtomic, QUOTE_PRICE_USDC, signPayment, demoAgentAccount } from './x402.js';
import { startSession, PERSONAS } from './agent.js';
import { scoreForWallet, scoreAll, WEIGHTS } from './bureau.js';

const app = express();
app.use(cors());
app.use(express.json());

// Friendly root — this port is the API; the dashboard is the web server (port 5173).
app.get('/', (req, res) =>
  res.json({
    name: 'Cart402 API',
    note: 'This is the API server. Open the Cart402 dashboard preview (port 5173) for the UI.',
    endpoints: {
      'GET /api/health': 'mode, network, USDC, merchant',
      'GET /api/products': 'catalog',
      'GET /api/personas': 'agent personas',
      'GET /api/market/quote?category=X': 'x402-protected — 402, then X-PAYMENT, 0.01 USDC',
      'POST /api/orders': 'x402-protected — settle a cart in USDC',
      'POST /api/agents': 'launch a shopping agent {personaId, budgetUsdc}',
      'GET /api/agents': 'sessions',
      'GET /api/state': 'stats, orders, ledger',
      'GET /api/events': 'SSE live stream',
    },
  })
);

app.get('/api/health', (req, res) =>
  res.json({
    name: 'Cart402',
    tagline: 'Agents shop. USDC settles. On Base.',
    mode: MODE,
    network: NETWORK,
    chain: CHAIN,
    usdc: USDC_INFO,
    merchant: MERCHANT_WALLET,
    time: Date.now(),
  })
);

app.get('/api/personas', (req, res) => res.json(PERSONAS));
app.get('/api/products', (req, res) => res.json(CATALOG));
app.get('/api/categories', (req, res) => res.json(CATEGORIES));

// ---- x402-protected: pay-per-request market quote (0.01 USDC per call) ----
app.get(
  '/api/market/quote',
  x402Middleware((req) => ({
    amount: usdcToAtomic(QUOTE_PRICE_USDC),
    description: `Live market quote — category: ${String(req.query.category || 'all')}`,
    kind: 'api',
  })),
  (req, res) => {
    const category = String(req.query.category || 'all');
    const items =
      category === 'all'
        ? CATALOG
        : CATALOG.filter((p) => p.category === category);
    const quote = {
      network: NETWORK,
      category,
      asOf: Date.now(),
      items: items.map((p) => {
        const drift = Math.round((Math.random() * 4 - 2) * 10) / 10; // ±2%
        return {
          id: p.id,
          name: p.name,
          priceUsdc: Math.round(p.priceUsdc * (1 + drift / 100) * 100) / 100,
          trendPct: drift,
        };
      }),
      settlement: `USDC on ${NETWORK}`,
    };
    res.json({ quote, payment: req.x402.settlement });
  }
);

// ---- x402-protected: settle an order (amount computed from cart) ----
app.post(
  '/api/orders',
  x402Middleware((req) => {
    const items = Array.isArray(req.body?.items) ? req.body.items : [];
    if (!items.length) throw new Error('order requires items[]');
    let total = 0;
    for (const it of items) {
      const p = CATALOG.find((x) => x.id === it?.id);
      if (!p) throw new Error(`unknown product id: ${it?.id}`);
      total += p.priceUsdc * (it.qty || 1);
    }
    return {
      amount: usdcToAtomic(total),
      description: `Order — ${items.length} item(s), agent ${req.body?.agent?.name || 'unknown'}`,
      kind: 'order',
      totalUsdc: round2(total),
    };
  }),
  (req, res) => {
    const lines = req.body.items
      .map((it) => {
        const p = CATALOG.find((x) => x.id === it?.id);
        return p ? { id: p.id, name: p.name, priceUsdc: p.priceUsdc, qty: it.qty || 1 } : null;
      })
      .filter(Boolean);
    const order = {
      id: 'ord_' + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36),
      agent: req.body.agent || null,
      lines,
      totalUsdc: round2(lines.reduce((s, l) => s + l.priceUsdc * l.qty, 0)),
      status: 'settled',
      createdAt: Date.now(),
      settlement: req.x402.settlement,
    };
    state.orders.push(order);
    state.stats.ordersCount += 1;
    emit('order', { order });
    res.json(order);
  }
);

// ---- Agent sessions ----
app.post('/api/agents', (req, res) => {
  const budget = Number(req.body?.budgetUsdc ?? 25);
  if (!Number.isFinite(budget) || budget < 5 || budget > 500) {
    return res.status(400).json({ error: 'budgetUsdc must be between 5 and 500' });
  }
  const s = startSession({
    personaId: req.body?.personaId,
    budgetUsdc: round2(budget),
    customGoal: typeof req.body?.goal === 'string' ? req.body.goal.slice(0, 200) : undefined,
  });
  res.json({ sessionId: s.id });
});

app.get('/api/agents', (req, res) =>
  res.json(
    state.sessions.map((s) => ({
      id: s.id,
      persona: s.persona,
      goal: s.goal,
      budgetUsdc: s.budgetUsdc,
      spentUsdc: s.spentUsdc,
      status: s.status,
      wallet: s.wallet,
      startedAt: s.startedAt,
    }))
  )
);

app.get('/api/state', (req, res) =>
  res.json({
    stats: state.stats,
    orders: state.orders.slice(-20).reverse(),
    ledger: state.ledger.slice(-20).reverse(),
    sessions: state.sessions.slice(-5).reverse(),
  })
);

// ---- SSE event stream ----
app.get('/api/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  if (res.flushHeaders) res.flushHeaders();
  res.write('retry: 1500\n\n');
  for (const e of recentEvents(30)) res.write(`data: ${JSON.stringify(e)}\n\n`);
  subscribe(res);
  req.on('close', () => unsubscribe(res));
});

// ---- Agent Credit Bureau ----
// Free: every agent's credit file (dashboard).
app.get('/api/bureau/agents', (req, res) =>
  res.json({ weights: WEIGHTS, agents: scoreAll() })
);

// x402-protected: lender score pull — 0.01 USDC per check.
app.get(
  '/api/bureau/score/:wallet',
  x402Middleware((req) => ({
    amount: usdcToAtomic(0.01),
    description: `Credit score pull — ${req.params.wallet}`,
    kind: 'api',
  })),
  (req, res) => {
    const wallet = String(req.params.wallet);
    if (!/^0x[0-9a-fA-F]{40}$/.test(wallet)) {
      return res.status(400).json({ error: 'invalid wallet address' });
    }
    res.json({ ...scoreForWallet(wallet), payment: req.x402.settlement });
  }
);

// Lender demo: full paid pull executed server-side (402 → sign → verify → score).
app.post('/api/bureau/lender-demo', async (req, res) => {
  const wallet = String(req.body?.wallet || '');
  if (!/^0x[0-9a-fA-F]{40}$/.test(wallet)) {
    return res.status(400).json({ error: 'invalid wallet address' });
  }
  const url = `http://127.0.0.1:${PORT}/api/bureau/score/${wallet}`;
  try {
    const s1 = await fetch(url);
    const s1Body = await s1.json();
    const lender = demoAgentAccount();
    const header = await signPayment(lender, {
      amount: s1Body.accepts[0].maxAmountRequired,
      payTo: s1Body.accepts[0].payTo,
    });
    const s2 = await fetch(url, { headers: { 'X-PAYMENT': header } });
    const s2Body = await s2.json();
    res.json({
      lender: lender.address,
      step1: { status: s1.status, body: s1Body },
      step2: { status: s2.status, body: s2Body },
    });
  } catch (e) {
    res.status(500).json({ error: String(e.message || e) });
  }
});

// JSON 404 for unknown API routes (instead of Express's HTML error page).
app.use('/api', (req, res) => res.status(404).json({ error: 'not found', path: req.originalUrl }));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Cart402 server — mode=${MODE} network=${NETWORK} — http://0.0.0.0:${PORT}`);
});
