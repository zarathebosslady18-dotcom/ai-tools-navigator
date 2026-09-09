// Shared runtime state + SSE event bus.

const MAX_EVENTS = 500;
let events = [];
let eid = 0;
const subs = new Set();

export const state = {
  stats: {
    totalSettledUsdc: 0,
    paidApiCalls: 0,
    txCount: 0,
    ordersCount: 0,
    agentsRun: 0,
  },
  orders: [],
  sessions: [],
  ledger: [],
};

export function emit(type, data = {}) {
  const e = { id: ++eid, ts: Date.now(), type, data };
  events.push(e);
  if (events.length > MAX_EVENTS) events = events.slice(-MAX_EVENTS);
  const line = `data: ${JSON.stringify(e)}\n\n`;
  for (const res of subs) {
    try {
      res.write(line);
    } catch {
      /* subscriber gone; cleaned up on close */
    }
  }
  return e;
}

export function subscribe(res) {
  subs.add(res);
}

export function unsubscribe(res) {
  subs.delete(res);
}

export function recentEvents(n = 30) {
  return events.slice(-n);
}
