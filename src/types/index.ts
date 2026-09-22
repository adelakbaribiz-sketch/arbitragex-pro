// Domain types for the ArbitrageX Pro demo. These mirror the data model
// described in docs/DATA_MODEL.md. In production these would be generated
// from the backend's OpenAPI/Prisma schema instead of hand-written.

export type ExchangeKind = "CEX" | "DEX";

export type ExchangeStatus = "connected" | "degraded" | "disconnected";

export interface Exchange {
  id: string;
  name: string;
  kind: ExchangeKind;
  status: ExchangeStatus;
  latencyMs: number;
  makerFeeBps: number;
  takerFeeBps: number;
  withdrawalEnabled: boolean;
  region: string;
}

export type OpportunityStatus = "detected" | "audited" | "executing" | "closed" | "rejected";

export interface Opportunity {
  id: string;
  symbol: string;
  buyExchangeId: string;
  sellExchangeId: string;
  buyPrice: number;
  sellPrice: number;
  spreadPct: number;
  estNetPct: number;
  detectedAt: string; // ISO timestamp
  status: OpportunityStatus;
  latencyBudgetMs: number;
}

export type AuditVerdict = "GO" | "NO_GO";

export interface AuditDecision {
  id: string;
  opportunityId: string;
  verdict: AuditVerdict;
  netProfitPct: number;
  confidence: number; // 0-1
  reasons: string[];
  evaluatedAt: string;
  factors: {
    feesPct: number;
    slippagePct: number;
    withdrawalRisk: "low" | "medium" | "high";
    latencyDecayPct: number;
    exchangeHealth: "healthy" | "watch" | "unhealthy";
  };
}

export type ExecutionStatus = "filled" | "partial" | "failed" | "rolled_back";

export interface Execution {
  id: string;
  opportunityId: string;
  symbol: string;
  buyExchangeId: string;
  sellExchangeId: string;
  sizeUsd: number;
  realizedPnlUsd: number;
  realizedPnlPct: number;
  status: ExecutionStatus;
  executedAt: string;
  durationMs: number;
}

export interface PortfolioBalance {
  exchangeId: string;
  asset: string;
  amount: number;
  usdValue: number;
}

export interface EquityPoint {
  time: string; // ISO date
  equityUsd: number;
}

export type PlanId = "free" | "pro" | "business" | "enterprise";

export interface Plan {
  id: PlanId;
  name: string;
  priceUsd: number;
  billingPeriod: "month" | "custom";
  features: string[];
  highlighted?: boolean;
}

export interface SystemHealthMetric {
  label: string;
  value: string;
  status: "ok" | "warning" | "critical";
  detail: string;
}

export interface Tenant {
  id: string;
  name: string;
  plan: PlanId;
  createdAt: string;
}
