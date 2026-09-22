# Decisions Log

| Decision | Reason |
|---|---|
| Next.js 16 App Router + Route Handlers (not a separate backend) | The brief prioritizes frontend/UX over infrastructure with no visible surface; route handlers still give a real HTTP seam to swap in a backend later |
| Deterministic seeded PRNG (mulberry32) instead of `Math.random()` | Demo numbers must be reproducible and internally consistent, not re-randomized on every request/render |
| AI audit formula actually computed from fee/slippage/threshold inputs, not hand-typed numbers | The brief explicitly forbids fabricating results; a computed-but-synthetic formula is honest, hand-picked stats would not be |
| GO threshold set to 0.06% net (not the initially-tried 0.12%) | 0.12% produced a ~2% GO rate — technically consistent but made Execution Log/Portfolio look broken/empty; 0.06% yields a ~20-35% GO rate, which is still selective (demonstrating the auditor rejects most raw spreads) while populating the rest of the product |
| Dark "quant terminal" visual identity (near-black, gold accent, monospace numerics) | Differentiates from generic SaaS gradient dashboards and from other projects in this portfolio; fits a precision-trading-infrastructure product |
| Hand-built UI primitives instead of a component library | Keeps the visual language specific to this product rather than a shared shadcn/ui look across every portfolio project |
| Mock auth via Zustand `persist`, explicitly labeled everywhere | Needed to gate the dashboard behind a login screen for product realism, without pretending to be real security (see SECURITY.md) |
| `lightweight-charts` (TradingView) for the equity curve | Named explicitly in the original tech stack; also a genuinely good fit for a finance dashboard vs. a generic charting library |
| No database, no ORM, no persistence beyond `localStorage` (auth flag only) | Nothing in this demo needs to survive a page reload except "am I logged in"; adding a database would be infrastructure with no product benefit at this stage |
| Full docs suite written to match the actual code, not the original spec verbatim | The spec describes a 15-month, five-service platform; the docs describe what's actually in this repository, with the target architecture clearly marked PROPOSED |
