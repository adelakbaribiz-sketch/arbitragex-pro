"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/auth-store";
import { DEMO_CREDENTIALS } from "@/lib/constants";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState(DEMO_CREDENTIALS.email);
  const [password, setPassword] = useState(DEMO_CREDENTIALS.password);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);
      if (result.ok) router.push("/dashboard");
      else setError(result.error ?? "Login failed");
    }, 350);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-accent text-accent-foreground">
            <TrendingUp className="h-4.5 w-4.5" />
          </div>
          <span className="text-base font-semibold tracking-tight">ArbitrageX Pro</span>
        </Link>

        <div className="rounded-lg border border-border bg-surface p-6">
          <h1 className="text-lg font-semibold text-fg">Sign in to the demo</h1>
          <p className="mt-1 text-sm text-fg-muted">
            This is a mock login for the portfolio demo — no real account is created or verified.
          </p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-fg-muted">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-full rounded-md border border-border bg-surface-raised px-3 py-2 text-sm text-fg outline-none focus:border-accent/50"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-fg-muted">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full rounded-md border border-border bg-surface-raised px-3 py-2 text-sm text-fg outline-none focus:border-accent/50"
              />
            </div>

            {error ? <p className="text-xs text-negative">{error}</p> : null}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </form>

          <div className="mt-4 rounded-md border border-border bg-surface-raised p-3 text-xs text-fg-muted">
            Demo credentials are pre-filled. Password: <code className="text-fg">{DEMO_CREDENTIALS.password}</code>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-fg-subtle">
          <Link href="/" className="hover:text-fg-muted">
            ← Back to overview
          </Link>
        </p>
      </div>
    </div>
  );
}
