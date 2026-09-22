import { FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";

// Rendered anywhere the app shows generated numbers, so nobody mistakes the
// demo for a live trading account. See docs/DEMO.md and docs/LIMITATIONS.md.
export function DemoBadge({ className, label = "Simulated data" }: { className?: string; label?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded border border-accent/30 bg-accent/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-accent",
        className,
      )}
    >
      <FlaskConical className="h-3 w-3" />
      {label}
    </span>
  );
}
