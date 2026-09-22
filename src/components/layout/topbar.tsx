"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Menu, X, LogOut, ChevronDown } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth-store";
import { navItems } from "./nav-items";
import { cn } from "@/lib/utils";

export function Topbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { email, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const currentLabel = navItems.find((n) => n.href === pathname)?.label ?? "Overview";

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-bg/95 px-4 backdrop-blur">
      <div className="flex items-center gap-3">
        <button
          className="rounded-md p-1.5 text-fg-muted hover:bg-surface-raised md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <h1 className="text-sm font-semibold text-fg">{currentLabel}</h1>
      </div>

      <div className="flex items-center gap-2">
        <button className="relative rounded-md p-2 text-fg-muted hover:bg-surface-raised" aria-label="Notifications">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
        </button>
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-md border border-border bg-surface px-2 py-1.5 text-xs text-fg-muted hover:border-border-strong"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 font-mono text-[11px] text-accent">
              {email?.[0]?.toUpperCase() ?? "D"}
            </span>
            <span className="hidden sm:inline">{email ?? "demo@arbitragex.pro"}</span>
            <ChevronDown className="h-3 w-3" />
          </button>
          {userMenuOpen ? (
            <div className="absolute right-0 top-10 w-48 rounded-md border border-border bg-surface-raised py-1 shadow-lg">
              <button
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-fg-muted hover:bg-surface hover:text-fg"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign out
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {mobileOpen ? (
        <div className="absolute left-0 top-14 z-30 w-full border-b border-border bg-surface p-2 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm",
                pathname === item.href ? "bg-accent/10 text-accent" : "text-fg-muted hover:bg-surface-raised",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  );
}
