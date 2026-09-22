"use client";

import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MarketingNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-accent text-accent-foreground">
            <TrendingUp className="h-4.5 w-4.5" />
          </div>
          <span className="text-base font-semibold tracking-tight">ArbitrageX Pro</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-fg-muted md:flex">
          <a href="#platform" className="hover:text-fg">Platform</a>
          <a href="#how-it-works" className="hover:text-fg">How it works</a>
          <a href="#pricing" className="hover:text-fg">Pricing</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link href="/onboarding">
            <Button size="sm">Launch demo</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
