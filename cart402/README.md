# Cart402 — Agentic Commerce on Base

> **Agents shop. USDC settles. On Base.**
> One-line x402 checkout for merchants · autonomous purchasing agents for buyers · USDC settlement on Base.
> Built as the application project for **Base Batches 004** (closes Sep 9, 2026). See `STRATEGY.md`, `APPLICATION.md`, `PIPELINE.md`.

## What this is

Cart402 closes the missing layer of the agent economy: **commerce**.

- **Merchant Checkout** — any product or API endpoint becomes agent-payable via one line of x402 middleware. Agents pay per request over `HTTP 402` (x402 `exact` scheme); settlement is USDC on Base via Circle's native EIP-3009 `transferWithAuthorization`. No accounts, no API keys, no chargebacks.
- **Agent Carts** — hosted autonomous purchasing agents with hard budget guardrails. They browse the catalog, **pay 0.01 USDC per market quote** (x402 micropayments), score options, buy, and settle the cart. Every step emits an onchain-verifiable receipt.
- **Agent Credit Bureau (Phase 2, live)** — a 5-factor credit score (0–1000) for any agent, computed from real settlement history (success rate 35% · USDC volume 25% · wallet age 15% · guardrail record 15% · category graph 10%). Lenders pay **0.01 USDC per score pull** via x402. We don't lend — zero balance sheet. Production version: EAS-attested scores + onchain registry.

## Running it (2 commands)

```bash
# terminal 1 — API server (port 4020)
cd server && npm install && npm run dev

# terminal 2 — dashboard (port 5173, proxies /api → 4020)
cd web && npm install && npm run dev
```

Open http://localhost:5173 → **Launch a shopping agent** → watch it pay, decide, settle, and produce receipts.

Terminal demo (server must be running):

```bash
cd server && BUDGET=30 PERSONA=noor npm run demo
```

## Modes

| | SIM (default) | LIVE |
|---|---|---|
| Chain params | base-sepolia (84532) | Base mainnet (8453) |
| Signatures | **real** EIP-712 / EIP-3009, verified by real secp256k1 recovery (viem) | same |
| Settlement | deterministic off-chain receipt (tx hash = keccak of the authorization) | the signed `transferWithAuthorization` is the actual USDC transfer to submit on Base |

Go live:

```bash
cd server
export CART402_MODE=live
export CART402_NETWORK=base            # or base-sepolia for testnet settlement
export CART402_MERCHANT_WALLET=0xYourMerchantWallet
export CART402_AGENT_KEY=0xAgentKey    # funded with USDC (+ ETH if self-custodied)
npm run dev
```

Testnet funds: Base Sepolia USDC via Circle faucet / airdrops, ETH for gas via any Base Sepolia faucet. (For production settlement you'd route the authorization through a facilitator or submit it from the merchant — that's program week 1.)

## The x402 flow (implemented faithfully)

1. Agent requests a protected resource → `402 Payment Required` with `accepts[]` (scheme `exact`, network, `maxAmountRequired`, `payTo`, USDC asset address).
2. Agent signs an **EIP-3009 `TransferWithAuthorization`** (USDC domain: `USDC` / v2 / chainId / USDC contract) as EIP-712 typed data.
3. Agent retries with `X-PAYMENT: base64url(JSON{x402Version, scheme, network, payload{signature, authorization}})`.
4. Server checks payTo / amount / expiry, **recovers the signer** from the signature, settles, fulfills.

Protocol refs: [x402.org](https://x402.org), x402 Foundation (Linux Foundation), Circle USDC `transferWithAuthorization` docs.

## Architecture

```
cart402/
├── STRATEGY.md          # why this wins Base Batches 004 (gap analysis, moat, plan)
├── APPLICATION.md       # Base Batches written application + 90s video script
├── PIPELINE.md          # other open programs in the same category
├── server/              # Node 22 ESM + Express + viem
│   ├── index.js         # routes: catalog, x402-protected quote & orders, agents, SSE
│   ├── x402.js          # x402 middleware + client + EIP-3009 verify/settle
│   ├── agent.js         # autonomous shopping agent (personas, guardrails, loop)
│   ├── bureau.js        # Agent Credit Bureau — 5-factor 0–1000 score engine
│   ├── catalog.js       # USDC-priced product catalog
│   ├── state.js         # ledger, stats, SSE bus
│   ├── config.js        # sim/live, chains, USDC addresses, wallets
│   └── demo-agent.mjs   # terminal demo of a full session
└── web/                 # Vite + React dashboard (dark, Base blue)
    └── src/
        ├── App.jsx      # hero, stats, agent console (SSE), catalog, settlements, merchant
        └── Bureau.jsx   # Agent Credit Bureau — credit files + x402-paid lender pull demo
```

## Roadmap (the 8-week program plan, from STRATEGY.md)

1. **Weeks 1–2** — live mainnet settlement (facilitator/merchant-submitted), CDP / Agentic Wallets integration, merchant SDK npm (`@cart402/checkout`).
2. **Weeks 3–4** — 10 live merchant endpoints (UAE digital services), Agent Carts v2 (multi-step goals, guardrails, refunds), **Agent Credit Bureau live** (EAS-attested scores, lender API GA).
3. **Weeks 5–6** — MENA beachhead: 10–20 UAE SME merchants, Arabic agent personas, USDC + AED-equivalent receipts.
4. **Weeks 7–8** — Agent.market listing, metrics push, **Demo Day**: live mainnet shopping, $ settled, merchant revenue + credit-score screen.

## Honest disclaimers

- SIM mode simulates block inclusion only — signatures, verification, protocol flow, and state are all real.
- Catalog is illustrative; in production each item is a real merchant endpoint behind the middleware.
- Company registration, traction numbers, and team details in `APPLICATION.md` are marked `[FILL]` — replace with real facts before submitting.
