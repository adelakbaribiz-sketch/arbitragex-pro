import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-4 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface">
        <Compass className="h-5 w-5 text-fg-subtle" />
      </div>
      <div>
        <h1 className="text-lg font-semibold text-fg">Page not found</h1>
        <p className="mt-1 text-sm text-fg-muted">The page you&rsquo;re looking for doesn&rsquo;t exist in this demo.</p>
      </div>
      <Link href="/">
        <Button variant="secondary" size="sm">Back to overview</Button>
      </Link>
    </div>
  );
}
