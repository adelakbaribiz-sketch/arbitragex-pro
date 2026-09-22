"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { TableSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { AuditVerdictBadge } from "@/components/dashboard/status-badge";
import { useAudits } from "@/lib/hooks/use-demo-data";
import { cn, formatPct, formatRelativeTime } from "@/lib/utils";

export default function AiAuditPage() {
  const { data, isLoading } = useAudits();
  const [onlyGo, setOnlyGo] = useState(false);

  const filtered = data?.filter((a) => !onlyGo || a.verdict === "GO") ?? [];

  return (
    <div>
      <PageHeader
        title="AI Audit"
        description="Monitor → Auditor → Executor: every opportunity is evaluated net of fees, slippage, withdrawal risk, and latency decay before execution."
        action={
          <label className="flex items-center gap-2 text-xs text-fg-muted">
            <input type="checkbox" checked={onlyGo} onChange={(e) => setOnlyGo(e.target.checked)} />
            GO decisions only
          </label>
        }
      />

      {isLoading ? (
        <Card>
          <TableSkeleton rows={6} cols={4} />
        </Card>
      ) : filtered.length === 0 ? (
        <Card>
          <EmptyState icon={ShieldCheck} title="No audit decisions" description="Nothing matches the current filter." />
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((a) => (
            <Card
              key={a.id}
              className={cn("border-l-2 p-4", a.verdict === "GO" ? "border-l-positive" : "border-l-border")}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <AuditVerdictBadge verdict={a.verdict} />
                  <span className="font-mono text-sm text-fg">{a.opportunity?.symbol}</span>
                  <span className="text-xs text-fg-subtle">{formatRelativeTime(a.evaluatedAt)}</span>
                </div>
                <div className="flex items-center gap-4 font-mono text-xs">
                  <span className={a.netProfitPct >= 0 ? "text-positive" : "text-negative"}>
                    net {formatPct(a.netProfitPct, 3)}
                  </span>
                  <span className="text-fg-muted">confidence {(a.confidence * 100).toFixed(0)}%</span>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
                <Factor label="Fees" value={`${a.factors.feesPct.toFixed(3)}%`} />
                <Factor label="Slippage" value={`${a.factors.slippagePct.toFixed(3)}%`} />
                <Factor label="Latency decay" value={`${a.factors.latencyDecayPct.toFixed(4)}%`} />
                <Factor
                  label="Withdrawal risk"
                  value={a.factors.withdrawalRisk}
                  tone={a.factors.withdrawalRisk === "low" ? "positive" : "warning"}
                />
                <Factor
                  label="Exchange health"
                  value={a.factors.exchangeHealth}
                  tone={a.factors.exchangeHealth === "healthy" ? "positive" : a.factors.exchangeHealth === "watch" ? "warning" : "negative"}
                />
              </div>

              <ul className="mt-3 space-y-1 border-t border-border/60 pt-3">
                {a.reasons.map((r, i) => (
                  <li key={i} className="text-xs text-fg-muted">
                    · {r}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function Factor({ label, value, tone }: { label: string; value: string; tone?: "positive" | "warning" | "negative" }) {
  return (
    <div className="rounded-md border border-border/60 px-2.5 py-1.5">
      <p className="text-[10px] uppercase tracking-wide text-fg-subtle">{label}</p>
      <p
        className={cn(
          "font-mono text-xs capitalize",
          tone === "positive" && "text-positive",
          tone === "warning" && "text-accent",
          tone === "negative" && "text-negative",
          !tone && "text-fg",
        )}
      >
        {value}
      </p>
    </div>
  );
}
