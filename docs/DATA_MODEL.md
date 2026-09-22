# Data Model

Types live in `src/types/index.ts` and are the single source of truth — this
document describes them, it does not redefine them.

## Entities

### Exchange
Static per-venue metadata: `id`, `name`, `kind` (CEX/DEX), `status`,
`latencyMs`, `makerFeeBps`, `takerFeeBps`, `withdrawalEnabled`, `region`.
Seeded in `src/lib/mock/exchanges.ts` with 10 representative venues (7 CEX,
3 DEX) — a subset of the 100+/25+ the target architecture connects to.

### Opportunity
A detected arbitrage opportunity: symbol, buy/sell venue, buy/sell price,
`spreadPct`, `estNetPct` (post-audit), `status`, `detectedAt`,
`latencyBudgetMs`.

### AuditDecision
The AI auditor's evaluation of one opportunity: `verdict` (GO/NO_GO),
`netProfitPct`, `confidence`, `reasons` (plain-English), and a `factors`
breakdown (fees, slippage, withdrawal risk, latency decay, exchange health).
1:1 with `Opportunity` by `opportunityId`.

### Execution
The simulated result of executing a GO opportunity: size, realized P/L
(USD and %), `status` (filled/partial/failed/rolled_back), duration.

### PortfolioBalance / EquityPoint
Aggregated balances per exchange/asset, and a 30-day daily equity curve
derived from execution P/L plus a small simulated drift term.

### Plan / Tenant
Billing plan tiers (`src/lib/constants.ts`) and reseller sub-tenants (static
demo rows in the White-Label page).

## Relationships

```
Exchange 1──* Opportunity (buyExchangeId, sellExchangeId)
Opportunity 1──1 AuditDecision
AuditDecision 1──0..1 Execution   (only when verdict = GO and selected for execution)
Execution *──1 Exchange            (via buyExchangeId / sellExchangeId)
```

## Generation order (`src/lib/mock/generators.ts`)

1. Generate 42 opportunities with synthetic prices around realistic bases (`basePrice()`) and a right-skewed spread distribution
2. Run the audit formula on each → `AuditDecision`
3. Assign `Opportunity.status` from the verdict (`rejected` on NO_GO; `closed`/`audited` split on GO)
4. Derive `Execution` rows from `closed` opportunities
5. Derive the 30-day equity curve from execution P/L
6. Derive portfolio balances and system health metrics

Everything is derived from one seeded PRNG (`mulberry32`, seed `20260101`),
so the dataset is reproducible, not re-randomized per request.

## What a real data model would add (PROPOSED)

Per the original specification: `User`, full `Tenant` hierarchy with
isolation tier, `ApiKey` (Vault-backed, scoped permissions), `Invoice`/
`Payment` with real gateway references, `AuditLog` with cryptographic
hashing, and time-series-optimized storage (TimescaleDB) for tick-level
market data. None of these are implemented; this demo's types intentionally
stop at what the UI needs to render.
