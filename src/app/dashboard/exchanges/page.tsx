"use client";

import { Plug, KeyRound } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ExchangeStatusBadge } from "@/components/dashboard/status-badge";
import { useExchanges } from "@/lib/hooks/use-demo-data";
import { Badge } from "@/components/ui/badge";

export default function ExchangesPage() {
  const { data, isLoading } = useExchanges();

  return (
    <div>
      <PageHeader
        title="Exchanges"
        description="Connected venues and API key posture. Demo keys are never real — withdrawal permission is always off."
        action={
          <Button size="sm" variant="secondary">
            <Plug className="h-3.5 w-3.5" /> Connect exchange
          </Button>
        }
      />

      {isLoading ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data?.map((ex) => (
            <Card key={ex.id} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-fg">{ex.name}</p>
                  <p className="text-xs text-fg-subtle">{ex.region}</p>
                </div>
                <Badge tone="neutral">{ex.kind}</Badge>
              </div>

              <div className="mt-3">
                <ExchangeStatusBadge status={ex.status} />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-fg-subtle">Latency</p>
                  <p className="font-mono text-fg">{ex.status === "disconnected" ? "—" : `${ex.latencyMs}ms`}</p>
                </div>
                <div>
                  <p className="text-fg-subtle">Taker fee</p>
                  <p className="font-mono text-fg">{(ex.takerFeeBps / 100).toFixed(2)}%</p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-1.5 rounded-md border border-border/60 bg-surface-raised px-2.5 py-1.5 text-xs text-fg-muted">
                <KeyRound className="h-3.5 w-3.5" />
                <span className="font-mono">••••••••{ex.id.slice(0, 3)}</span>
                <span className="ml-auto text-[10px] text-fg-subtle">read/trade only</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
