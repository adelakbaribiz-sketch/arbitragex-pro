# Limitations — Honest Status

Every claim in this repository's marketing copy, dashboard, and docs maps to
exactly one of these statuses. If something isn't listed here, assume
**NOT IMPLEMENTED**.

| Area | Status | Detail |
|---|---|---|
| Frontend UI (all 13 routes) | **REAL / IMPLEMENTED** | Actually built, actually renders, actually responsive — verified in-browser (see TESTING.md) |
| Design system | **REAL / IMPLEMENTED** | Custom-built, not a template |
| Market opportunities, spreads | **SIMULATED** | Computed by a seeded PRNG + the audit formula in `generators.ts`, not live market data |
| AI audit verdicts (GO/NO_GO) | **SIMULATED** | The fee/slippage/threshold *formula* is real code that actually runs; the fee table, slippage range, and 0.06% threshold are engineering assumptions, not calibrated to real exchange data or a real trained model |
| "AI" in "AI Auditor" | **PROPOSED / NOT IMPLEMENTED** | No ML model, no LLM call. It's deterministic rule-based scoring, presented honestly as such in the code comments — the product copy describes the target design (an AI-gated flow), which this simulates the *behavior* of, not the *implementation* of |
| Executions, fills, P/L | **SIMULATED** | Derived from audit results via the same generator; no real order was ever placed anywhere |
| Portfolio balances, equity curve | **SIMULATED** | Synthetic, derived from simulated executions |
| Exchange connections | **MOCKED** | Static metadata (`exchanges.ts`); no real API calls to any exchange |
| Authentication | **MOCKED** | Client-side only, hardcoded demo credential, `localStorage`-persisted flag — see SECURITY.md |
| API key management (Exchanges/Settings pages) | **MOCKED** | Masked strings are display fixtures, not real keys |
| Billing / invoices / plans | **MOCKED** | Static demo rows; no payment processor is integrated |
| White-label branding / sub-tenants | **MOCKED** | Form state is session-only (not persisted); sub-tenant list is static |
| Notification channels (Telegram/Discord/email) | **MOCKED** | Toggle UI only; nothing is actually sent |
| Backend services (Go ingestor, RisingWave, Rust/Go orchestrator, Kafka, etc.) | **PROPOSED / NOT IMPLEMENTED** | Documented as target architecture in ARCHITECTURE.md; zero lines of it exist in this repo |
| Sub-10ms latency claim | **PROPOSED** | A target design goal from the original specification, not benchmarked or validated by anything in this repository |
| Compliance certifications (ISO 27001, SOC 2, GDPR, MiCA, PCI DSS) | **PROPOSED / NOT IMPLEMENTED** | Named as target requirements in the original spec; no certification process has occurred, no compliance work has been done |
| Real customers, revenue, funding | **NOT IMPLEMENTED / DOES NOT EXIST** | This is a portfolio demo. There are no customers, no revenue, no investors, no signed agreements of any kind |
| Backtested trading performance | **NOT IMPLEMENTED** | No historical backtest was run. The equity curve on the Portfolio page is a simulated demo artifact, not a performance claim |

## What "SIMULATED" means precisely here

Every simulated number in this app is produced by real, readable TypeScript
(`src/lib/mock/generators.ts`) that applies an actual formula to actual
inputs — it is not a hand-typed magic number. That distinguishes "simulated"
from "fabricated": the code that produced e.g. `$413.09` realized P/L can be
read, and the same formula with a different seed produces a different but
equally consistent number. It is still not real trading data and must never
be represented as such.

## Current project stage

**Demo / Prototype**, per the standard scale (Concept → Research → Prototype
→ MVP → Demo → Production). Specifically: a **product demo** — the frontend
is MVP-quality and usable, but the system as a whole has no backend, no real
data sources, and no path to production without the work described in
[ROADMAP.md](ROADMAP.md).
