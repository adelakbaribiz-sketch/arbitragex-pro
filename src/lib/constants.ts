import type { Plan } from "@/types";

// Demo-only credentials for the mock auth flow. No real account, password
// storage, or backend authentication exists behind this — see SECURITY.md.
export const DEMO_CREDENTIALS = {
  email: "demo@arbitragex.pro",
  password: "demo-pass-2026",
};

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    priceUsd: 0,
    billingPeriod: "month",
    features: ["Paper trading only", "3 exchange connections", "5-minute delayed spread feed", "Community support"],
  },
  {
    id: "pro",
    name: "Pro",
    priceUsd: 49,
    billingPeriod: "month",
    features: ["Live trading", "10 exchange connections", "Real-time spread feed", "AI risk auditor", "Email + Telegram alerts"],
    highlighted: true,
  },
  {
    id: "business",
    name: "Business",
    priceUsd: 199,
    billingPeriod: "month",
    features: ["Everything in Pro", "Unlimited exchange connections", "DEX coverage", "Team seats (5)", "Priority support"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceUsd: 999,
    billingPeriod: "custom",
    features: ["Dedicated cluster deployment", "White-label & reseller panel", "FIX API access", "Custom SLA & onboarding"],
  },
];
