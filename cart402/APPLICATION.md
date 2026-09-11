# Base Batches 004 — Application Package (Cart402)

> **Deadline: September 9, 2026 — TODAY.** The form takes a written + video submission and does **not** save drafts. Fill the `[FILL]` items, record the 90-second video (script below), then submit: https://www.base.org/batches/apply

---

## Form answers (copy–paste blocks)

### Company name
Cart402 *(working title — rename freely before submit)*

### One-liner / what do you do?
> Cart402 is agentic commerce on Base: a one-line x402 checkout that makes any product agent-payable in USDC, plus autonomous purchasing agents that shop within budget and settle onchain — so AI agents can buy things and merchants get paid in stablecoins on Base.

### Website / links
- Product (working demo): `[FILL — deployed URL, e.g. a Render/Fly/Vercel deploy of this repo]`
- GitHub: https://github.com/zarathebosslady18-dotcom/ai-tools-uae-stack/pull/1
- Email: missakirubusiness@gmail.com
- X / Twitter: `[FILL]`
- LinkedIn: `[FILL]`

### What are you building? (long form)
> The rails for the agent economy just landed: Coinbase Agentic Wallets (Feb 2026), Coinbase for Agents (Jun 2026), and x402 under the Linux Foundation with Stripe, Visa, Mastercard, Circle, Google and AWS as members. ~69K agents already transact over x402 — 165M+ payments, $50M+ volume. But commerce is still human-shaped: carts, sessions, checkout pages. Agents can't complete a purchase with budget guardrails, and merchants can't accept agent payments without crypto expertise.
>
> Cart402 is the missing commerce layer, built Base-first:
>
> **1. Merchant Checkout.** One line of middleware makes any product or API endpoint agent-payable over HTTP 402 (x402 `exact` scheme). Settlement is USDC on Base via Circle's native EIP-3009 `transferWithAuthorization` — signed by the paying wallet, verified by secp256k1 recovery, no accounts, no API keys, no chargebacks.
>
> **2. Agent Carts.** Hosted autonomous purchasing agents with hard budget guardrails and full receipts. They browse, pay per request (0.01 USDC x402 micropayments) for live market data, decide, buy, and settle the cart. Every step is an onchain-verifiable receipt — an audit trail by design.
>
> **3. MENA beachhead.** We are Dubai-based with real SME relationships across UAE/GCC. We're bringing agent commerce to a market with ~350K SMEs, heavy WhatsApp-first operations, and zero agentic-commerce infrastructure — Arabic-first agents, USDC settlement, GCC go-to-market.
>
> **4. Phase 2 — Agent Credit (live in the demo today).** Every settlement through Cart402 is a credit event, which makes us the natural home of agent credit history. We've already built the bureau: a 5-factor score (0–1000) from real settlement data — success rate, USDC volume, wallet age, guardrail record, category graph — with lenders paying 0.01 USDC per pull via x402. We don't lend; zero balance sheet. In program weeks 3–4 this goes live with EAS-attested onchain scores.
>
> A working implementation ships with this application: the full x402 loop (402 → signed EIP-3009 USDC authorization → real signature verification → settlement + receipt), an autonomous agent that completes a purchase end-to-end within its budget, and a live merchant dashboard.

### Why now?
> In 2026 the agent-payments stack became real in two quarters: Agentic Wallets on Base, Coinbase for Agents, x402 graduating to the Linux Foundation with Stripe/Visa/Mastercard/Google/AWS as premier members, and Coinbase's Agent.market app store. Agent activity on x402 is already at ~69K agents and 165M+ transactions. The rails exist; agent demand exists; what doesn't exist is the **commerce layer** — checkout, carts, budget-guardrailed purchasing behavior. That's the exact gap Base named for Batch 004 ("agent-driven shopping, e-commerce, decentralized AI"), and it's the layer we're building.

### Why Base?
> Base-first by design, not by default fallback. (1) USDC depth on Base is best in class — USDC is our settlement asset end to end. (2) Coinbase's own agent stack — Agentic Wallets, Coinbase for Agents, CDP — lives on Base; Cart402 agents and merchants plug into it natively (program weeks 1–2). (3) x402's reference networks are `base`/`base-sepolia`. (4) Base's 24/7 commerce thesis is literally the agent thesis: markets that never close need buyers that never sleep. Other EVM networks are a compatibility flag we may add later; Base is where we ship, where we measure, and where our Demo Day runs.

### Stage & traction
> Weeks-old, solo, zero funding — the earliest end of your stated range, deliberately. The product is the proof: a working core loop shipped in the first week — real x402 payment flow (402 → signed EIP-3009 USDC authorization → secp256k1 verification → settlement + receipt), an autonomous agent that completes an end-to-end purchase under hard budget guardrails, a merchant dashboard, and the agent-credit scoring engine (all in the linked demo).
>
> Beyond code, we bring the founder's live UAE/GCC SME network [from LinkedIn — years / client types / industries] — the pilot target for program weeks 5–6 (10–20 UAE SME merchant onboardings).

