"use client";

import Link from "next/link";
import { ArrowUpRight, Zap, ShieldCheck, Wallet, Activity } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatTile } from "@/components/ui/stat-tile";
import { TableSkeleton } from "@/components/ui/skeleton";
import { useAudits, useExecutions, useOpportunities, useSystemHealth } from "@/lib/hooks/use-demo-data";
import { OpportunityStatusBadge, AuditVerdictBadge } from "@/components/dashboard/status-badge";
import { formatPct, formatRelativeTime, formatUsd } from "@/lib/utils";
import { exchangeById } from "@/lib/mock/exchanges";
import { cn } from "@/lib/utils";

export default function DashboardOverviewPage() {
  const { data: opportunities, isLoading: loadingOpps } = useOpportunities();
  const { data: audits } = useAudits();
  const { data: executions } = useExecutions();
  const { data: health } = useSystemHealth();

  const goCount = audits?.filter((a) => a.verdict === "GO").length ?? 0;
  const totalAudits = audits?.length ?? 0;
  const goRate = totalAudits ? (goCount / totalAudits) * 100 : 0;

  const totalPnl = executions?.reduce((sum, e) => sum + e.realizedPnlUsd, 0) ?? 0;
  const filledCount = executions?.filter((e) => e.status === "filled").length ?? 0;

  const activeOpportunities = opportunities?.filter((o) => o.status === "audited" || o.status === "detected").length ?? 0;

  return (
    <div>
      <PageHeader title="Overview" description="Live view of detection, AI audit, and execution across connected venues." />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile
          label="Realized P/L (30d)"
          value={formatUsd(totalPnl)}
          delta={`${filledCount} filled executions`}
          deltaTone={totalPnl >= 0 ? "positive" : "negative"}
          icon={Wallet}
        />
        <StatTile
          label="AI audit GO rate"
          value={`${goRate.toFixed(1)}%`}
          delta={`${goCount}/${totalAudits} opportunities cleared`}
          deltaTone="neutral"
          icon={ShieldCheck}
        />
        <StatTile
          label="Active opportunities"
          value={String(activeOpportunities)}
          delta="awaiting audit or execution"
          deltaTone="neutral"
          icon={Zap}
        />
        <StatTile
          label="System status"
          value={health?.some((h) => h.status === "critical") ? "Attention needed" : "Operational"}
          delta={`${health?.filter((h) => h.status !== "ok").length ?? 0} components flagged`}
          deltaTone={health?.some((h) => h.status === "critical") ? "negative" : "positive"}
          icon={Activity}
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Live spread monitor</CardTitle>
            <Link href="/dashboard/opportunities" className="flex items-center gap-1 text-xs text-fg-muted hover:text-accent">
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          {loadingOpps ? (
            <TableSkeleton rows={6} cols={5} />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-fg-subtle">
                    <th className="px-4 py-2 font-medium">Symbol</th>
                    <th className="px-4 py-2 font-medium">Route</th>
                    <th className="px-4 py-2 font-medium">Spread</th>
                    <th className="px-4 py-2 font-medium">Net est.</th>
                    <th className="px-4 py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {opportunities?.slice(0, 7).map((o) => (
                    <tr key={o.id} className="border-b border-border/60 last:border-0">
                      <td className="px-4 py-2 font-mono text-fg">{o.symbol}</td>
                      <td className="px-4 py-2 text-xs text-fg-muted">
                        {exchangeById(o.buyExchangeId)?.name} → {exchangeById(o.sellExchangeId)?.name}
                      </td>
                      <td className="px-4 py-2 font-mono text-fg">{formatPct(o.spreadPct)}</td>
                      <td className={cn("px-4 py-2 font-mono", o.estNetPct >= 0 ? "text-positive" : "text-negative")}>
                        {formatPct(o.estNetPct, 3)}
                      </td>
                      <td className="px-4 py-2">
                        <OpportunityStatusBadge status={o.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {health?.map((h) => (
              <div key={h.label} className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-fg">{h.label}</p>
                  <p className="text-[11px] text-fg-subtle">{h.detail}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      h.status === "ok" && "bg-positive",
                      h.status === "warning" && "animate-pulse-dot bg-accent",
                      h.status === "critical" && "animate-pulse-dot bg-negative",
                    )}
                  />
                  <span className="font-mono text-xs text-fg-muted">{h.value}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Recent AI audit decisions</CardTitle>
          <Link href="/dashboard/ai-audit" className="flex items-center gap-1 text-xs text-fg-muted hover:text-accent">
            View all <ArrowUpRight className="h-3 w-3" />
          </Link>
        </CardHeader>
        <CardContent className="space-y-2">
          {audits?.slice(0, 4).map((a) => (
            <div key={a.id} className="flex items-center justify-between gap-3 rounded-md border border-border/60 px-3 py-2">
              <div className="flex items-center gap-3">
                <AuditVerdictBadge verdict={a.verdict} />
                <span className="font-mono text-sm text-fg">{a.opportunity?.symbol}</span>
                <span className="text-xs text-fg-subtle">{formatRelativeTime(a.evaluatedAt)}</span>
              </div>
              <span className={cn("font-mono text-xs", a.netProfitPct >= 0 ? "text-positive" : "text-negative")}>
                {formatPct(a.netProfitPct, 3)} net
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
