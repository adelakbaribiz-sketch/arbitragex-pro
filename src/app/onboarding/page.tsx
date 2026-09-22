"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, ChevronRight, TrendingUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { exchanges, symbols } from "@/lib/mock/exchanges";
import { useAuthStore } from "@/lib/store/auth-store";
import { DEMO_CREDENTIALS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const steps = ["Connect exchanges", "Configure strategy", "Paper trade"];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [selectedExchanges, setSelectedExchanges] = useState<string[]>(["binance", "okx", "coinbase"]);
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>(["BTC/USDT", "ETH/USDT"]);
  const [minSpread, setMinSpread] = useState(0.15);
  const [positionSize, setPositionSize] = useState(5000);
  const [simulating, setSimulating] = useState(false);
  const [simDone, setSimDone] = useState(false);
  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  function toggle(list: string[], setList: (v: string[]) => void, value: string) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  function runPaperTrade() {
    setSimulating(true);
    setSimDone(false);
    setTimeout(() => {
      setSimulating(false);
      setSimDone(true);
    }, 1600);
  }

  function enterDashboard() {
    login(DEMO_CREDENTIALS.email, DEMO_CREDENTIALS.password);
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-3xl items-center gap-2 px-4">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-accent text-accent-foreground">
            <TrendingUp className="h-4.5 w-4.5" />
          </div>
          <span className="text-base font-semibold tracking-tight">ArbitrageX Pro</span>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-8 flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-2">
              <div
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs",
                  i < step && "border-positive bg-positive/10 text-positive",
                  i === step && "border-accent bg-accent/10 text-accent",
                  i > step && "border-border text-fg-subtle",
                )}
              >
                {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span className={cn("hidden text-xs sm:inline", i === step ? "text-fg" : "text-fg-subtle")}>{s}</span>
              {i < steps.length - 1 && <div className="h-px flex-1 bg-border" />}
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-border bg-surface p-6">
          {step === 0 && (
            <div>
              <h2 className="text-lg font-semibold text-fg">Connect exchanges</h2>
              <p className="mt-1 text-sm text-fg-muted">
                Demo only — no real API keys are requested or stored. Pick venues to include in the simulated feed.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {exchanges.map((ex) => {
                  const active = selectedExchanges.includes(ex.id);
                  return (
                    <button
                      key={ex.id}
                      onClick={() => toggle(selectedExchanges, setSelectedExchanges, ex.id)}
                      className={cn(
                        "flex items-center justify-between rounded-md border px-3 py-2.5 text-left text-sm transition-colors",
                        active ? "border-accent/50 bg-accent/5 text-fg" : "border-border text-fg-muted hover:border-border-strong",
                      )}
                    >
                      {ex.name}
                      {active && <Check className="h-3.5 w-3.5 text-accent" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-lg font-semibold text-fg">Configure strategy</h2>
              <p className="mt-1 text-sm text-fg-muted">Symbols, minimum net spread, and position sizing.</p>

              <div className="mt-5 space-y-5">
                <div>
                  <p className="mb-2 text-xs font-medium text-fg-muted" id="onboarding-symbols-label">Symbols</p>
                  <div className="flex flex-wrap gap-2" role="group" aria-labelledby="onboarding-symbols-label">
                    {symbols.map((s) => (
                      <button
                        key={s}
                        onClick={() => toggle(selectedSymbols, setSelectedSymbols, s)}
                        className={cn(
                          "rounded-full border px-3 py-1 font-mono text-xs",
                          selectedSymbols.includes(s)
                            ? "border-accent/50 bg-accent/10 text-accent"
                            : "border-border text-fg-muted hover:border-border-strong",
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="onboarding-min-spread" className="mb-2 flex justify-between text-xs font-medium text-fg-muted">
                    <span>Minimum net spread</span>
                    <span className="font-mono text-accent">{minSpread.toFixed(2)}%</span>
                  </label>
                  <input
                    id="onboarding-min-spread"
                    type="range"
                    min={0.05}
                    max={0.5}
                    step={0.01}
                    value={minSpread}
                    onChange={(e) => setMinSpread(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="onboarding-position-size" className="mb-2 flex justify-between text-xs font-medium text-fg-muted">
                    <span>Position size per trade</span>
                    <span className="font-mono text-accent">${positionSize.toLocaleString()}</span>
                  </label>
                  <input
                    id="onboarding-position-size"
                    type="range"
                    min={500}
                    max={50000}
                    step={500}
                    value={positionSize}
                    onChange={(e) => setPositionSize(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-lg font-semibold text-fg">Paper trade</h2>
              <p className="mt-1 text-sm text-fg-muted">
                Runs your configuration against a simulated tick stream — no real orders are placed.
              </p>

              <div className="mt-5 rounded-md border border-border bg-surface-raised p-4">
                <div className="grid grid-cols-2 gap-3 text-xs text-fg-muted sm:grid-cols-4">
                  <div>
                    <p className="text-fg-subtle">Exchanges</p>
                    <p className="mt-0.5 font-mono text-fg">{selectedExchanges.length}</p>
                  </div>
                  <div>
                    <p className="text-fg-subtle">Symbols</p>
                    <p className="mt-0.5 font-mono text-fg">{selectedSymbols.length}</p>
                  </div>
                  <div>
                    <p className="text-fg-subtle">Min spread</p>
                    <p className="mt-0.5 font-mono text-fg">{minSpread.toFixed(2)}%</p>
                  </div>
                  <div>
                    <p className="text-fg-subtle">Position size</p>
                    <p className="mt-0.5 font-mono text-fg">${positionSize.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-4">
                  {!simDone && (
                    <Button onClick={runPaperTrade} disabled={simulating} variant="secondary" size="sm">
                      {simulating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                      {simulating ? "Simulating…" : "Run paper trading pass"}
                    </Button>
                  )}
                  {simDone && (
                    <div className="flex items-center gap-2">
                      <Badge tone="positive">Simulation complete</Badge>
                      <span className="text-xs text-fg-muted">6 opportunities matched your filters in the demo dataset.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
            <Button variant="ghost" size="sm" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
              Back
            </Button>
            {step < 2 ? (
              <Button size="sm" onClick={() => setStep((s) => s + 1)}>
                Continue <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            ) : (
              <Button size="sm" onClick={enterDashboard} disabled={!simDone}>
                Enter dashboard <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-fg-subtle">
          <Link href="/" className="hover:text-fg-muted">← Back to overview</Link>
        </p>
      </div>
    </div>
  );
}
