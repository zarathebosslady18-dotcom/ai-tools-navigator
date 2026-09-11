# Cart402 — Winning Strategy for Base Batches 004

> Prepared 2026-09-09 (day Batch 004 applications close). Program: [base.org/batches](https://www.base.org/batches)
> $100K investment from Base Ecosystem Fund · 10 teams · 8-week virtual program · Demo Day NY, Nov 17 2026.

---

## 1. What Base is actually asking for (decoded)

From the official Batch 004 brief and launch coverage:

- Verticals: **trading, payments, agents, financing, asset issuance** — "to help grow the onchain economy on Base."
- Explicitly named targets (Coinbase launch coverage): *"products that use stablecoins for agent-driven shopping, trading, and payments, as well as infrastructure for lending, e-commerce, and decentralized AI."*
- Core thesis (Bronheim): *"Blockchains are the native financial rails for AI, and agents will soon drive much, much more onchain activity than humans do."*
- Eligibility: pre-product → post-MVP, **no formal Seed raised**, **Base must be the default network** (multi-chain OK, Base-first required).
- Proof of conviction beats slideware: Batch 003 was full of *working products* (x402 per-request payments, zkTLS credit, self-custodial neobank). A live demo is a selection criterion in practice.

**Translation:** the highest-probability win is a *shipping, Base-native product where an AI agent is the primary economic actor and USDC is the settlement rail* — specifically in the "agent-driven shopping / e-commerce / payments" lane they named but the last cohort left open.

## 2. Batch 003 gap analysis (what's crowded vs. open)

| Lane | Batch 003 incumbents | Status |
|---|---|---|
| Agentic payment **infrastructure** (clearing, routing, per-request infra) | Mica, Agently, Blockrun.ai | **Crowded** — do not compete here |
| Agent credit / lending | Floe Labs, Credifi, Tomorrow | **Crowded** |
| Trading / markets primitives | Forecast, Opal, Onsight, JPEG App | Crowded, capital-heavy |
| Consumer finance on Base | Liminal (AI-native neobank) | Partially covered |
| FX / hedging | Nivo | Covered |
| **The commerce layer: agents that SHOP, merchants that GET PAID** | — | **OPEN. This is the lane.** |

Nobody in 003 built the product where an agent *picks items, pays per API call while comparing prices, checks out, and the merchant's wallet receives USDC with an onchain receipt*. That is the "agent-driven shopping" Base literally named.

## 3. The product: Cart402 — agentic commerce on Base

**One-liner:** *Agents shop. USDC settles. On Base.*

Two halves, one loop:

1. **Merchant Checkout (the x402 line)** — one-line middleware that makes *any* product or API endpoint agent-payable over HTTP 402 / x402 `exact` scheme. Settlement is USDC on Base via signed EIP-3009 `transferWithAuthorization` (Circle's native USDC interface) — no crypto expertise, no accounts, no chargebacks, no API keys.
2. **Agent Carts (the buyer side)** — hosted, autonomous purchasing agents with budgets, guardrails, and receipts. They browse a catalog, *pay per request* (x402 micropayments) to fetch live market quotes, score options, buy, and settle the cart in USDC. Every step is an onchain-verifiable receipt.

**Killer demo (shipped in this repo, runs today):** launch an agent with a USDC budget → watch it pay 1¢ per API call for live quotes → watch it decide → watch it settle a full cart over x402 with a real signed EIP-3009 authorization and an onchain receipt hash.

### Why this wins
- **Exact brief match:** agent-driven shopping + payments + e-commerce + decentralized AI, all on Base, all in USDC.
- **Open lane:** not another infra layer under an already-funded infra layer; it's the *product layer on top* of x402 — complementary to Coinbase's own Agent.market (they need merchants who accept agent payments and agents that can complete a purchase with budget guardrails).
- **Working proof on day one:** the x402 payment flow, agent loop, and receipts are real code, not mockups. (Sim mode settles off-chain; signatures are real. Live mode = mainnet-ready, one env var.)
- **Distribution moat:** the team is Dubai-based with real SME relationships across UAE/GCC — the first "agent commerce for MENA" beachhead: Arabic-first, GCC settlement, USDC rails. No US cohort team has this.
- **Revenue is obvious:** merchant take-rate on agent settlements + hosted-agent subscription (SaaS on top of every x402 transaction).

### Phase 2 moat: Agent Credit (we don't fight the credit lane — we own its data)
Batch 003 already funded the credit lane (Floe Labs — onchain credit infra for agents; Credifi — credit scores + lending). We do **not** apply head-on into that lane. A credit bureau's fatal weakness is cold start: a scorer with no history scores no one. Being the commerce layer solves it: **every agent settlement through Cart402 is a credit event.** Phase 2 (program weeks 3–4) ships an Agent Credit Bureau on top of our ledger: 5-factor 0–1000 score (success rate 35% · USDC volume 25% · wallet age 15% · guardrail record 15% · category graph 10%), x402-paid lender pulls at $0.01/check, EAS-attested onchain. We become the only agent credit bureau whose input data is actual agent purchase history on Base. **A working implementation of the scoring engine + paid lender pulls ships with this application.**

### Competitive note
- **x402 / Agent.market** (Coinbase): the *protocol + directory*. Cart402 is the checkout + the shopper. We list *on* Agent.market; we don't compete with it.
- **Batch 003 infra teams (Mica/Agently/Blockrun):** we are their merchant surface. Their clearing/routing needs a storefront to clear and route *commerce*.
- **Stripe agentic commerce:** card-rail agentic payments are for humans' cards. Base's thesis is stablecoin rails for *agents* — Cart402 is the agent-commerce analog on the rails Coinbase is building.

## 4. Why Base (the "Base-first" answer)
- USDC is deepest on Base; EIP-3009 agent-authorized transfers are Circle-native.
- Coinbase **Agentic Wallets** (Feb 2026) and **Coinbase for Agents** (June 2026) live on Base — Cart402 merchants and agents plug straight into that wallet stack (CDP).
- x402's reference networks are `base` / `base-sepolia`.
- Base's 24/7 commerce narrative (even 24/7 equities) is exactly agent-commerce: markets that never close need buyers that never sleep.
- Plan: Base is the default settlement network from line one; other networks are a later compatibility flag, never the default.

## 5. Why now
- Feb 2026: Coinbase Agentic Wallets on Base (agents hold USDC, pay via x402).
- Jun 2026: Coinbase for Agents (agents connected to user accounts).
- Jul 2026: x402 Foundation operational under Linux Foundation; premier members incl. Stripe, Visa, Mastercard, Circle, Google, AWS, Shopify, Cloudflare.
- ~69K active x402 agents, 165M+ transactions, $50M+ volume (x402 Foundation, Sep 2026); Agent.market launched as the agent app store.
→ The rails and demand exist. The missing piece is the **commerce layer** — checkout, carts, and shopping behavior. That is Cart402.

## 6. 8-week program plan (Sep 21 → Nov 15) → Demo Day
| Weeks | Ship |
|---|---|
| 1–2 | Mainnet settlement on Base (live mode), CDP/Agentic Wallet integration, merchant SDK v1 (x402 middleware npm) |
| 3–4 | 10 live merchant endpoints (UAE digital services: NLP, OCR, data, booking); Agent Carts v2 (multi-step goals, guardrails, refunds); **Agent Credit Bureau** (5-factor score from the settlement ledger, x402-paid lender pulls — live in the demo today) |
| 5–6 | MENA beachhead: 10–20 UAE SME merchants onboarded, Arabic agent personas, receipts in AED-equivalent + USDC |
| 7–8 | Agent.market listing; EAS attestation of credit scores; metrics push; Demo Day: live autonomous shopping on mainnet, $ settled, merchant revenue + credit-score screen |

**Demo Day target numbers:** 50+ autonomous agent orders on mainnet, 10+ merchant endpoints, $10K+ USDC settled, 2+ UAE merchant pilots with LOIs.

## 7. Use of the $100K
- 55% engineering: mainnet SDK, CDP wallet integration, agent orchestration, security/audit of payment path
- 25% GTM: MENA merchant onboarding, Agent.market + x402 Foundation ecosystem presence, content
- 20% ops: legal (UAE + Delaware), security review, headcount (1 engineer)

## 8. Risks & mitigations
- *"Just an x402 demo"* → No: checkout product + agent runtime + MENA GTM + revenue model; x402 is the rail, not the product.
- *Regulatory (agent-initiated payments, MENA)* → USDC settlement on Base (global rails); UAE entities onboard as standard merchants; no custody — funds move wallet→merchant via Circle's native interface.
- *Agent marketplace competition* → We are the merchant-side + budget-guardrail layer; complementary to Coinbase's own stack (we build *for* it).
- *Sim mode skepticism* → Signatures and EIP-712 verification are real in both modes; only block inclusion is simulated in sim; live mode is one env var away and is the first program milestone.

## 9. Team
- Solo founder, Dubai-based: [NAME — from LinkedIn: background, years, SME network].
- Weeks-old project, zero funding — the working core shipped in week one (execution speed is the signal, and it's visible in the demo).
- **This is the differentiator in an all-US cohort:** first-principles access to a real, under-served merchant market (MENA SME digital services), built globally on Base rails. The program's advisor/VC layer is the missing team.
