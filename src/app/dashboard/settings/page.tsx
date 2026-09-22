"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/auth-store";

const notificationChannels = [
  { id: "email", label: "Email alerts", description: "GO/NO-GO decisions and daily P/L summary." },
  { id: "telegram", label: "Telegram bot", description: "Real-time execution notifications." },
  { id: "discord", label: "Discord webhook", description: "Post executions to a team channel." },
];

export default function SettingsPage() {
  const { email } = useAuthStore();
  const [enabled, setEnabled] = useState<Record<string, boolean>>({ email: true, telegram: false, discord: false });
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  }

  return (
    <div>
      <PageHeader title="Settings" description="Account and notification preferences for this demo session." />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-fg-muted">Email</label>
              <input
                readOnly
                value={email ?? "demo@arbitragex.pro"}
                className="w-full cursor-not-allowed rounded-md border border-border bg-surface-raised px-3 py-2 text-sm text-fg-muted"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-fg-muted">Platform API key</label>
              <div className="flex items-center gap-2">
                <input
                  readOnly
                  value="axp_live_••••••••••••3f21"
                  className="w-full cursor-not-allowed rounded-md border border-border bg-surface-raised px-3 py-2 font-mono text-sm text-fg-muted"
                />
                <Button variant="secondary" size="sm">Rotate</Button>
              </div>
              <p className="mt-1 text-[11px] text-fg-subtle">Used to call the ArbitrageX Pro REST/WebSocket API, not any exchange.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notificationChannels.map((c) => (
              <label key={c.id} className="flex items-start justify-between gap-3 rounded-md border border-border/60 px-3 py-2.5">
                <div>
                  <p className="text-xs font-medium text-fg">{c.label}</p>
                  <p className="text-[11px] text-fg-subtle">{c.description}</p>
                </div>
                <input
                  type="checkbox"
                  checked={enabled[c.id]}
                  onChange={(e) => setEnabled((s) => ({ ...s, [c.id]: e.target.checked }))}
                  className="mt-0.5 accent-[#d6a94b]"
                />
              </label>
            ))}
            <div className="flex items-center gap-3 pt-1">
              <Button size="sm" onClick={handleSave}>Save preferences</Button>
              {saved && (
                <span className="flex items-center gap-1.5 text-xs text-positive">
                  <Check className="h-3.5 w-3.5" /> Saved to this session
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4 border-negative/30">
        <CardHeader>
          <CardTitle className="text-negative">Danger zone</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-fg">Disconnect all exchanges</p>
            <p className="text-[11px] text-fg-subtle">Revokes all API key references for this demo session.</p>
          </div>
          <Button variant="danger" size="sm">Disconnect all</Button>
        </CardContent>
      </Card>
    </div>
  );
}
