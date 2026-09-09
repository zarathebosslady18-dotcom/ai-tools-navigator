// Terminal demo: launch an agent and stream its x402 shopping session.
// Usage: node demo-agent.mjs  (server must be running)

const base = `http://127.0.0.1:${process.env.PORT || 4020}`;
const budget = Number(process.env.BUDGET || 25);
const persona = process.env.PERSONA || 'noor';

const r = await fetch(`${base}/api/agents`, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ personaId: persona, budgetUsdc: budget }),
});
if (!r.ok) {
  console.error('failed to start agent:', r.status, await r.text());
  process.exit(1);
}
const { sessionId } = await r.json();
console.log(`agent session started: ${sessionId} (budget ${budget} USDC)\n`);

const stream = await fetch(`${base}/api/events`);
const reader = stream.body.getReader();
const dec = new TextDecoder();
let buf = '';
let done = false;
const deadline = Date.now() + 90_000;

while (!done && Date.now() < deadline) {
  const { value } = await reader.read();
  if (value === undefined) break;
  buf += dec.decode(value, { stream: true });
  let i;
  while ((i = buf.indexOf('\n\n')) >= 0) {
    const chunk = buf.slice(0, i);
    buf = buf.slice(i + 2);
    const m = chunk.match(/data: (.*)/);
    if (!m) continue;
    const e = JSON.parse(m[1]);
    if (e.data?.sessionId && e.data.sessionId !== sessionId) continue;
    const t = new Date(e.ts).toISOString().slice(11, 23);
    console.log(`[${t}] ${e.type.padEnd(16)} ${JSON.stringify(e.data?.payload ?? e.data)}`);
    if (e.type === 'agent.done' && e.data.sessionId === sessionId) done = true;
  }
}
console.log('\nsession complete — check /api/state for ledger & orders.');
process.exit(0);
