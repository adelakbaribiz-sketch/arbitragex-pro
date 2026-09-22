"use client";

import { useState } from "react";
import { Building2, Check, Upload } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Tenant } from "@/types";

const subTenants: Tenant[] = [
  { id: "t_01", name: "Northwind Capital", plan: "business", createdAt: "2026-04-12" },
  { id: "t_02", name: "Meridian Quant Desk", plan: "enterprise", createdAt: "2026-05-30" },
  { id: "t_03", name: "Solace Trading Co.", plan: "pro", createdAt: "2026-07-18" },
];

export default function WhiteLabelPage() {
  const [brandName, setBrandName] = useState("Northwind Arbitrage");
  const [domain, setDomain] = useState("trade.northwindcapital.com");
  const [accent, setAccent] = useState("#d6a94b");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  }

  return (
    <div>
      <PageHeader title="White-label & reseller" description="Branding for a reseller deployment, and the sub-tenants running under it." />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Branding</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="wl-brand-name" className="mb-1 block text-xs font-medium text-fg-muted">Brand name</label>
              <input
                id="wl-brand-name"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full rounded-md border border-border bg-surface-raised px-3 py-2 text-sm text-fg outline-none focus:border-accent/50"
              />
            </div>
            <div>
              <label htmlFor="wl-domain" className="mb-1 block text-xs font-medium text-fg-muted">Custom domain</label>
              <input
                id="wl-domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full rounded-md border border-border bg-surface-raised px-3 py-2 font-mono text-sm text-fg outline-none focus:border-accent/50"
              />
            </div>
            <div>
              <label htmlFor="wl-accent" className="mb-1 block text-xs font-medium text-fg-muted">Accent color</label>
              <div className="flex items-center gap-2">
                <input id="wl-accent" type="color" value={accent} onChange={(e) => setAccent(e.target.value)} className="h-9 w-9 rounded border border-border bg-transparent" />
                <span className="font-mono text-xs text-fg-muted">{accent}</span>
              </div>
            </div>
            <div>
              <p className="mb-1 text-xs font-medium text-fg-muted">Logo</p>
              <button className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-border py-6 text-xs text-fg-muted hover:border-border-strong">
                <Upload className="h-4 w-4" /> Upload logo (demo — not stored)
              </button>
            </div>
            <div className="flex items-center gap-3 border-t border-border pt-4">
              <Button size="sm" onClick={handleSave}>Save branding</Button>
              {saved && (
                <span className="flex items-center gap-1.5 text-xs text-positive">
                  <Check className="h-3.5 w-3.5" /> Saved to this session
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sub-tenants</CardTitle>
            <Badge tone="neutral">{subTenants.length} active</Badge>
          </CardHeader>
          <CardContent className="space-y-2">
            {subTenants.map((t) => (
              <div key={t.id} className="flex items-center justify-between rounded-md border border-border/60 px-3 py-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded bg-surface-raised">
                    <Building2 className="h-3.5 w-3.5 text-fg-subtle" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-fg">{t.name}</p>
                    <p className="text-[11px] text-fg-subtle">Since {t.createdAt}</p>
                  </div>
                </div>
                <Badge tone="accent" className="capitalize">{t.plan}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
