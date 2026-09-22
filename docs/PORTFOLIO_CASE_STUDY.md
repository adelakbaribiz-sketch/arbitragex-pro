# Portfolio Case Study — ArbitrageX Pro

**Status: Demo / Prototype** (see the full scale definition in LIMITATIONS.md)

## What I built

A production-quality Next.js frontend for a crypto arbitrage SaaS platform —
13 routes, a custom "quant terminal" design system, and a deterministic
simulated data layer that computes its own numbers via a real fee/slippage
audit formula rather than hard-coding fake stats. Backed by a 16-document
documentation suite that states plainly what's real, mocked, simulated, or
proposed at every layer.

## Problem

Turn a large, ambitious technical specification (multi-service backend,
100+ exchange integrations, AI risk auditing, white-label SaaS, regional
payment rails) into something a reviewer, investor, or hiring manager can
actually open and evaluate in five minutes — without either (a) attempting
to build 15 months of backend infrastructure, or (b) faking results to make
the demo look more finished than it is.

## Approach

1. **Classified the project** (Hybrid: SaaS + Trading System + AI Product)
   and ran a gap analysis against the original spec before writing any code
   — see [PRODUCT_REQUIREMENTS.md](PRODUCT_REQUIREMENTS.md).
2. **Prioritized frontend over infrastructure.** Every backend service in
   the spec (Go ingestor, RisingWave, Rust orchestrator, Kafka) has zero
   visible surface on its own — a reviewer can't evaluate a Kafka topic.
   The frontend, UX, and demo functionality are what's actually assessable,
   so that's where the effort went.
3. **Simulated honestly.** Rather than typing `pnl: 1247.83` into a fixture
   file, `src/lib/mock/generators.ts` implements the actual formula the spec
   describes (`net_profit_pct = spread - fees - slippage - latency_decay`,
   gated against a GO threshold) and computes every number from it via a
   seeded PRNG. The result is synthetic but internally consistent — and it's
   labeled "Simulated data" everywhere it appears.
4. **Designed a distinct visual identity.** A dark, monospace-numerals
   "quant terminal" aesthetic instead of a generic SaaS gradient dashboard —
   chosen because the product is precision trading infrastructure, and
   because this project sits in a portfolio alongside other SaaS demos that
   should not all look identical.
5. **Documented the seam, not just the demo.** Every API route returns data
   shaped so a real backend could sit behind it without a frontend rewrite —
   documented in [ARCHITECTURE.md](ARCHITECTURE.md) and
   [API_SPEC.md](API_SPEC.md).

## Key features

Live spread monitor, AI audit panel with a full factor breakdown and
plain-English reasoning, execution log, portfolio with a TradingView
`lightweight-charts` equity curve, exchange connection management, strategy
configuration, billing, white-label/reseller admin, and a 3-step onboarding
wizard — all with real loading, empty, and populated states.

## Technical / product decisions worth noting

- Rebalanced the AI audit threshold mid-build after discovering the first
  choice produced a 2% GO rate, which left the Execution Log and Portfolio
  pages nearly empty — a good example of a demo that was *technically*
  correct but *practically* useless, caught by actually clicking through it
  rather than just shipping the math. See [DECISIONS.md](DECISIONS.md).
- Fixed a real SSR/hydration bug in the mock auth store (a naive
  `useEffect(() => setHydrated(true))` pattern broke static prerendering)
  by switching to Zustand's `persist.onFinishHydration` API — documented in
  [TESTING.md](TESTING.md).

## Challenges

Balancing "make the demo feel alive" against "never fabricate a result" —
resolved by making the simulation layer computational rather than
hand-authored, and by labeling every simulated surface instead of trying to
make it look real.

## Current status & limitations

Demo/Prototype. No backend, no real exchange or payment integration, no AI
model behind the "AI Auditor" (it's a deterministic formula that mimics the
described behavior). Full itemized breakdown:
[LIMITATIONS.md](LIMITATIONS.md).

## Future roadmap

Phased path from this demo to a real backend, real market data, and a real
audit model: [ROADMAP.md](ROADMAP.md).
