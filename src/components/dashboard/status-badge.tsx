import { Badge } from "@/components/ui/badge";
import type { AuditVerdict, ExchangeStatus, ExecutionStatus, OpportunityStatus } from "@/types";

export function ExchangeStatusBadge({ status }: { status: ExchangeStatus }) {
  const map = {
    connected: { tone: "positive" as const, label: "Connected" },
    degraded: { tone: "warning" as const, label: "Degraded" },
    disconnected: { tone: "negative" as const, label: "Disconnected" },
  };
  const { tone, label } = map[status];
  return <Badge tone={tone}>{label}</Badge>;
}

export function OpportunityStatusBadge({ status }: { status: OpportunityStatus }) {
  const map = {
    detected: { tone: "info" as const, label: "Detected" },
    audited: { tone: "warning" as const, label: "Audited" },
    executing: { tone: "info" as const, label: "Executing" },
    closed: { tone: "positive" as const, label: "Closed" },
    rejected: { tone: "negative" as const, label: "Rejected" },
  };
  const { tone, label } = map[status];
  return <Badge tone={tone}>{label}</Badge>;
}

export function ExecutionStatusBadge({ status }: { status: ExecutionStatus }) {
  const map = {
    filled: { tone: "positive" as const, label: "Filled" },
    partial: { tone: "warning" as const, label: "Partial" },
    failed: { tone: "negative" as const, label: "Failed" },
    rolled_back: { tone: "neutral" as const, label: "Rolled back" },
  };
  const { tone, label } = map[status];
  return <Badge tone={tone}>{label}</Badge>;
}

export function AuditVerdictBadge({ verdict }: { verdict: AuditVerdict }) {
  return <Badge tone={verdict === "GO" ? "positive" : "negative"}>{verdict.replace("_", "-")}</Badge>;
}
