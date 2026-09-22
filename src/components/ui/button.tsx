import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  // Only the primary action gets weight/lift — it's the one thing per screen
  // meant to feel like the thing to press. Every other variant stays flat.
  primary:
    "bg-accent text-accent-foreground hover:brightness-110 border border-transparent shadow-[0_1px_2px_rgba(0,0,0,0.4),0_10px_20px_-12px_rgba(214,169,75,0.45)] hover:-translate-y-px active:translate-y-0 active:shadow-none",
  secondary: "bg-surface-raised text-fg border border-border hover:border-border-strong",
  ghost: "bg-transparent text-fg-muted hover:text-fg hover:bg-surface-raised border border-transparent",
  danger: "bg-transparent text-negative border border-negative/40 hover:bg-negative/10",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-9 px-4 text-sm",
  lg: "h-11 px-6 text-sm",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-[color,background-color,border-color,transform,box-shadow] duration-150 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
