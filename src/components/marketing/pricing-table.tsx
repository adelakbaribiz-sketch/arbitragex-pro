import { Check } from "lucide-react";
import { plans } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function PricingTable({ compact = false }: { compact?: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={cn(
            "flex flex-col rounded-lg border p-5",
            plan.highlighted ? "border-accent/50 bg-accent/5" : "border-border bg-surface",
          )}
        >
          <p className="text-sm font-semibold text-fg">{plan.name}</p>
          <p className="mt-2 font-mono text-2xl font-semibold text-fg">
            {plan.priceUsd === 0 ? "Free" : `$${plan.priceUsd}`}
            {plan.billingPeriod === "month" && plan.priceUsd > 0 ? (
              <span className="text-sm font-normal text-fg-muted">/mo</span>
            ) : null}
            {plan.billingPeriod === "custom" ? <span className="text-sm font-normal text-fg-muted"> custom</span> : null}
          </p>
          <ul className="mt-4 flex-1 space-y-2">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs text-fg-muted">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-positive" />
                {f}
              </li>
            ))}
          </ul>
          {!compact && (
            <Button variant={plan.highlighted ? "primary" : "secondary"} size="sm" className="mt-5 w-full">
              {plan.id === "enterprise" ? "Contact sales" : "Start demo"}
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
