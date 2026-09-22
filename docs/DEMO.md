# Demo Guide

## Every number on this site is DEMO / MOCK / SIMULATED data

There are no real exchange connections, no real funds, no real trades, and no
real users. Every API response carries `meta.source: "simulated"`, and every
dashboard page shows a "Simulated data" badge next to its title. See
[LIMITATIONS.md](LIMITATIONS.md) for the exhaustive REAL/MOCKED/SIMULATED
breakdown.

## Running it

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Demo credentials

```
Email:    demo@arbitragex.pro
Password: demo-pass-2026
```

Pre-filled on the `/login` form — no need to type them. These are not real
credentials for a real system; they gate a client-side-only demo flag (see
SECURITY.md).

## Suggested walkthrough

1. **Landing page** (`/`) — problem/solution framing, feature grid, pricing
2. **Onboarding** (`/onboarding`) — click through Connect exchanges →
   Configure strategy → Paper trade → Enter dashboard. The strategy sliders
   are live; "Run paper trading pass" runs a short simulated delay then
   reports a match count against the demo dataset.
3. **Dashboard overview** (`/dashboard`) — stat tiles, live spread preview,
   system health, recent AI audit decisions
4. **Opportunities** — search by symbol, filter by status
5. **AI Audit** — toggle "GO decisions only", read the factor breakdown and
   reasons on any card
6. **Execution Log** — realized P/L per simulated fill
7. **Portfolio** — equity curve chart (TradingView `lightweight-charts`) and
   balances by venue
8. **Exchanges** — connection status, latency, fees, masked API keys
9. **Strategy** — adjust sliders, "Save strategy" (session-only, not persisted)
10. **Billing** — plan comparison, mock invoice history
11. **White-Label** — branding form, sub-tenant list
12. **Settings** — notification toggles, sign out

## Regenerating the dataset

The simulated dataset is derived from a fixed seed
(`generateDemoDataset(20260101)` in `src/lib/mock/dataset.ts`). Changing the
seed, or restarting the dev server after editing `src/lib/mock/generators.ts`,
produces a new but equally internally-consistent dataset — the underlying
fee/slippage/threshold formula stays the same.
