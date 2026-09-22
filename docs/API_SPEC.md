# API Specification

All routes are Next.js Route Handlers under `src/app/api/`, returning JSON
from the deterministic simulation layer. There is no authentication on these
routes (the demo's auth gate is client-side only — see SECURITY.md) and no
mutation endpoints — every route is a read-only `GET`.

Every response is shaped `{ data: T, meta: { source: "simulated" } }` so
consumers (and reviewers) can tell at the payload level that this is not
live market data.

## `GET /api/opportunities`

Returns all detected arbitrage opportunities.

```ts
{
  data: Array<{
    id: string;
    symbol: string;              // e.g. "BTC/USDT"
    buyExchangeId: string;
    sellExchangeId: string;
    buyPrice: number;
    sellPrice: number;
    spreadPct: number;
    estNetPct: number;           // net of fees/slippage/latency decay
    detectedAt: string;          // ISO timestamp
    status: "detected" | "audited" | "executing" | "closed" | "rejected";
    latencyBudgetMs: number;
  }>;
  meta: { source: "simulated" };
}
```

## `GET /api/audits`

Returns AI audit decisions, each enriched with its source opportunity.

```ts
{
  data: Array<{
    id: string;
    opportunityId: string;
    verdict: "GO" | "NO_GO";
    netProfitPct: number;
    confidence: number;          // 0–1
    reasons: string[];
    evaluatedAt: string;
    factors: {
      feesPct: number;
      slippagePct: number;
      withdrawalRisk: "low" | "medium" | "high";
      latencyDecayPct: number;
      exchangeHealth: "healthy" | "watch" | "unhealthy";
    };
    opportunity: Opportunity | null;
  }>;
  meta: { source: "simulated" };
}
```

## `GET /api/executions`

```ts
{
  data: Array<{
    id: string;
    opportunityId: string;
    symbol: string;
    buyExchangeId: string;
    sellExchangeId: string;
    sizeUsd: number;
    realizedPnlUsd: number;
    realizedPnlPct: number;
    status: "filled" | "partial" | "failed" | "rolled_back";
    executedAt: string;
    durationMs: number;
  }>;
  meta: { source: "simulated" };
}
```

## `GET /api/portfolio`

```ts
{
  data: {
    balances: Array<{ exchangeId: string; asset: string; amount: number; usdValue: number }>;
    equityCurve: Array<{ time: string; equityUsd: number }>; // 30 daily points
  };
  meta: { source: "simulated" };
}
```

## `GET /api/exchanges`

```ts
{
  data: Array<{
    id: string;
    name: string;
    kind: "CEX" | "DEX";
    status: "connected" | "degraded" | "disconnected";
    latencyMs: number;
    makerFeeBps: number;
    takerFeeBps: number;
    withdrawalEnabled: boolean;
    region: string;
  }>;
  meta: { source: "simulated" };
}
```

## `GET /api/system-health`

```ts
{
  data: Array<{
    label: string;
    value: string;
    status: "ok" | "warning" | "critical";
    detail: string;
  }>;
  meta: { source: "simulated" };
}
```

## Target production API (PROPOSED)

The original specification calls for REST + WebSocket + gRPC + FIX API
surfaces with JWT/OAuth2 auth and per-tenant rate limiting. None of that
exists here. The route handlers above are the seam where a real API client
(or a proxy to a real backend) would replace `getDemoDataset()`.
