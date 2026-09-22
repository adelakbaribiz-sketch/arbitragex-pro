import { DemoBadge } from "@/components/ui/demo-badge";

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-fg">{title}</h2>
          <DemoBadge />
        </div>
        <p className="mt-0.5 text-sm text-fg-muted">{description}</p>
      </div>
      {action}
    </div>
  );
}
