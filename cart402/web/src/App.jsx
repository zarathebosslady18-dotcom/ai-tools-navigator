import { useEffect, useRef, useState } from 'react';
import Bureau from './Bureau.jsx';

const short = (s, n = 8) => (s && s.length > n * 2 + 3 ? s.slice(0, n) + '…' + s.slice(-4) : s);
const money = (n) => `$${Number(n).toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
const clock = (ts) => new Date(ts).toISOString().slice(11, 23);

const EVENT_META = {
  'agent.start': { tag: 'start', color: '#38bdf8' },
  'agent.thinking': { tag: 'think', color: '#94a3b8' },
  'agent.catalog': { tag: 'browse', color: '#94a3b8' },
  'agent.paying': { tag: '402 → pay', color: '#fbbf24' },
  'agent.quote': { tag: 'quote', color: '#60a5fa' },
  'agent.deciding': { tag: 'decide', color: '#c084fc' },
  'agent.ordering': { tag: 'checkout', color: '#fb923c' },
  'agent.receipt': { tag: 'receipt', color: '#34d399' },
  'agent.done': { tag: 'done', color: '#34d399' },
  'agent.error': { tag: 'error', color: '#f87171' },
  settlement: { tag: 'settle', color: '#38bdf8' },
  order: { tag: 'order', color: '#34d399' },
};

function useHealth() {
  const [h, setH] = useState(null);
  useEffect(() => {
    fetch('/api/health').then((r) => r.json()).then(setH).catch(() => {});
  }, []);
  return h;
}

function useStatePoll(ms = 3000) {
  const [s, setS] = useState(null);
  useEffect(() => {
    let stop = false;
    const tick = () =>
      fetch('/api/state').then((r) => r.json()).then((d) => !stop && setS(d)).catch(() => {});
    tick();
    const id = setInterval(tick, ms);
    return () => {
      stop = true;
      clearInterval(id);
    };
  }, [ms]);
  return s;
}

function useEvents() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    let es = null;
    let retry = null;
    const connect = () => {
      es = new EventSource('/api/events');
      es.onmessage = (m) => {
        try {
          const e = JSON.parse(m.data);
          setEvents((prev) => [...prev.slice(-79), e]);
        } catch {}
      };
      es.onerror = () => {
        es.close();
        retry = setTimeout(connect, 2000);
      };
    };
    connect();
    return () => {
      if (retry) clearTimeout(retry);
      if (es) es.close();
    };
  }, []);
  return events;
}

function EventFeed({ events }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [events]);
  if (!events.length) return <div className="empty">Live agent activity will stream here. Launch an agent →</div>;
  return (
    <div className="feed" ref={ref}>
      {events.map((e) => {
        const meta = EVENT_META[e.type] || { tag: e.type, color: '#5b6178' };
        const msg = JSON.stringify(e.data?.payload ?? e.data ?? {});
        return (
          <div className="evt" key={e.id}>
            <span className="t">{clock(e.ts)}</span>
            {e.data?.agent ? <span className="who">{e.data.agent}</span> : null}
            <span className="tag" style={{ color: meta.color }}>{meta.tag}</span>
            <span className="msg">{msg.length > 220 ? msg.slice(0, 220) + '…' : msg}</span>
          </div>
        );
      })}
    </div>
  );
}

function SessionMeter({ session }) {
  if (!session) return null;
  const pct = Math.min(100, (session.spentUsdc / session.budgetUsdc) * 100);
  return (
    <div className="session">
      <div className="meta">
        <span>
          <b>{session.persona.name}</b> · {session.persona.title}
        </span>
        <span className={`status-pill ${session.status}`}>{session.status}</span>
      </div>
      <div className="meter"><div style={{ width: `${pct}%` }} /></div>
      <div className="meta" style={{ marginTop: 5 }}>
        <span>{money(session.spentUsdc)} spent</span>
        <span>{money(session.budgetUsdc)} budget</span>
      </div>
    </div>
  );
}

function LaunchAgent({ onLaunched }) {
  const [personas, setPersonas] = useState([]);
  const [personaId, setPersonaId] = useState('noor');
  const [budget, setBudget] = useState(25);
  const [goal, setGoal] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch('/api/personas').then((r) => r.json()).then(setPersonas).catch(() => {});
  }, []);

  const launch = async () => {
    setBusy(true);
    try {
      await fetch('/api/agents', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ personaId, budgetUsdc: Number(budget), goal: goal || undefined }),
      });
      onLaunched?.();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="card">
      <h3>🤖 Launch a shopping agent</h3>
      <label className="f">Agent persona</label>
      <select value={personaId} onChange={(e) => setPersonaId(e.target.value)}>
        {personas.map((p) => (
          <option key={p.id} value={p.id}>{p.name} — {p.title}</option>
        ))}
      </select>
      <label className="f">Budget (USDC on Base) — hard guardrail</label>
      <input type="number" min="5" max="500" value={budget} onChange={(e) => setBudget(e.target.value)} />
      <label className="f">Goal (optional — default: {personas.find((p) => p.id === personaId)?.goal || 'persona goal'})</label>
      <input type="text" value={goal} placeholder={personas.find((p) => p.id === personaId)?.goal} onChange={(e) => setGoal(e.target.value)} />
      <button className="btn" disabled={busy} onClick={launch}>
        {busy ? 'Starting…' : 'Launch agent → watch it shop & settle onchain'}
      </button>
    </div>
  );
}

function Raw402() {
  const [out, setOut] = useState(null);
  const run = async () => {
    const r = await fetch('/api/market/quote?category=AI%20Services');
    const body = await r.json();
    setOut({ status: r.status, body });
  };
  return (
    <div>
      <button className="mini" onClick={run}>▶ Run a raw request (no payment) → expect HTTP 402</button>
      {out && (
        <pre className="code raw-out">
{`HTTP ${out.status} Payment Required\n\n`}
{JSON.stringify(out.body, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default function App() {
  const health = useHealth();
  const st = useStatePoll();
  const events = useEvents();
  const [copied, setCopied] = useState(null);

  const copy = (v) => {
    navigator.clipboard?.writeText(v);
    setCopied(v);
    setTimeout(() => setCopied(null), 1500);
  };

  const latestSession = st?.sessions?.[0];

  return (
    <div>
      <div className="wrap">
        <div className="topbar">
          <div className="logo">
            🛒 Cart402 <span className="sub">agentic commerce on Base</span>
          </div>
          <div className="badges">
            {health && (
              <span className={`badge ${health.mode}`}>
                {health.mode.toUpperCase()} · {health.network}
              </span>
            )}
            {health && <span className="badge">merchant {short(health.merchant)}</span>}
          </div>
        </div>

        <div className="hero">
          <h1>Agents shop. <span className="blue">USDC settles.</span><br />On Base.</h1>
          <p>
            Cart402 gives merchants a <b>one-line x402 checkout</b> — any product becomes
            agent-payable over HTTP 402 — and gives AI agents the budget, receipts, and
            stablecoin rails to buy onchain. Every purchase settles in USDC on Base with an
            onchain-verifiable receipt.
          </p>
          <a className="cta" href="#console">Launch a shopping agent ↓</a>
          <a className="cta ghost" href="#bureau">Agent credit ↓</a>
          <a className="cta ghost" href="#merchant">I’m a merchant</a>
        </div>

        <div className="stats">
          <div className="stat"><div className="n">{money(st?.stats?.totalSettledUsdc || 0)}</div><div className="l">USDC settled</div></div>
          <div className="stat"><div className="n">{st?.stats?.paidApiCalls || 0}</div><div className="l">x402 paid API calls</div></div>
          <div className="stat"><div className="n">{st?.stats?.ordersCount || 0}</div><div className="l">agent orders</div></div>
          <div className="stat"><div className="n">{st?.stats?.agentsRun || 0}</div><div className="l">agents run</div></div>
        </div>

        <section className="block" id="console">
          <h2 className="sec">Watch an agent buy — live</h2>
          <p className="sec-sub">
            The agent pays 0.01 USDC per market quote (x402, signed EIP-3009 authorization),
            decides under its budget guardrail, then settles the full cart. Real signatures in
            every mode; {health?.mode === 'live' ? 'live settlement on ' + health.network : 'settlement simulated on ' + (health?.network || 'base-sepolia') + ' parameters until live mode is enabled'}.
          </p>
          <div className="grid-2">
            <div>
              <LaunchAgent />
              <div className="card" style={{ marginTop: 14 }}>
                <h3>Current session</h3>
                <SessionMeter session={latestSession} />
              </div>
            </div>
            <div className="card">
              <h3>Live event stream (SSE)</h3>
              <EventFeed events={events} />
            </div>
          </div>
        </section>

        <section className="block" id="catalog">
          <h2 className="sec">The catalog</h2>
          <p className="sec-sub">Digital services priced in USDC. In production, each endpoint is one line of x402 middleware.</p>
          <div className="products">
            {(st ? [] : null) /* placeholder to avoid unused */}
            {fetch_products.map((p) => (
              <div className="product" key={p.id}>
                <div className="cat">{p.category}</div>
                <div className="name">{p.name}</div>
                <div className="desc">{p.desc}</div>
                <div className="price">{money(p.priceUsdc)} <small>USDC</small></div>
              </div>
            ))}
          </div>
        </section>

        <section className="block" id="settlements">
          <h2 className="sec">Settlements</h2>
          <p className="sec-sub">Every x402 payment: signed EIP-3009 USDC authorization, verified secp256k1 recovery, settled to the merchant wallet.</p>
          <div className="card">
            {st?.ledger?.length ? (
              <table>
                <thead>
                  <tr><th>Time</th><th>Kind</th><th>Resource</th><th>Amount</th><th>Payer → Merchant</th><th>Receipt (tx hash)</th></tr>
                </thead>
                <tbody>
                  {st.ledger.map((l, i) => (
                    <tr key={i}>
                      <td className="mono">{clock(l.ts)}</td>
                      <td className={`kind-${l.kind}`}>{l.kind}</td>
                      <td>{l.label}</td>
                      <td className="mono">{money(l.amountUsdc)}</td>
                      <td className="mono">{short(l.payer, 6)} → {short(l.merchant, 6)}</td>
                      <td><span className="tx mono" onClick={() => copy(l.txHash)}>{copied === l.txHash ? 'copied ✓' : short(l.txHash, 10)}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty">No settlements yet — launch an agent to generate the first onchain receipts.</div>
            )}
          </div>
        </section>

        <Bureau />

        <section className="block" id="merchant">
          <h2 className="sec">I’m a merchant — one line makes my store agent-payable</h2>
          <p className="sec-sub">
            Agents pay per request over HTTP 402 (x402 <i>exact</i>). No accounts, no API keys,
            no chargebacks — USDC lands in your Base wallet via Circle’s native
            <code> transferWithAuthorization</code>.
          </p>
          <div className="grid-2">
            <div className="card">
              <h3>Drop-in checkout (npm, shipping week 1 of the program)</h3>
              <pre className="code">{`<span class="k">import</span> { x402 } <span class="k">from</span> <span class="s">'@cart402/checkout'</span>;

