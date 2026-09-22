# Business & Product Overview

*Illustrative — describes the product concept this demo represents, not a
funded or operating business. No claims below are validated or proven.*

## Problem

Crypto prices diverge across 100+ exchanges (CEX and DEX). Capturing the
spread profitably needs millisecond-scale detection, a real net-of-cost
profitability check (not raw spread), and atomic dual-leg execution.
Existing tools are manual, single-venue, CEX-only, or execute on unfiltered
spread — see the competitive comparison in
[PROJECT_CONTEXT.md](PROJECT_CONTEXT.md).

## Target customer

- Individual crypto traders wanting automated, risk-gated arbitrage
- Institutional trading desks needing low-latency, compliant execution
- Businesses/resellers wanting to offer arbitrage-as-a-service under their
  own brand (white-label)

## Solution

A multi-tenant SaaS platform: streaming detection, an AI-style risk audit
that only clears net-profitable trades, atomic execution with rollback
safeguards, and a white-label layer for resellers. This repository
implements and demonstrates the **product experience** of that solution.

## Product workflow

Connect exchanges (read/trade-only keys) → configure strategy (symbols,
spread floor, position sizing, risk limits) → paper trade to validate →
go live, with every opportunity gated by the audit step before execution.
See [USER_FLOWS.md](USER_FLOWS.md).

## Differentiation (as specified, not benchmarked)

Sub-10ms detection target, net-of-cost audit gate (not raw spread), combined
CEX+DEX coverage, white-label + multi-tenant SaaS architecture, local +
crypto payment rails. These are design goals from the original specification
— see [LIMITATIONS.md](LIMITATIONS.md) for what has and hasn't been
validated.

## Monetization (illustrative)

Tiered subscription (Free / Pro $49 / Business $199 / Enterprise custom),
modeled in `src/lib/constants.ts` and shown on the Billing and landing
pages. A real system would likely add usage-based fees and reseller revenue
share, per the original specification — not implemented here.

## Scalability

The target architecture (ARCHITECTURE.md) is designed for multi-tenant
scaling via isolation tiers, from shared infrastructure up to dedicated
clusters for enterprise/white-label deployments. This demo runs as a single
stateless Next.js process and makes no scalability claim of its own.

## Current stage

**Concept-stage portfolio demo.** No customers, no revenue, no funding, no
regulatory approval. See [LIMITATIONS.md](LIMITATIONS.md) for the complete,
itemized status of every claim in this repository.
