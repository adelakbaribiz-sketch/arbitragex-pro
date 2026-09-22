"use client";

import { Download } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PricingTable } from "@/components/marketing/pricing-table";
import { plans } from "@/lib/constants";
import { formatUsd } from "@/lib/utils";

const invoices = [
  { id: "INV-2026-0842", date: "2026-08-01", amount: 49, status: "Paid", method: "Visa •••• 4242" },
  { id: "INV-2026-0731", date: "2026-07-01", amount: 49, status: "Paid", method: "Visa •••• 4242" },
  { id: "INV-2026-0619", date: "2026-06-01", amount: 49, status: "Paid", method: "USDT (TRC-20)" },
];

export default function BillingPage() {
  const currentPlan = plans.find((p) => p.id === "pro")!;

  return (
    <div>
      <PageHeader title="Billing" description="Illustrative plan and invoice history — no live payment processor is connected." />

      <Card>
        <CardHeader>
          <CardTitle>Current plan</CardTitle>
          <Badge tone="accent">{currentPlan.name}</Badge>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-mono text-2xl text-fg">{formatUsd(currentPlan.priceUsd)}<span className="text-sm text-fg-muted">/mo</span></p>
            <p className="mt-1 text-xs text-fg-muted">Next renewal on 2026-10-01 (simulated)</p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-4">
        <h3 className="mb-3 text-sm font-semibold text-fg">Change plan</h3>
        <PricingTable />
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Invoice history</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-fg-subtle">
                <th className="px-4 py-2 font-medium">Invoice</th>
                <th className="px-4 py-2 font-medium">Date</th>
                <th className="px-4 py-2 font-medium">Amount</th>
                <th className="px-4 py-2 font-medium">Method</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 font-medium" />
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-2 font-mono text-fg">{inv.id}</td>
                  <td className="px-4 py-2 text-xs text-fg-muted">{inv.date}</td>
                  <td className="px-4 py-2 font-mono text-fg">{formatUsd(inv.amount)}</td>
                  <td className="px-4 py-2 text-xs text-fg-muted">{inv.method}</td>
                  <td className="px-4 py-2">
                    <Badge tone="positive">{inv.status}</Badge>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <button className="inline-flex items-center gap-1 text-xs text-fg-muted hover:text-accent">
                      <Download className="h-3.5 w-3.5" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
