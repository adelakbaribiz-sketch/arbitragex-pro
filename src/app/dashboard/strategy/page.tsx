"use client";

import { useState } from "react";
import { Check, Save } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { symbols } from "@/lib/mock/exchanges";
import { cn } from "@/lib/utils";

export default function StrategyPage() {
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>(["BTC/USDT", "ETH/USDT", "SOL/USDT"]);
  const [minSpread, setMinSpread] = useState(0.15);
  const [positionSize, setPositionSize] = useState(5000);
  const [maxConcurrent, setMaxConcurrent] = useState(4);
  const [maxDailyLossUsd, setMaxDailyLossUsd] = useState(2000);
  const [saved, setSaved] = useState(false);

  function toggleSymbol(s: string) {
    setSelectedSymbols((list) => (list.includes(s) ? list.filter((v) => v !== s) : [...list, s]));
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  }

  return (
    <div>
      <PageHeader title="Strategy configuration" description="Symbols, spread threshold, position sizing, and risk limits for the execution orchestrator." />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Symbols & spread</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <label className="mb-2 block text-xs font-medium text-fg-muted">Tracked symbols</label>
              <div className="flex flex-wrap gap-2">
                {symbols.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleSymbol(s)}
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
              <label className="mb-2 flex justify-between text-xs font-medium text-fg-muted">
                <span>Minimum net spread</span>
                <span className="font-mono text-accent">{minSpread.toFixed(2)}%</span>
              </label>
              <input type="range" min={0.05} max={0.5} step={0.01} value={minSpread} onChange={(e) => setMinSpread(Number(e.target.value))} className="w-full accent-[#d6a94b]" />
              <p className="mt-1 text-[11px] text-fg-subtle">Opportunities below this net-of-fees threshold are rejected by the AI auditor.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Position sizing & risk limits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <label className="mb-2 flex justify-between text-xs font-medium text-fg-muted">
                <span>Position size per trade</span>
                <span className="font-mono text-accent">${positionSize.toLocaleString()}</span>
              </label>
              <input type="range" min={500} max={50000} step={500} value={positionSize} onChange={(e) => setPositionSize(Number(e.target.value))} className="w-full accent-[#d6a94b]" />
            </div>
            <div>
              <label className="mb-2 flex justify-between text-xs font-medium text-fg-muted">
                <span>Max concurrent positions</span>
                <span className="font-mono text-accent">{maxConcurrent}</span>
              </label>
              <input type="range" min={1} max={20} step={1} value={maxConcurrent} onChange={(e) => setMaxConcurrent(Number(e.target.value))} className="w-full accent-[#d6a94b]" />
            </div>
            <div>
              <label className="mb-2 flex justify-between text-xs font-medium text-fg-muted">
                <span>Max daily loss (circuit breaker)</span>
                <span className="font-mono text-accent">${maxDailyLossUsd.toLocaleString()}</span>
              </label>
              <input type="range" min={200} max={20000} step={200} value={maxDailyLossUsd} onChange={(e) => setMaxDailyLossUsd(Number(e.target.value))} className="w-full accent-[#d6a94b]" />
              <p className="mt-1 text-[11px] text-fg-subtle">Trading halts automatically for the day once realized losses cross this limit.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <Button onClick={handleSave}>
          <Save className="h-3.5 w-3.5" /> Save strategy
        </Button>
        {saved && (
          <span className="flex items-center gap-1.5 text-xs text-positive">
            <Check className="h-3.5 w-3.5" /> Saved to this session (demo only — not persisted server-side)
          </span>
        )}
      </div>
    </div>
  );
}
