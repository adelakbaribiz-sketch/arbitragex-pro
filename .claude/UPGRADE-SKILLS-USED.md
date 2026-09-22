# Skills Used — Master Upgrade Pass

| Task | Skill used | Reason |
|---|---|---|
| Semantic 3D/depth visual direction | `frontend-design` | Directly governs "distinctive, not-templated visual design" and explicitly warns against the generic-AI tells (uniform card shadows, hover-on-every-card) the upgrade brief itself also warns against — used as the deciding authority when the brief's "add 3D" instruction and "don't overdo it" instruction were in tension |
| Architecture review | *(not invoked)* | The `architecture-review` skill exists but this codebase has no service boundaries, no backend, and no circular-dependency risk to evaluate (single Next.js app, ~90 files) — invoking it would have produced a report with no real findings, which the brief's own "don't manufacture busywork" principle argues against. Did the check manually (module boundaries, coupling) instead, in-line, and recorded "no findings" in `docs/UPGRADE-REPORT.md` |
| Production readiness gate | *(not invoked)* | `production-readiness` targets services being deployed live; this is an explicitly-labeled portfolio demo with no production deployment planned this pass — its checklist (backups, health checks, CI/CD) doesn't apply to a static Next.js demo. Deferred to `docs/ROADMAP.md`, which already covers the real path to production |
| Project recovery / takeover | *(not invoked)* | Both target unfamiliar or half-broken inherited codebases. This session built the codebase itself in the immediately preceding turns — full context was already held, so a discovery pass would have re-derived facts already known |

No new skill was authored — nothing in this pass had enough recurring, reusable shape to justify a custom `SKILL.md` (per the user's standing skill-installation policy: author custom skills deliberately, never crawl/install from raw sources).
