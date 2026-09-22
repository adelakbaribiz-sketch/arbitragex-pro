# Upgrade Report

A targeted quality pass over the initial delivery — evaluated against the
full 17-area matrix (architecture, backend, frontend, database, security,
UX, UI, design system, AI, performance, reliability, testing, DevOps, docs,
observability, production readiness), then fixed only what scored real
findings. This is not a rewrite: the initial build already had a working,
tested, distinctly-designed product surface (see `docs/PORTFOLIO_CASE_STUDY.md`);
this pass corrects specific defects and adds a restrained depth/elevation
layer, rather than re-architecting anything.

## Scope note: why most of the 17 areas are marked "N/A — not applicable"

This is a frontend-only demo with a mock API layer and no database, no auth
backend, and no infrastructure (see `docs/ARCHITECTURE.md`). Backend,
Database, DevOps, and Observability upgrades don't apply because there is no
real backend/database/infra to upgrade — inventing one to have something to
improve would be the exact over-engineering the process this pass follows
warns against. Where an area is genuinely inapplicable, the table says so
rather than manufacturing busywork.

## Improvement matrix

| Area | Problem found | Impact | Priority | Action taken |
|---|---|---|---|---|
| Accessibility | 8 form `<label>` elements not associated with their input (no `htmlFor`/`id`); 2 "label" elements wrapped a button-group, not a form control | Screen readers can't announce what a field is for; a `<label>` with no associated control is itself invalid | **P1** | Added `id`/`htmlFor` pairs to every real label→input relationship; converted the two group headings to `<p>` + `role="group"`/`aria-labelledby` |
| Code duplication | `accent-[#d6a94b]` (a raw hex value) repeated across 8 range/checkbox inputs in 4 files | Violates "3+ repeats → token" rule; a brand color change would require editing 8 call sites | **P2** | Replaced with one global `input[type=range], input[type=checkbox] { accent-color: var(--color-accent) }` rule in `globals.css` |
| Performance | `lightweight-charts` (~230KB) was a static import in the Portfolio page component | Next.js route-based splitting already isolates it to that route, but a static import still forces it to parse before first paint on that route, and risks future accidental reuse | **P2** | Switched to `next/dynamic` with `ssr: false` and a skeleton fallback — canvas-based chart has no SSR value anyway |
| UI — information hierarchy | All 4 dashboard-overview stat tiles were visually equal weight | Master upgrade brief's "grid of cards → information hierarchy" goal; the realized P/L figure is the one number that matters most and didn't read as such | **P1** | Added an `elevated` prop to `StatTile` (accent border + soft glow), applied to exactly the Realized P/L tile — the other three stay flat by design |
| UI — semantic emphasis | AI Audit verdict cards used badge color only; the card itself carried no visual weight difference between GO/NO-GO | AI decisions are the product's core value prop and deserved to read at a glance, not just via a small badge | **P2** | Added a 2px left accent border (positive green on GO, neutral on NO-GO) to each audit card |
| UI — tactile feedback | Buttons had color-only hover states, no depth cue for the primary action | The one primary CTA per screen (Launch demo, Sign in, Save strategy) didn't feel distinct from secondary actions | **P2** | Primary button variant only: soft accent-tinted shadow + 1px hover lift + press-down on click. Secondary/ghost/danger deliberately stay flat |
| Accessibility — motion | No `prefers-reduced-motion` handling anywhere | New hover-lift/shadow transitions would ignore a stated OS-level preference | **P1** | Added a global `@media (prefers-reduced-motion: reduce)` block collapsing all transition/animation durations |
| Architecture | Reviewed module boundaries, coupling, mock-data seam | No findings — `src/lib/mock` is already isolated behind route handlers per `docs/ARCHITECTURE.md`; no circular dependencies, no god components (largest page is `ai-audit/page.tsx` at ~120 lines) | — | No change — "keep, don't rewrite healthy code" |
| Backend / Database / DevOps / Observability | N/A | This deliverable has no real backend, database, or deployed infra by design (see `docs/LIMITATIONS.md`) | — | Not applicable — see scope note above |
| Security | Re-ran the full review after all changes | No new findings; no new dependencies, no new data flows, no new input surface | — | Re-verified only — see `docs/SECURITY.md` (unchanged) |

## What was deliberately *not* done, and why

- **No uniform card shadows.** The `frontend-design` skill explicitly flags
  "the same soft grey shadow under every card" as the single most common
  tell of a generated/templated UI. Depth was applied to exactly two
  semantic moments (the primary KPI, the primary button) — dense tables and
  panels (Opportunities, Executions, Exchanges) stay flat, per the upgrade
  brief's own instruction that working panels should stay fast and flat.
- **No WebGL/Three.js.** Every depth effect is a CSS `box-shadow`/`transform`
  — GPU-cheap, no new dependency, works with `prefers-reduced-motion`.
- **No hover-lift on every card.** Also flagged by `frontend-design` as a
  generic-AI tell; only the primary button variant animates on hover.
- **No BabaHakim/medical-app 3D component set** (3D Stats Card, Spatial
  Dashboard Hero, Patient Summary, etc.) from the generic upgrade template —
  those don't correspond to anything in a crypto-arbitrage product; adding
  them would be exactly the over-engineering the brief warns against.

## Testing after this pass

`npm run build` and `npm run lint` — both clean. Manual verification in
Chromium: landing hero (button lift), dashboard overview (elevated KPI),
AI Audit (GO/NO-GO accent border), Portfolio (dynamic-imported chart still
renders), mobile 375px layout. Zero console errors. See `docs/TESTING.md`
for the full running log (this pass appended to it, not replaced it).
