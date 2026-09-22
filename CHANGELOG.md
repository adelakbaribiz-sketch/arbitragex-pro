# Changelog

All notable changes to this project are documented here.

## [0.2.0] — Master upgrade pass

### Added
- Restrained, semantic depth/elevation system: `--shadow-soft` /
  `--shadow-elevated` / `--shadow-glow-accent` tokens; primary buttons get a
  tactile hover-lift; the Overview page's Realized P/L tile is visually
  elevated as the primary KPI; AI Audit cards get a GO/NO-GO left accent border
- Global `prefers-reduced-motion` support

### Changed
- `PnlChart` (lightweight-charts) now loads via `next/dynamic({ ssr: false })`
  instead of a static import

### Fixed
- 8 form labels not associated with their input (`htmlFor`/`id` added);
  2 button-group headings were mis-marked as `<label>` with no control —
  converted to `<p>` + `role="group"`/`aria-labelledby`
- `accent-[#d6a94b]` duplicated across 8 inputs in 4 files — consolidated
  into one global `input[type=range], input[type=checkbox]` rule

See `docs/UPGRADE-REPORT.md` for the full before/after matrix.

## [0.1.0] — Initial demo release

### Added
- Marketing landing page with hero, feature grid, how-it-works, pricing
- Mock authentication (`/login`) with demo credentials
- 3-step onboarding wizard (connect exchanges → configure strategy → paper trade)
- Authenticated dashboard shell (sidebar + topbar, responsive with mobile drawer nav)
- Dashboard overview with stat tiles, live spread preview, system health, recent audits
- Opportunities page (search + status filter)
- Execution log
- Portfolio page with `lightweight-charts` equity curve and balances by venue
- AI Audit page with factor breakdown and GO-only filter
- Exchanges page (connection status, latency, fees, masked API keys)
- Strategy configuration page
- Billing page (plan comparison, invoice history)
- White-label & reseller page (branding form, sub-tenant list)
- Settings page (account, notifications, danger zone)
- Deterministic simulated data layer (`src/lib/mock`) computing opportunities,
  AI audit verdicts, executions, and an equity curve from a seeded PRNG
- Custom dark "quant terminal" design system (Inter + JetBrains Mono, gold accent)
- Full documentation suite (`docs/`) covering architecture, API, data model,
  security, roadmap, decisions, testing, and an honest limitations breakdown

### Fixed
- `react/no-unescaped-entities` lint errors
- `react-hooks/set-state-in-effect` in the auth gate (switched to
  `persist.onFinishHydration`, guarded for SSR)
- AI audit GO-rate tuning (0.12% threshold produced a 2% GO rate and starved
  the Execution Log/Portfolio pages of data; rebalanced to 0.06% with a
  right-skewed spread distribution for a realistic ~20-35% GO rate)
