# Testing

No automated test suite (unit/e2e) exists for this deliverable — see
"Not done" below. What follows is what was actually run and verified before
delivery.

## PASSED

- `npm run build` — production build succeeds, 0 errors, all 19 app routes
  compile (13 pages + 6 API routes), correct static/dynamic split
- `npm run lint` — 0 errors, 0 warnings (ESLint 9 + `eslint-config-next`)
- `npm install` — 0 vulnerabilities reported
- Manual click-through in a real browser (Chromium via the Claude Code
  browser tool) of: landing page → login → dashboard, and landing →
  onboarding (all 3 steps, including running the paper-trade simulation) →
  dashboard
- Every dashboard route loaded and rendered its populated state:
  Overview, Opportunities, Execution Log, Portfolio (chart + balances),
  AI Audit, Exchanges, Strategy, Billing, White-Label, Settings
- Responsive check at 375×812 (mobile): landing page, dashboard overview,
  and the hamburger nav drawer — no horizontal page overflow
  (`document.body.scrollWidth === window.innerWidth`, verified via console)
- Browser console checked for errors on landing, login, dashboard, and
  mobile dashboard — zero errors logged
- Internal link audit — every `<Link href>` in the codebase (`grep`)
  resolves to a real route; no dead links
- Data sanity check — initial GO-rate tuning produced 1/42 GO decisions,
  which starved the Execution Log and Portfolio pages of data; rebalanced
  the audit threshold and spread distribution (see DECISIONS.md) and
  re-verified a healthy ~20-35% GO rate with populated executions and a
  non-trivial equity curve

## FIXED during this pass

- `react/no-unescaped-entities` (2 files) — raw apostrophes replaced with `&rsquo;`
- `react-hooks/set-state-in-effect` in the auth gate — replaced the
  effect-driven hydration flag with Zustand's `persist.onFinishHydration`
  API, guarded for SSR (`typeof window !== "undefined"`) after it broke
  static prerendering of `/dashboard`
- Unrealistic GO-rate (2%) from an initial threshold choice — rebalanced
  per above

## REMAINING / not done

- **No automated tests** (no Jest/Vitest/Playwright suite). For a portfolio
  demo of this scope, manual + build/lint verification was prioritized over
  writing a test harness for UI that has no backend logic to unit test yet.
  Adding Playwright coverage for the onboarding → dashboard flow is a
  reasonable Phase 1 addition (see ROADMAP.md).
- **No cross-browser testing** beyond Chromium.
- **No accessibility audit tool run** (e.g. axe) — components use semantic
  HTML and visible focus states, but this hasn't been formally verified
  against WCAG.
- **No load/performance testing** — not meaningful for a static demo with no
  backend.
