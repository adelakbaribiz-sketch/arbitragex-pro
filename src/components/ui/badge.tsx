import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type Tone = "neutral" | "positive" | "negative" | "warning" | "info" | "accent";

const toneClasses: Record<Tone, string> = {
  neutral: "bg-surface-raised text-fg-muted border-border",
  positive: "bg-positive/10 text-positive border-positive/30",
  negative: "bg-negative/10 text-negative border-negative/30",
  warning: "bg-accent/10 text-accent border-accent/30",
  info: "bg-info/10 text-info border-info/30",
  accent: "bg-accent text-accent-foreground border-transparent",
};

export function Badge({
  className,
  tone = "neutral",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[11px] font-medium uppercase tracking-wide",
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}
