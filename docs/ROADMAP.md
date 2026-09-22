# Roadmap

Two roadmaps existed in the original specification (core platform, and
SaaS/white-label) covering 15 months. They're merged here into a single path
from **this demo** to a production system, phrased around what would
actually need to change in this codebase.

## Phase 0 — this deliverable (done)

- Product-complete frontend across 13 routes, dark "quant terminal" design system
- Deterministic simulated data layer with an internally consistent audit formula
- Full documentation suite, security review, build/lint/test pass

## Phase 1 — real backend seam (0-3 months)

- Replace `getDemoDataset()` in each route handler with calls to a real
  backend (or keep Next.js as a BFF in front of it)
- Real authentication (server-issued session or JWT) behind `/login`,
  replacing `useAuthStore`'s client-only mock
- Persist strategy configuration and billing state server-side instead of
  component state

## Phase 2 — market data & detection (3-6 months)

- Market Ingestor service (WebSocket connections to real exchanges via CCXT)
- Streaming spread detector, replacing the deterministic generator
- Real-time push to the dashboard (WebSocket/SSE) instead of TanStack Query polling

## Phase 3 — AI audit & execution (6-9 months)

- Real AI Risk Auditor (model selection is an open question — see
  PROJECT_CONTEXT.md) replacing the deterministic formula in `generators.ts`
- Execution Orchestrator with real exchange order placement, rollback-on-partial-fill
- Paper trading mode backed by real (delayed or sandboxed) market data

## Phase 4 — DEX, compliance, mobile (9-12 months)

- DEX adapters (Uniswap, Curve, PancakeSwap) with gas estimation
- Security audit, SOC 2 / ISO 27001 process start (not a claim of certification)
- Mobile app (React Native), matching the web design system

## Phase 5 — SaaS & white-label at scale (12-15 months)

- Multi-tenant control plane, tenant isolation tiers
- Local banking + crypto payment gateway integrations (region by region,
  starting with whichever markets have the clearest regulatory path)
- White-label deployment automation (custom domain, branding, reseller
  self-service) — the White-Label page in this demo becomes the real admin
  surface for this phase

## Explicit non-goals of this deliverable

This demo does not attempt to validate the sub-10ms latency target, does not
backtest a real strategy, and does not make any regulatory compliance claim.
Those require real infrastructure and real legal review respectively — see
[LIMITATIONS.md](LIMITATIONS.md).
