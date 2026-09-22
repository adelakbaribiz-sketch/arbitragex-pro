"use client";

import { ListChecks } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { TableSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { ExecutionStatusBadge } from "@/components/dashboard/status-badge";
import { useExecutions } from "@/lib/hooks/use-demo-data";
import { exchangeById } from "@/lib/mock/exchanges";
import { cn, formatMs, formatPct, formatRelativeTime, formatUsd } from "@/lib/utils";

export default function ExecutionsPage() {
  const { data, isLoading } = useExecutions();

  return (
    <div>
      <PageHeader title="Execution log" description="Simulated order placement results for cleared (GO) opportunities." />

      <Card>
        {isLoading ? (
          <TableSkeleton rows={10} cols={7} />
        ) : !data || data.length === 0 ? (
          <EmptyState icon={ListChecks} title="No executions yet" description="Executions appear once opportunities clear the AI audit." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-fg-subtle">
                  <th className="px-4 py-2 font-medium">Symbol</th>
                  <th className="px-4 py-2 font-medium">Route</th>
                  <th className="px-4 py-2 font-medium">Size</th>
                  <th className="px-4 py-2 font-medium">Realized P/L</th>
                  <th className="px-4 py-2 font-medium">Duration</th>
                  <th className="px-4 py-2 font-medium">Executed</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((e) => (
                  <tr key={e.id} className="border-b border-border/60 last:border-0 hover:bg-surface-raised/50">
                    <td className="px-4 py-2 font-mono text-fg">{e.symbol}</td>
                    <td className="px-4 py-2 text-xs text-fg-muted">
                      {exchangeById(e.buyExchangeId)?.name} → {exchangeById(e.sellExchangeId)?.name}
                    </td>
                    <td className="px-4 py-2 font-mono text-fg">{formatUsd(e.sizeUsd, { maximumFractionDigits: 0 })}</td>
                    <td className={cn("px-4 py-2 font-mono", e.realizedPnlUsd >= 0 ? "text-positive" : "text-negative")}>
                      {formatUsd(e.realizedPnlUsd)} ({formatPct(e.realizedPnlPct, 3)})
                    </td>
                    <td className="px-4 py-2 font-mono text-xs text-fg-muted">{formatMs(e.durationMs)}</td>
                    <td className="px-4 py-2 text-xs text-fg-subtle">{formatRelativeTime(e.executedAt)}</td>
                    <td className="px-4 py-2">
                      <ExecutionStatusBadge status={e.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
