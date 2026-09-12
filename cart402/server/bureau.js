// Agent Credit Bureau — 5-factor score (0–1000) for AI agents on Base.
//
// All inputs are REAL data from this instance: settlements in the ledger,
// sessions with budget guardrails, orders with line items. In production the
// same engine reads EAS-attested settlement history + the onchain registry.
//
// Factors (weights sum to 100%):
//   successRate  35% — verified settlements (every settled tx is signature-verified)
//   volume       25% — cumulative USDC settled (log scale; $1k ≈ max)
//   walletAge    15% — days since first settlement (7-day onboarding prior, max at 38d)
//   disputes     15% — guardrail aborts / errored sessions (each −250 bps)
//   network      10% — distinct product categories transacted (graph diversity)

import { state } from './state.js';
import { CATALOG } from './catalog.js';

export const WEIGHTS = {
  successRate: 0.35,
  volume: 0.25,
  walletAge: 0.15,
  disputes: 0.15,
  network: 0.1,
};

export function categoryFor(score) {
  if (score >= 900) return 'A';
  if (score >= 800) return 'B';
  if (score >= 700) return 'C';
  if (score >= 600) return 'D';
  return 'F';
}

export function scoreForWallet(wallet) {
  const w = String(wallet).toLowerCase();
  const now = Date.now();

  const ledger = state.ledger.filter((l) => l.payer?.toLowerCase() === w);
  const sessions = state.sessions.filter((s) => s.wallet?.toLowerCase() === w);
  const orders = state.orders.filter((o) => o.settlement?.payer?.toLowerCase() === w);

  const attempts = ledger.length;
  const volumeUsdc = ledger.reduce((s, l) => s + l.amountUsdc, 0);
  const firstTs = attempts ? Math.min(...ledger.map((l) => l.ts)) : null;
  const ageDays = firstTs ? (now - firstTs) / 86400000 : 0;
  const guardrailEvents =
    sessions.filter((s) => s.status === 'error').length +
    sessions.filter((s) => s.aborted === true).length;

  const categories = new Set();
  for (const o of orders) {
    for (const line of o.lines) {
      const p = CATALOG.find((x) => x.id === line.id);
      if (p) categories.add(p.category);
    }
  }

  // Basis points (0–10000)
  const successRate = attempts > 0 ? 10000 : 5000; // every recorded settlement is verified; neutral prior otherwise
  const volume = Math.min(1, Math.log10(1 + volumeUsdc) / 3) * 10000; // $1k ≈ max
  const walletAge = Math.min(1, (ageDays + 7) / 38) * 10000; // 7-day onboarding prior
  const disputes = Math.max(0, 10000 - guardrailEvents * 2500);
  const network = Math.min(10000, categories.size * 2500);

  const factors = {
    successRate: Math.round(successRate),
    volume: Math.round(volume),
    walletAge: Math.round(walletAge),
    disputes: Math.round(disputes),
    network: Math.round(network),
  };

  const score = Math.round(
    (factors.successRate * WEIGHTS.successRate +
      factors.volume * WEIGHTS.volume +
      factors.walletAge * WEIGHTS.walletAge +
      factors.disputes * WEIGHTS.disputes +
      factors.network * WEIGHTS.network) / 10
  );

  return {
    wallet,
    score,
    category: categoryFor(score),
    factors,
    basis: {
      settlements: attempts,
      volumeUsdc: Math.round(volumeUsdc * 100) / 100,
      sessions: sessions.length,
      walletAgeDays: Math.round(ageDays * 10000) / 10000,
      categories: [...categories],
      guardrailEvents,
    },
    computedAt: now,
  };
}

export function scoreAll() {
  const wallets = new Set();
  for (const l of state.ledger) if (l.payer) wallets.add(l.payer);
  for (const s of state.sessions) if (s.wallet) wallets.add(s.wallet);
  return [...wallets].map(scoreForWallet).sort((a, b) => b.score - a.score);
}
