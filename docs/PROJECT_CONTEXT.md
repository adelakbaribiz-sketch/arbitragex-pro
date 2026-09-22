# Project Context

## Classification

ArbitrageX Pro is a **Hybrid** project spanning three of the standard
categories:

- **C. SaaS** — multi-tenant, subscription-billed, white-label capable
- **F. Trading / Financial System** — cross-exchange crypto arbitrage detection and execution
- **B. AI Product** — an AI risk auditor gates every trade decision

Given the classification, the deliverable built in this repository is a
**Software/SaaS-style MVP**: a highly polished frontend and product
experience over a deterministic simulated data layer, per the "maximum
credible frontend, minimum necessary backend" brief this project was built
under. It is explicitly **not** a Research Project or Trading System with
real backtested results — see [LIMITATIONS.md](LIMITATIONS.md).

## Origin

The project began as a request for a technical description of an automated
cross-exchange crypto buy/sell platform, compared against existing arbitrage
tools, then extended into a full SaaS specification (white-label, local
banking + crypto payment gateways, multi-tenancy). That specification is the
source of truth for the product surface built here; nothing in this repo
invents new product scope beyond it, except where explicitly noted as an
engineering decision in [DECISIONS.md](DECISIONS.md).

## Competitive context (from the original specification)

| Tool | Limitation cited |
|---|---|
| ArbitrageScanner | Manual, not automated |
| Pionex | Single-venue only |
| Bitsgap / 3Commas / Cryptohopper | CEX-only, miss DEX opportunities |
| ArbiHunt | ~15s detection latency, profit decay |
| BASIS.pro | Opaque proprietary engine, no transparency |

ArbitrageX Pro's differentiation, per the spec: sub-10ms detection target,
AI-gated execution (net-of-cost, not raw spread), CEX+DEX coverage, white-label
+ multi-tenant SaaS, and local + crypto payment rails. **These are target
architecture claims, not benchmarked results** — see
[ARCHITECTURE.md](ARCHITECTURE.md) and [LIMITATIONS.md](LIMITATIONS.md).

## What this repository is, precisely

A Next.js application implementing the trader-facing and admin-facing product
surface described in the specification, backed by a seeded, deterministic
data simulation (`src/lib/mock/generators.ts`) that actually computes the
spread/fee/slippage/threshold math described in the spec rather than using
hand-picked numbers. It is designed so the API route layer
(`src/app/api/**/route.ts`) is the seam where a real backend would plug in.

## What this repository is not

- Not connected to any real exchange, wallet, or payment processor
- Not a backtested trading strategy with real historical performance
- Not audited, certified, or compliant with any regulatory framework
- Not a multi-service backend (Go/Rust/Python/Kafka/RisingWave) — that
  architecture is documented as the production target, not implemented
