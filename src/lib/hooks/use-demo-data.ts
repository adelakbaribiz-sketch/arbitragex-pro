"use client";

import { useQuery } from "@tanstack/react-query";
import type { AuditDecision, Exchange, Execution, Opportunity, PortfolioBalance, EquityPoint, SystemHealthMetric } from "@/types";

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request to ${url} failed with ${res.status}`);
  const body = await res.json();
  return body.data as T;
}

export function useOpportunities() {
  return useQuery({ queryKey: ["opportunities"], queryFn: () => fetchJson<Opportunity[]>("/api/opportunities") });
}

export function useAudits() {
  return useQuery({
    queryKey: ["audits"],
    queryFn: () => fetchJson<(AuditDecision & { opportunity: Opportunity | null })[]>("/api/audits"),
  });
}

export function useExecutions() {
  return useQuery({ queryKey: ["executions"], queryFn: () => fetchJson<Execution[]>("/api/executions") });
}

export function useExchanges() {
  return useQuery({ queryKey: ["exchanges"], queryFn: () => fetchJson<Exchange[]>("/api/exchanges") });
}

export function usePortfolio() {
  return useQuery({
    queryKey: ["portfolio"],
    queryFn: () => fetchJson<{ balances: PortfolioBalance[]; equityCurve: EquityPoint[] }>("/api/portfolio"),
  });
}

export function useSystemHealth() {
  return useQuery({ queryKey: ["system-health"], queryFn: () => fetchJson<SystemHealthMetric[]>("/api/system-health") });
}
