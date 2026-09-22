import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function StatTile({
  label,
  value,
  delta,
  deltaTone = "neutral",
  icon: Icon,
  className,
}: {
  label: string;
  value: string;
  delta?: string;
  deltaTone?: "positive" | "negative" | "neutral";
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <div className={cn("rounded-lg border border-border bg-surface p-4", className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-fg-muted">{label}</span>
        {Icon ? <Icon className="h-4 w-4 text-fg-subtle" /> : null}
      </div>
      <div className="mt-2 font-mono text-2xl font-semibold text-fg tabular-nums">{value}</div>
      {delta ? (
        <div
          className={cn(
            "mt-1 font-mono text-xs tabular-nums",
            deltaTone === "positive" && "text-positive",
            deltaTone === "negative" && "text-negative",
            deltaTone === "neutral" && "text-fg-muted",
          )}
        >
          {delta}
        </div>
      ) : null}
    </div>
  );
}