### Team
> **Solo founder — Miss Akiru (Zuhura Akiru)**. [From LinkedIn — 1–2 lines: role, years in field, notable clients/companies/credentials]. Based in Dubai with direct, working relationships across UAE/GCC SMEs — the distribution edge no US cohort team has: first-principles access to the MENA merchant market.
>
> Cart402 is weeks old and the working core shipped in the founder's first week — that speed is the point. The program's dedicated advisor plus weekly expert support is exactly the team layer a solo founder is missing; the first hire funded by the $100K is a full-stack engineer to harden and scale the payment path.

### What will you do with the $100K and the 8 weeks?
> Weeks 1–2: live mainnet settlement (facilitator + merchant-submitted auths), CDP/Agentic Wallets integration, publish `@cart402/checkout` npm, **first engineering hire** (full-stack). Weeks 3–4: 10 live merchant endpoints (UAE digital services: NLP, OCR, data, booking), Agent Carts v2 (multi-step goals, refunds), **Agent Credit Bureau live** (5-factor score from the settlement ledger, x402-paid lender pulls — engine already built and running). Weeks 5–6: MENA beachhead — 10–20 UAE SME merchants onboarded, Arabic agent personas. Weeks 7–8: Agent.market listing, EAS attestation of credit scores, Demo Day: live mainnet autonomous shopping, merchant revenue + credit-score screen, pilot LOIs. Spend: ~55% engineering (incl. the first full-stack engineer and a security review of the payment path), ~25% GTM/ecosystem, ~20% legal (UAE + Delaware) and program ops.

---

## 90-second video script (record this — it's the second required submission)

**Format:** 1 face-to-camera intro + screen capture of the live demo (this repo). No slides.

| Sec | Shot | Script |
|---|---|---|
| 0–8 | Face, 1 shot | "Here's the problem with the agent economy in one sentence: agents can already move money — 69,000 of them do it over x402 right now — but they still can't *buy things*, and merchants still can't get paid by them." |
| 8–18 | Screen: dashboard hero | "Cart402 is agentic commerce on Base. Two halves. For merchants: one line of x402 middleware makes any product agent-payable — settlement in USDC on Base, signed EIP-3009 authorizations, no accounts, no chargebacks." |
| 18–55 | Screen: launch agent, watch the feed | "For buyers: autonomous agents with hard budgets. Watch this. Noor is a procurement agent for a Dubai dental clinic with a 30 USDC budget. She pays one cent via x402 for a live market quote — that's a real 402 response, a real signed authorization, verified here by secp256k1 recovery. She compares, decides, and settles a 29.75 USDC cart. Receipt, with a verifiable hash." |
| 55–68 | Screen: settlements table + raw 402 widget | "Everything is auditable — every payment in the ledger, every receipt. And this is the merchant side: any endpoint, one line of code, agents pay to call it." |
| 68–80 | Face | "I'm Dubai-based, and that's my wedge: ~350,000 UAE/GCC SMEs with zero agentic-commerce infrastructure. I'm taking agent commerce to the Gulf first — then global on Base rails." |
| 80–90 | Face | "The rails landed this year. Agentic Wallets, Coinbase for Agents, x402 under the Linux Foundation. What's missing is the commerce layer. That's what I built — and it's running right now. Base-first, pre-seed, solo, and ready for Batches 004." |

**B-roll tips:** record the agent run at 1× speed (the SSE feed is the money shot); zoom on the `402 → pay` event and the final `receipt` line; keep the top bar visible so `base-sepolia` + mode badge show; end on the stats strip with live numbers.

---

## Pre-baked FAQ answers (if asked in follow-up)

- **Are you building on Base today?** The full payment path targets Base: sim mode runs base-sepolia chain params; mainnet (chain 8453) is one env var away and is our first program milestone. Base is the default network in the architecture.
- **Is this a grant or investment?** Investment — we're comfortable with the SAFE. We're deliberately pre-Seed; the $100K is the capital that ships mainnet + the MENA beachhead.
- **How is this different from Agent.market / Coinbase's stack?** Complementary: Agent.market is the directory; Cart402 is the checkout + the buyer-side agent runtime. We list on Agent.market; our agents pay through the same x402 rails Coinbase builds.
- **Why credit, when Floe Labs and Credifi got funded in Batch 003?** We're not entering their lane — we're the layer *underneath* it. A credit bureau without transaction history is a rounding error; Floe and Credifi build lending infrastructure. We generate the data the scores need: every agent purchase, paid quote, and guardrail event on Base flows through Cart402 first. Our credit product is Phase 2, computed from the actual settlement ledger, and it's already running in the demo.
- **Solo founder, weeks-old project — why fund this?** Pre-product is explicitly in your eligibility range, and conviction is a stated criterion: a working, protocol-native core shipped in week one *is* the conviction. What we lack — team depth, capital, investor network — is exactly what Batches provides (dedicated advisor, $100K, the Demo Day room). What we have is what a program can't manufacture: a shipped product and first-principles access to a merchant market no US cohort team has.
- **Regulatory view on agent-initiated payments in MENA?** USDC settlement happens on Base (global rails) between wallets; UAE merchant entities onboard as standard merchants. We're starting ADGM/FSRA and VARA conversations now — and expect Hub71's digital-assets track to help formalize it (see PIPELINE.md).
- **Why would agents pay you vs. calling x402 endpoints directly?** They'd pay the *merchant* directly over x402 — that's the point. Cart402's revenue is merchant-side: checkout SaaS + take-rate on agent settlements, plus hosted agent subscriptions. We're on the merchant side of every transaction.
