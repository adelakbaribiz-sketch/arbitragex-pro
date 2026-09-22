import {
  LayoutDashboard,
  Zap,
  ListChecks,
  Wallet,
  ShieldCheck,
  Plug,
  SlidersHorizontal,
  CreditCard,
  Palette,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/opportunities", label: "Opportunities", icon: Zap },
  { href: "/dashboard/executions", label: "Execution Log", icon: ListChecks },
  { href: "/dashboard/portfolio", label: "Portfolio", icon: Wallet },
  { href: "/dashboard/ai-audit", label: "AI Audit", icon: ShieldCheck },
  { href: "/dashboard/exchanges", label: "Exchanges", icon: Plug },
  { href: "/dashboard/strategy", label: "Strategy", icon: SlidersHorizontal },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "/dashboard/white-label", label: "White-Label", icon: Palette },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];
