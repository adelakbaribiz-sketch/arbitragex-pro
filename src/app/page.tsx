import Link from "next/link";
import {
  ArrowRight,
  Radar,
  ShieldCheck,
  Network,
  Building2,
  Banknote,
  Gauge,
  FlaskConical,
} from "lucide-react";
import { MarketingNav } from "@/components/marketing/nav";
import { MarketingFooter } from "@/components/marketing/footer";
import { PricingTable } from "@/components/marketing/pricing-table";
import { Button } from "@/components/ui/button";
import { DemoBadge } from "@/components/ui/demo-badge";

const features = [
  {
    icon: Radar,
    title: "Sub-10ms spread detection",
    description:
      "A streaming market ingestor and incremental spread detector target sub-10ms opportunity detection across 100+ CEX and 25+ DEX venues.",
  },
  {
    icon: ShieldCheck,
    title: "AI risk auditor",
    description:
      "Every opportunity is scored net of fees, slippage, withdrawal risk, and latency decay before a GO/NO-GO execution decision — not just raw spread.",
  },
  {
    icon: Network,
    title: "CEX + DEX coverage",
    description:
      "Unified market access across centralized exchanges and on-chain liquidity, so opportunities aren't limited to a single venue type.",
  },
  {
    icon: Building2,
    title: "Multi-tenant & white-label",
    description:
      "Tenant isolation tiers from shared to dedicated cluster, plus a reseller panel for partners running the platform under their own brand.",
  },
  {
    icon: Banknote,
    title: "Local + crypto payments",
    description:
      "Regional banking rails alongside BTC, ETH, USDT and USDC settlement, so billing fits the trader's market, not just one region.",
  },
  {
    icon: Gauge,
    title: "Deterministic risk controls",
    description:
      "Circuit breakers, position limits, and rollback-on-partial-fill safeguards are part of the execution design, not an afterthought.",
  },
];

const steps = [
  { step: "01", title: "Connect exchanges", description: "Add read/trade-only API keys — withdrawal permissions stay off by default." },
  { step: "02", title: "Configure strategy", description: "Set symbols, minimum net spread, position sizing, and risk limits." },
  { step: "03", title: "Paper trade", description: "Validate the strategy against live spreads with simulated fills before going live." },
  { step: "04", title: "Go live", description: "The AI auditor gates every opportunity; the orchestrator executes both legs atomically." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg">
      <MarketingNav />

      <section className="mx-auto max-w-6xl px-4 pb-20 pt-16 md:pt-24">
        <div className="flex flex-col items-start gap-6">
          <DemoBadge label="Concept-stage portfolio demo" />
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-fg md:text-5xl">
            Cross-exchange crypto arbitrage, gated by an AI risk audit —{" "}
            <span className="text-accent">not raw spread alone.</span>
          </h1>
          <p className="max-w-2xl text-base text-fg-muted md:text-lg">
            ArbitrageX Pro is a specification-driven concept for a multi-tenant arbitrage platform:
            a streaming detection engine, an AI auditor that only clears trades net of fees, slippage
            and latency decay, and a white-label SaaS layer for resellers. This site is a working
            product demo built on simulated market data.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/onboarding">
              <Button size="lg">
                Explore the demo <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="secondary">
                Sign in to dashboard
              </Button>
            </Link>
          </div>
          <p className="flex items-center gap-1.5 text-xs text-fg-subtle">
            <FlaskConical className="h-3.5 w-3.5" /> No real exchange connections, funds, or trades — every number
            on this site is generated demo data.
          </p>
        </div>
      </section>

      <section id="platform" className="border-t border-border bg-surface/40 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-semibold text-fg">What the platform is designed to do</h2>
          <p className="mt-2 max-w-2xl text-sm text-fg-muted">
            Six capabilities drawn directly from the project&rsquo;s technical specification.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-lg border border-border bg-surface p-5">
                <f.icon className="h-5 w-5 text-accent" />
                <h3 className="mt-3 text-sm font-semibold text-fg">{f.title}</h3>
                <p className="mt-1.5 text-sm text-fg-muted">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-semibold text-fg">How onboarding works</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.step}>
                <span className="font-mono text-xs text-accent">{s.step}</span>
                <h3 className="mt-2 text-sm font-semibold text-fg">{s.title}</h3>
                <p className="mt-1.5 text-sm text-fg-muted">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="border-t border-border bg-surface/40 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-semibold text-fg">Plans</h2>
          <p className="mt-2 max-w-2xl text-sm text-fg-muted">
            Illustrative pricing from the product specification — not a live billing system.
          </p>
          <div className="mt-8">
            <PricingTable />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-lg border border-border bg-surface p-8 text-center md:p-12">
            <h2 className="text-2xl font-semibold text-fg">See the dashboard</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-fg-muted">
              Walk through the live spread monitor, AI audit panel, execution log and portfolio view —
              all populated with a reproducible simulated dataset.
            </p>
            <Link href="/onboarding" className="mt-6 inline-block">
              <Button size="lg">
                Launch the demo <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
