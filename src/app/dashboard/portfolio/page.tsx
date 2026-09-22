"use client";

import { Wallet } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { StatTile } from "@/components/ui/stat-tile";
import { usePortfolio } from "@/lib/hooks/use-demo-data";
import { exchangeById } from "@/lib/mock/exchanges";
import { formatUsd } from "@/lib/utils";
import { PnlChart } from "@/components/charts/pnl-chart";

export default function PortfolioPage() {
  const { data, isLoading } = usePortfolio();

  const totalUsd = data?.balances.reduce((sum, b) => sum + b.usdValue, 0) ?? 0;
  const first = data?.equityCurve[0]?.equityUsd ?? 0;
  const last = data?.equityCurve[data.equityCurve.length - 1]?.equityUsd ?? 0;
  const changePct = first ? ((last - first) / first) * 100 : 0;

  const balancesByExchange = data
    ? Object.entries(
        data.balances.reduce<Record<string, typeof data.balances>>((acc, b) => {
          (acc[b.exchangeId] ??= []).push(b);
          return acc;
        }, {}),
      )
    : [];

  return (
    <div>
      <PageHeader title="Portfolio" description="Aggregated balances and equity curve across connected venues." />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatTile label="Total equity" value={formatUsd(totalUsd, { maximumFractionDigits: 0 })} icon={Wallet} />
        <StatTile
          label="30-day change"
          value={`${changePct >= 0 ? "+" : ""}${changePct.toFixed(2)}%`}
          deltaTone={changePct >= 0 ? "positive" : "negative"}
        />
        <StatTile label="Venues with balance" value={String(balancesByExchange.length)} />
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Equity curve (30d, simulated)</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? <Skeleton className="h-64 w-full" /> : data ? <PnlChart data={data.equityCurve} /> : null}
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Balances by venue</CardTitle>
        </CardHeader>
        {isLoading ? (
          <CardContent className="space-y-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
          </CardContent>
        ) : balancesByExchange.length === 0 ? (
          <EmptyState icon={Wallet} title="No balances" description="Connect an exchange to see simulated balances here." />
        ) : (
          <div className="divide-y divide-border">
            {balancesByExchange.map(([exchangeId, balances]) => (
              <div key={exchangeId} className="px-4 py-3">
                <p className="text-xs font-semibold text-fg">{exchangeById(exchangeId)?.name}</p>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {balances.map((b) => (
                    <div key={b.asset} className="rounded-md border border-border/60 px-2.5 py-1.5">
                      <p className="font-mono text-xs text-fg-muted">{b.asset}</p>
                      <p className="font-mono text-sm text-fg">{b.amount.toFixed(b.asset === "USDT" ? 0 : 4)}</p>
                      <p className="font-mono text-[11px] text-fg-subtle">{formatUsd(b.usdValue, { maximumFractionDigits: 0 })}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
