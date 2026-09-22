# Architecture

## What's actually running (this repository)

```
┌─────────────────────────────────────────────────────────────┐
│ Browser                                                       │
│  Next.js App Router (React 19) ── Zustand (auth) ── TanStack │
│  Query (data fetching, 15s stale time)                        │
└───────────────────────────┬───────────────────────────────────┘
                              │ fetch()
┌───────────────────────────▼───────────────────────────────────┐
│ Next.js Route Handlers (src/app/api/**)                        │
│  /api/opportunities  /api/audits  /api/executions               │
│  /api/portfolio      /api/exchanges  /api/system-health          │
└───────────────────────────┬───────────────────────────────────┘
                              │
┌───────────────────────────▼───────────────────────────────────┐
│ Deterministic simulation layer (src/lib/mock)                   │
│  rng.ts (seeded PRNG) → generators.ts (computes opportunities,  │
│  runs the audit formula, derives executions + equity curve)     │
└───────────────────────────────────────────────────────────────┘
```

There is one process, one deployment artifact, and zero external
dependencies at runtime (no database, no queue, no third-party API calls).
The dataset is generated once per server lifetime from a fixed seed
(`generateDemoDataset(20260101)` in `src/lib/mock/dataset.ts`), so numbers
are stable within a session and reproducible across restarts.

### Why route handlers instead of static fixtures

The mock data could have been imported directly into client components. It's
served through real Next.js route handlers instead so that:

1. The frontend already talks to `fetch("/api/...")`, matching how it would
   talk to a real backend — swapping the mock data source for a real one
   later is a change inside the route handler, not a rewrite of every page.
2. TanStack Query's loading/error states are exercised for real (network
   round-trip), not simulated separately.

### The AI audit formula (actually computed, not fabricated)

`src/lib/mock/generators.ts` implements, in code:

```
net_profit_pct = spread_pct
               - (buy_exchange.taker_fee + sell_exchange.taker_fee)
               - slippage_pct
               - latency_decay_pct

verdict = GO   if net_profit_pct >= 0.06% AND exchange_health != "unhealthy"
          NO_GO otherwise
```

This mirrors the "Entry" formula in the original specification
(`spread_pct = ((ask_A - bid_B) / bid_B) * 100`) extended with the cost
factors the spec's AI Auditor is described as evaluating. The 0.06% floor,
the slippage range (0.01–0.08%), and the exchange fee table
(`src/lib/mock/exchanges.ts`) are engineering assumptions calibrated so the
GO rate lands in a realistic ~20-35% range — see
[DECISIONS.md](DECISIONS.md) for why, and [LIMITATIONS.md](LIMITATIONS.md)
for the fact that these are not real market-calibrated parameters.

## Design system

A dedicated "quant terminal" visual identity, distinct from a generic SaaS
template, chosen because the product is precision/data-dense trading
infrastructure, not a consumer app:

| Token | Value | Rationale |
|---|---|---|
| Background | `#0a0b0d` (near-black) | Dark-mode-first, low eye strain for a monitoring dashboard |
| Accent | `#d6a94b` (muted gold) | Evokes precision instruments / terminal displays; avoids the generic blue/purple SaaS gradient look |
| Positive / negative | `#3fb68b` / `#e5636a` (muted, not neon) | P/L semantics without looking like a casino |
| Body font | Inter | Neutral, high legibility UI text |
| Data font | JetBrains Mono | All numeric values (prices, percentages, P/L) render in monospace with `tabular-nums`, so columns of numbers align — a deliberate trading-terminal convention |

Components (`src/components/ui/*`) are hand-built primitives (Button, Card,
Badge, StatTile, EmptyState, Skeleton, DemoBadge) — not a third-party
component library — so the visual language stays consistent and specific to
this product rather than defaulting to a shadcn/ui look shared across every
other project in this portfolio.

## Target production architecture (PROPOSED, not implemented)

The original specification describes a five-service backend. It is recorded
here for completeness and as the basis for [ROADMAP.md](ROADMAP.md); none of
it exists in this repository.

```
Market Ingestor (Go)         WebSocket connections to 100+ CEX / 25+ DEX,
                              tick normalization
        │
Stream Processor (RisingWave) incremental materialized-view spread detection
        │
AI Risk Auditor (Python/LangGraph)  Monitor → Auditor → Executor flow,
                              GO/NO-GO net of fees/slippage/withdrawal/latency
        │
Execution Orchestrator (Rust/Go)    simultaneous entry+exit legs, atomicity,
                              rollback on partial fill
        │
API Gateway (Node.js/TypeScript)    REST + WebSocket + gRPC + FIX, JWT/OAuth2
```

Data stores: PostgreSQL (accounts/trades), TimescaleDB (time-series),
Redis (cache), Kafka (message bus). Multi-tenancy via control-plane/data-plane
separation with tiered isolation (shared → dedicated cluster). Full detail in
the original specification; this document does not restate every field since
none of it is built.

## Why no backend was built for this deliverable

Per the brief this MVP was built under: prioritize frontend, product flow,
UX, and demo functionality over infrastructure that has no visible surface.
A Go/Rust/Python microservice mesh would not make the demo more credible to
look at or use — a data layer that computes real, consistent numbers does.
The route-handler seam means a real backend can be added later without a
frontend rewrite.
