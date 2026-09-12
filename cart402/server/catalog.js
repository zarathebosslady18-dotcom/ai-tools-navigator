// Digital goods & services catalog. Prices in USDC.
// These are the merchant endpoints an agent can purchase — each one would be
// an x402-protected endpoint in production.

export const CATALOG = [
  {
    id: 'ai-frontdesk',
    name: 'Front-Desk Voice Agent — 1 seat, 30 days',
    category: 'AI Services',
    desc: 'Multilingual (EN/AR) voice agent for inbound calls, bookings and FAQs.',
    priceUsdc: 19.9,
  },
  {
    id: 'nlp-arabic',
    name: 'Arabic NLP Credits — 10M tokens',
    category: 'AI Services',
    desc: 'Translation, summarization, intent extraction. Gulf-dialect tuned.',
    priceUsdc: 12.5,
  },
  {
    id: 'img-pack',
    name: 'Image Generation Pack — 500 images',
    category: 'AI Services',
    desc: 'Product & marketing imagery with brand-locked style.',
    priceUsdc: 8.0,
  },
  {
    id: 'ocr-invoice',
    name: 'Invoice OCR — 1,000 documents',
    category: 'Operations',
    desc: 'Line items, VAT, PO numbers extracted at 99.2% field accuracy.',
    priceUsdc: 15.0,
  },
  {
    id: 'fraud-score',
    name: 'Fraud Scoring API — 10K calls',
    category: 'Operations',
    desc: 'Real-time transaction risk score, <50ms p99, explainable output.',
    priceUsdc: 10.5,
  },
  {
    id: 'mkt-feed',
    name: 'Market Data Feed — 30 days',
    category: 'Data & Feeds',
    desc: 'Category demand, pricing benchmarks, UAE/GCC service indices.',
    priceUsdc: 24.0,
  },
  {
    id: 'a2a-relay',
    name: 'Agent-to-Agent Relay — monthly',
    category: 'Infrastructure',
    desc: 'Message relay + auth between your agent fleet and 402 marketplaces.',
    priceUsdc: 5.25,
  },
  {
    id: 'settle-report',
    name: 'Onchain Settlement Report — weekly',
    category: 'Data & Feeds',
    desc: 'Signed USDC settlement digest for your agent fleet, attested on Base.',
    priceUsdc: 6.75,
  },
];

export const CATEGORIES = [...new Set(CATALOG.map((p) => p.category))];
