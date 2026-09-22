# User Flows

## 1. First-time visitor → dashboard

```
/ (landing) → "Launch demo" → /onboarding
  Step 1: Connect exchanges (toggle venues, no real keys)
  Step 2: Configure strategy (symbols, min spread, position size)
  Step 3: Paper trade (runs a simulated pass, shows match count)
  → "Enter dashboard" (auto-authenticates with demo credentials) → /dashboard
```

Alternative entry: `/ → "Sign in" → /login` with pre-filled demo credentials
→ `/dashboard`.

## 2. Arbitrage detection → execution (simulated)

This is the conceptual flow the dashboard visualizes; it happens once at
data-generation time (`generateDemoDataset`), not as a live stream:

```
Opportunity detected (spread computed from synthetic prices)
  → AI Auditor evaluates (fees + slippage + latency decay vs. spread)
  → GO: ~85% proceed to a simulated execution (fill/partial/rollback)
    NO_GO: opportunity marked "rejected", visible in Opportunities + AI Audit
```

Visible across: Overview (preview), Opportunities (full list, filterable),
AI Audit (full factor breakdown), Execution Log (results), Portfolio (equity
curve derived from execution P/L).

## 3. Strategy configuration

```
/dashboard/strategy → adjust symbols / spread floor / position size /
  daily-loss circuit breaker → "Save strategy"
  → confirmation shown, state held in the page only (not persisted —
    see LIMITATIONS.md)
```

## 4. Reseller / white-label

```
/dashboard/white-label → edit brand name, domain, accent color, logo
  → "Save branding" (session-only) 
  → sub-tenant list shown (static demo data) for a reseller managing
    downstream accounts
```

## 5. Billing

```
/dashboard/billing → view current plan → compare plans (PricingTable,
  shared with the landing page for consistency) → view invoice history
  (static demo rows) — no live payment processor
```

## 6. Sign out

```
Topbar → user menu → "Sign out" → auth store cleared → redirected to /login
```
