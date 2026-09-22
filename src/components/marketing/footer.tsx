import Link from "next/link";

export function MarketingFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-fg">ArbitrageX Pro</p>
            <p className="mt-1 max-w-md text-xs text-fg-muted">
              Portfolio / concept-stage project. All product data on this site is simulated for
              demonstration — see the Limitations section in the project documentation.
            </p>
          </div>
          <div className="flex gap-6 text-xs text-fg-muted">
            <Link href="/login" className="hover:text-fg">Sign in</Link>
            <Link href="/onboarding" className="hover:text-fg">Demo</Link>
          </div>
        </div>
        <p className="mt-8 text-[11px] text-fg-subtle">
          © {new Date().getFullYear()} ArbitrageX Pro. Concept demo — not a live trading service.
        </p>
      </div>
    </footer>
  );
}