app.<span class="k">use</span>(<span class="s">'/api/checkout'</span>, x402({
  network: <span class="s">'base'</span>,
  asset: <span class="s">'USDC'</span>,
  price: 0.01,              <span class="c">// per request</span>
  payTo: <span class="s">'0xYourMerchantWallet'</span>,
}));

app.<span class="k">get</span>(<span class="s">'/api/checkout/quote'</span>, (req, res) => {
  res.<span class="k">json</span>({ /* your data — agents pay to see it */ });
});

<span class="c">// 402 → signed USDC authorization → paid → fulfilled.</span>`}</pre>
              <div style={{ marginTop: 14 }}><Raw402 /></div>
            </div>
            <div className="card">
              <h3>Settled to your wallet</h3>
              <div style={{ fontSize: 34, fontWeight: 800, fontFamily: 'var(--mono)' }}>
                {money(st?.stats?.totalSettledUsdc || 0)} <span style={{ fontSize: 14, color: 'var(--muted)' }}>USDC</span>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>
                across {st?.stats?.paidApiCalls || 0} paid API calls and {st?.stats?.ordersCount || 0} orders
                on <b>{health?.network || '—'}</b> ({health?.mode === 'live' ? 'live' : 'simulated settlement'}).
              </p>
              <div className="note">
                <b>How settlement works.</b> Each payment is an EIP-3009
                <code> transferWithAuthorization</code> signed by the paying wallet (agent or
                human) — the same authorization Circle’s Agentic Wallets and x402 use.
                The server verifies the secp256k1 signature (real recovery, via viem) before
                fulfilling. In <b>live mode</b> the authorization is submitted on Base mainnet;
                in <b>sim mode</b> block inclusion is simulated so you can run the full loop
                without funds.
              </div>
            </div>
          </div>
        </section>

        <footer>
          <div>
            Cart402 — built for <b>Base Batches 004</b> · agentic commerce · MENA beachhead (UAE/GCC SMEs)
          </div>
          <div className="stack">
            x402 (exact scheme) · USDC on Base · EIP-3009 · EIP-712 · viem · Express · React
          </div>
          <div className="stack">
            {health?.mode === 'live'
              ? `Live settlement on ${health.network} — receipts on Basescan.`
              : 'SIM mode: settlement simulated on base-sepolia parameters. Signatures are real and verified.'}
          </div>
        </footer>
      </div>
    </div>
  );
}

