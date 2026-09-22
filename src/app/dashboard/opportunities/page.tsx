"use client";

import { useMemo, useState } from "react";
import { Search, Zap } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { TableSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { OpportunityStatusBadge } from "@/components/dashboard/status-badge";
import { useOpportunities } from "@/lib/hooks/use-demo-data";
import { exchangeById } from "@/lib/mock/exchanges";
import { formatPct, formatRelativeTime, cn } from "@/lib/utils";
import type { OpportunityStatus } from "@/types";

const statusFilters: (OpportunityStatus | "all")[] = ["all", "detected", "audited", "executing", "closed", "rejected"];

export default function OpportunitiesPage() {
  const { data, isLoading } = useOpportunities();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<OpportunityStatus | "all">("all");

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.filter((o) => {
      const matchesQuery = o.symbol.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "all" || o.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [data, query, status]);

  return (
    <div>
      <PageHeader title="Opportunities" description="All detected arbitrage opportunities from the simulated spread detector." />

      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-fg-subtle" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbol…"
            className="w-full rounded-md border border-border bg-surface py-2 pl-8 pr-3 text-sm text-fg outline-none focus:border-accent/50"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {statusFilters.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={cn(
                "rounded-md border px-2.5 py-1 text-xs capitalize",
                status === s ? "border-accent/50 bg-accent/10 text-accent" : "border-border text-fg-muted hover:border-border-strong",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <Card>
        {isLoading ? (
          <TableSkeleton rows={10} cols={7} />
        ) : filtered.length === 0 ? (
          <EmptyState icon={Zap} title="No opportunities match" description="Try clearing the search or status filter." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-fg-subtle">
                  <th className="px-4 py-2 font-medium">Symbol</th>
                  <th className="px-4 py-2 font-medium">Buy</th>
                  <th className="px-4 py-2 font-medium">Sell</th>
                  <th className="px-4 py-2 font-medium">Spread</th>
                  <th className="px-4 py-2 font-medium">Net est.</th>
                  <th className="px-4 py-2 font-medium">Detected</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => (
                  <tr key={o.id} className="border-b border-border/60 last:border-0 hover:bg-surface-raised/50">
                    <td className="px-4 py-2 font-mono text-fg">{o.symbol}</td>
                    <td className="px-4 py-2 text-xs text-fg-muted">{exchangeById(o.buyExchangeId)?.name}</td>
                    <td className="px-4 py-2 text-xs text-fg-muted">{exchangeById(o.sellExchangeId)?.name}</td>
                    <td className="px-4 py-2 font-mono text-fg">{formatPct(o.spreadPct)}</td>
                    <td className={cn("px-4 py-2 font-mono", o.estNetPct >= 0 ? "text-positive" : "text-negative")}>
                      {formatPct(o.estNetPct, 3)}
                    </td>
                    <td className="px-4 py-2 text-xs text-fg-subtle">{formatRelativeTime(o.detectedAt)}</td>
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
    </div>
  );
}
