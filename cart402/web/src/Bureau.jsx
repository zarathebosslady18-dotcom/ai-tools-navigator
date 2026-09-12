import { useEffect, useState } from 'react';

const CAT_COLOR = { A: '#34d399', B: '#60a5fa', C: '#fbbf24', D: '#fb923c', F: '#f87171' };
const short = (s, n = 6) => (s && s.length > n * 2 + 3 ? s.slice(0, n) + '…' + s.slice(-4) : s);

function FactorBars({ factors }) {
  const rows = [
    ['successRate', 'Success rate · 35%'],
    ['volume', 'USDC volume · 25%'],
    ['walletAge', 'Wallet age · 15%'],
    ['disputes', 'Guardrail record · 15%'],
    ['network', 'Category graph · 10%'],
  ];
  return (
    <div>
      {rows.map(([key, label]) => (
        <div className="factor-row" key={key}>
          <span>{label}</span>
          <div className="factor-bar">
            <div style={{ width: `${(factors[key] / 10000) * 100}%` }} />
          </div>
          <span className="mono">{factors[key]}</span>
        </div>
      ))}
    </div>
  );
}

export default function Bureau() {
  const [data, setData] = useState(null);
  const [wallet, setWallet] = useState('');
  const [out, setOut] = useState(null);

  useEffect(() => {
    let stop = false;
    const tick = () =>
      fetch('/api/bureau/agents').then((r) => r.json()).then((d) => !stop && setData(d)).catch(() => {});
    tick();
    const id = setInterval(tick, 4000);
    return () => {
      stop = true;
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    if (!wallet && data?.agents?.length) setWallet(data.agents[0].wallet);
  }, [data, wallet]);

  const rawQuery = async () => {
    if (!wallet) return;
    const r = await fetch(`/api/bureau/score/${wallet}`);
    setOut({ mode: 'raw', status: r.status, body: await r.json() });
  };

  const paidPull = async () => {
    if (!wallet) return;
    setOut({ mode: 'busy' });
    const r = await fetch('/api/bureau/lender-demo', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ wallet }),
    });
    setOut(await r.json());
  };

  const agents = data?.agents || [];

  return (
    <section className="block" id="bureau">
      <h2 className="sec">Agent Credit Bureau — every agent settlement is a credit event</h2>
      <p className="sec-sub">
        Phase 2: a 5-factor credit score (0–1000) for any agent on Base, computed from real
        settlement history — success rate, USDC volume, wallet age, guardrail record, category
        graph. Lenders (Aave/Morpho-style protocols, agentic platforms) pay 0.01 USDC per pull
        via x402. We don’t lend. Zero balance sheet.
      </p>
      <div className="grid-2">
        <div className="card">
          <h3>🏦 Lender score pull (0.01 USDC via x402)</h3>
          <label className="f">Agent wallet to score</label>
          <input
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            placeholder="0x… (launch an agent first, or pick from the table)"
            className="mono"
          />
          <div className="row" style={{ marginTop: 12 }}>
            <button className="mini" onClick={rawQuery}>Raw query → expect 402</button>
            <button className="mini" onClick={paidPull}>Complete paid pull →</button>
          </div>
          {out?.mode === 'raw' && (
            <pre className="code raw-out">
{`HTTP ${out.status} Payment Required\n\n`}
{JSON.stringify(out.body, null, 2)}
            </pre>
          )}
          {out?.mode === 'busy' && <div className="empty">Paying 0.01 USDC and verifying…</div>}
          {out?.step1 && (
            <div>
              <div style={{ fontSize: 12.5, color: 'var(--muted)', margin: '14px 0 6px' }}>
                Step 1 — lender queries → <b style={{ color: 'var(--yellow)' }}>HTTP 402</b> (0.01 USDC required)
              </div>
              <pre className="code" style={{ maxHeight: 150 }}>
{JSON.stringify(out.step1.body, null, 2)}
              </pre>
              <div style={{ fontSize: 12.5, color: 'var(--muted)', margin: '12px 0 6px' }}>
                Step 2 — lender signs EIP-3009 USDC authorization → verified → <b style={{ color: 'var(--green)' }}>HTTP 200</b>
              </div>
              <div className="card" style={{ background: 'var(--panel-2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ fontSize: 34, fontWeight: 800, fontFamily: 'var(--mono)' }}>
                    {out.step2.body.score}
                  </span>
                  <span className="score-badge" style={{ color: CAT_COLOR[out.step2.body.category] }}>
                    {out.step2.body.category}
                  </span>
                  <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                    {short(out.step2.body.wallet)} · settled by {out.lender ? short(out.lender, 5) : '—'}
                  </span>
                </div>
                <div style={{ marginTop: 12 }}>
                  <FactorBars factors={out.step2.body.factors} />
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 10 }} className="mono">
                  receipt {out.step2.body.payment ? short(out.step2.body.payment.txHash, 8) : ''} · {out.step2.body.payment?.mode}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="card">
          <h3>📇 Credit files (live — computed from real settlements)</h3>
          {agents.length ? (
            <table>
              <thead>
                <tr><th>Agent wallet</th><th>Score</th><th>Category</th><th>USDC settled</th><th>Tx</th><th>Categories</th></tr>
              </thead>
              <tbody>
                {agents.map((a) => (
                  <tr key={a.wallet} style={{ cursor: 'pointer' }} onClick={() => setWallet(a.wallet)}>
                    <td className="mono">{short(a.wallet)}</td>
                    <td className="mono" style={{ fontWeight: 800, fontSize: 15 }}>{a.score}</td>
                    <td><span className="score-badge" style={{ color: CAT_COLOR[a.category] }}>{a.category}</span></td>
                    <td className="mono">${a.basis.volumeUsdc}</td>
                    <td className="mono">{a.basis.settlements}</td>
                    <td style={{ fontSize: 11.5, color: 'var(--muted)' }}>{a.basis.categories.join(', ') || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty">No agents scored yet — launch a shopping agent above and it will appear here with its credit file.</div>
          )}
          <div className="note">
            <b>How the score works.</b> Success rate (35%) · USDC volume, log-scaled (25%) · wallet
            age with a 7-day onboarding prior, max at 38 days (15%) · guardrail record — each
            abort/error −250 bps (15%) · distinct categories transacted (10%). A fresh agent that
            transacts cleanly starts around C and climbs toward A with onchain history; guardrail
            events pull it down fast. In production: EAS-attested settlement history + onchain
            registry, same engine.
          </div>
        </div>
      </div>
    </section>
  );
}