// Static catalog mirror (kept in sync with server/catalog.js for the public UI).
const fetch_products = [
  { id: 'ai-frontdesk', name: 'Front-Desk Voice Agent — 1 seat, 30 days', category: 'AI Services', desc: 'Multilingual (EN/AR) voice agent for inbound calls, bookings and FAQs.', priceUsdc: 19.9 },
  { id: 'nlp-arabic', name: 'Arabic NLP Credits — 10M tokens', category: 'AI Services', desc: 'Translation, summarization, intent extraction. Gulf-dialect tuned.', priceUsdc: 12.5 },
  { id: 'img-pack', name: 'Image Generation Pack — 500 images', category: 'AI Services', desc: 'Product & marketing imagery with brand-locked style.', priceUsdc: 8.0 },
  { id: 'ocr-invoice', name: 'Invoice OCR — 1,000 documents', category: 'Operations', desc: 'Line items, VAT, PO numbers extracted at 99.2% field accuracy.', priceUsdc: 15.0 },
  { id: 'fraud-score', name: 'Fraud Scoring API — 10K calls', category: 'Operations', desc: 'Real-time transaction risk score, <50ms p99, explainable output.', priceUsdc: 10.5 },
  { id: 'mkt-feed', name: 'Market Data Feed — 30 days', category: 'Data & Feeds', desc: 'Category demand, pricing benchmarks, UAE/GCC service indices.', priceUsdc: 24.0 },
  { id: 'a2a-relay', name: 'Agent-to-Agent Relay — monthly', category: 'Infrastructure', desc: 'Message relay + auth between your agent fleet and 402 marketplaces.', priceUsdc: 5.25 },
  { id: 'settle-report', name: 'Onchain Settlement Report — weekly', category: 'Data & Feeds', desc: 'Signed USDC settlement digest for your agent fleet, attested on Base.', priceUsdc: 6.75 },
];
