# Product Requirements

## Personas

| Persona | Goal | Surface in this demo |
|---|---|---|
| Individual trader | Automated arbitrage with minimal setup | Onboarding wizard, Dashboard, Strategy |
| Institutional desk | High-volume, low-latency, compliant execution | AI Audit, Execution Log, System Health |
| Business / reseller | Offer arbitrage under own brand | White-Label & reseller panel |
| Admin / operator | Manage the platform, billing, tenants | Billing, Settings, White-Label sub-tenant list |

## Gap analysis (spec → build)

The original specification described a five-service backend, five-phase
roadmap, and a full compliance program. Building all of that would not have
produced a demonstrable product — most of it is infrastructure with no
visible surface. The gap analysis below is what drove the scope decisions in
[DECISIONS.md](DECISIONS.md):

| Area | Gap found | Resolution |
|---|---|---|
| Product requirements | No concrete page list, no empty/error/loading states specified | Defined 13 routes, all four state types per page |
| UX | No visual identity, no component system | Designed a dedicated dark "quant terminal" identity (see ARCHITECTURE.md → Design System) |
| Technical | No data contract between frontend and backend | Added typed Next.js route handlers (`src/app/api`) as the seam |
| Business logic | GO/NO-GO threshold mentioned but not formalized | Implemented as an explicit, computed formula (see DATA_MODEL.md) |
| Security | Auth mentioned (JWT/OAuth2) but demo needs none of that | Explicit mock auth, clearly labeled, no real credential handling |
| Documentation | None existed | This suite |
| Validation | No test plan | See TESTING.md |
| Demo capability | Backend required for any of it to run | Deterministic simulation layer replaces it, swappable later |

## Features implemented

1. Marketing landing page (problem, solution, features, how-it-works, pricing)
2. Mock authentication (login, logout, session persistence)
3. Onboarding wizard (connect exchanges → configure strategy → paper trade)
4. Dashboard overview (stat tiles, live spread preview, system health, recent audits)
5. Opportunities table (search + status filter)
6. Execution log (simulated fills/partials/rollbacks)
7. Portfolio (equity curve chart, balances by venue)
8. AI Audit panel (verdict, factor breakdown, plain-English reasons, GO-only filter)
9. Exchanges (connection status, latency, fees, masked API keys)
10. Strategy configuration (symbols, spread threshold, position sizing, risk limits)
11. Billing (current plan, plan comparison, invoice history)
12. White-label & reseller (branding form, sub-tenant list)
13. Settings (account, notification channels, danger zone)

Every page carries a visible "Simulated data" badge and every dashboard page
has loading (skeleton), empty, and populated states.

## Explicitly out of scope for this deliverable

- Real backend services, databases, or message queues
- Real exchange API integration
- Real payment processing (local banking or crypto)
- KYC/AML, regulatory compliance implementation
- Multi-language / RTL support
- Real notification delivery (Telegram/Discord/email)

See [ROADMAP.md](ROADMAP.md) for how these get added.
