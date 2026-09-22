# Security Review

Performed against the codebase as of this repository's initial commit.
Scope: this Next.js demo application only — not the (unimplemented) target
production architecture.

## Secrets

- **Finding: none.** No API keys, passwords, tokens, or credentials are
  committed anywhere in the repository. `grep` for `dangerouslySetInnerHTML`,
  `eval(`, and `document.write` returned zero matches.
- The one credential-shaped value in the codebase is the **demo login
  password** (`src/lib/constants.ts`, `DEMO_CREDENTIALS`). It is not a
  secret — it's displayed on the login page itself so reviewers can sign in.
  It gates nothing real.

## Authentication

- **This is intentionally mock authentication**, not a security boundary.
  `src/lib/store/auth-store.ts` compares the submitted email/password against
  a hardcoded constant, client-side, in plaintext, and sets a flag persisted
  to `localStorage` via Zustand's `persist` middleware.
- **Implication:** anyone can bypass `/login` entirely by setting
  `arbitragex-demo-auth` in `localStorage`, or by reading the demo password
  out of the client bundle (it's shipped to the browser either way). This is
  acceptable *only* because there is no real data or backend behind the
  gate — it exists purely so the dashboard isn't the first thing a visitor
  sees. It must not be reused as-is for anything with real user data.

## Authorization

Not applicable — single demo user, no roles, no per-tenant data (the
White-Label sub-tenant list is static display data, not access-controlled).

## Input validation

- The only user-supplied text that flows anywhere is the Opportunities page
  search box (`src/app/dashboard/opportunities/page.tsx`) and various form
  inputs (strategy sliders, branding fields). All of it is used in
  client-side `Array.filter` / component state only — never sent to a
  server, never interpolated into HTML or a query string.
- API routes (`src/app/api/**/route.ts`) take no request parameters, so there
  is no server-side input surface to validate.

## XSS

No `dangerouslySetInnerHTML`, no raw HTML interpolation, no `eval`. All
dynamic values render through JSX text interpolation, which React escapes by
default.

## Injection

No database, no ORM, no raw queries — not applicable to this codebase.

## File upload

The White-Label "Upload logo" control (`src/app/dashboard/white-label/page.tsx`)
is a styled button with **no file input wired up and no upload handler** —
it does nothing on click by design, to avoid implying a working upload
pipeline that doesn't exist. If this is extended, it needs server-side
type/size validation and a dedicated storage bucket before going further.

## API exposure

All six route handlers are read-only `GET` endpoints returning synthetic
data (`meta.source: "simulated"` on every payload). There is nothing to leak
because there is nothing real behind them.

## Sensitive data

None handled. No PII is collected (login is mock, forms don't submit
anywhere real). Masked strings shown in the Exchanges/Settings pages
(`••••••••bin`, `axp_live_••••••••••••3f21`) are hardcoded display fixtures,
not real key material.

## Dependency risk

Dependencies are current major versions of actively maintained packages
(Next.js 16, React 19, TanStack Query 5, Zustand 5, lightweight-charts 5).
`npm install` reported 0 vulnerabilities at build time (see TESTING.md). No
dependency reaches out to a third-party network endpoint at runtime.

## Summary

| Category | Status |
|---|---|
| Secrets in repo | None found |
| Real auth | Not implemented (by design — mock gate only) |
| XSS / injection surface | None found |
| File upload risk | None (upload UI is non-functional by design) |
| Dependency vulnerabilities | None reported |

**Before any real deployment of this codebase beyond a portfolio demo**, the
mock auth store must be replaced with real server-side session/token auth,
and every route handler that would eventually accept parameters needs
server-side validation — see [ROADMAP.md](ROADMAP.md).
