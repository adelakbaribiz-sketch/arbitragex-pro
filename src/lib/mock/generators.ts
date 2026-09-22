import { mulberry32, seededBetween, seededPick } from "./rng";
import { exchanges, exchangeById, symbols } from "./exchanges";
import type {
  Opportunity,
  AuditDecision,
  Execution,
  EquityPoint,
  PortfolioBalance,
  SystemHealthMetric,
} from "@/types";

// ---------------------------------------------------------------------------
// This module SIMULATES the platform's core arbitrage math (see
// docs/ARCHITECTURE.md and the "Entry" formula in the dossier:
//   spread_pct = ((ask_A - bid_B) / bid_B) * 100
// so the numbers on screen are internally consistent (fees are actually
// subtracted, GO/NO-GO actually follows the stated profit threshold) rather
// than hand-picked. It is still synthetic data, not live market data — every
// consumer of this module must render a "Demo data" / "Simulated" label.
// ---------------------------------------------------------------------------

const NET_PROFIT_GO_THRESHOLD_PCT = 0.06;

function computeAudit(opp: Opportunity, rng: () => number): AuditDecision {
  const buyEx = exchangeById(opp.buyExchangeId)!;
  const sellEx = exchangeById(opp.sellExchangeId)!;
  const feesPct = (buyEx.takerFeeBps + sellEx.takerFeeBps) / 100;
  const slippagePct = seededBetween(rng, 0.01, 0.08);
  const latencyDecayPct = (buyEx.latencyMs + sellEx.latencyMs) / 100000;
  const netProfitPct = opp.spreadPct - feesPct - slippagePct - latencyDecayPct;

  const exchangeHealth =
    buyEx.status === "connected" && sellEx.status === "connected"
      ? "healthy"
      : buyEx.status === "disconnected" || sellEx.status === "disconnected"
        ? "unhealthy"
        : "watch";

  const withdrawalRisk = buyEx.withdrawalEnabled || sellEx.withdrawalEnabled ? "medium" : "low";

  const verdict =
    netProfitPct >= NET_PROFIT_GO_THRESHOLD_PCT && exchangeHealth !== "unhealthy" ? "GO" : "NO_GO";

  const reasons: string[] = [];
  if (netProfitPct < NET_PROFIT_GO_THRESHOLD_PCT) {
    reasons.push(`Net profit ${netProfitPct.toFixed(3)}% is below the ${NET_PROFIT_GO_THRESHOLD_PCT}% floor after fees, slippage, and latency decay.`);
  } else {
    reasons.push(`Net profit ${netProfitPct.toFixed(3)}% clears the ${NET_PROFIT_GO_THRESHOLD_PCT}% floor after fees, slippage, and latency decay.`);
  }
  if (exchangeHealth !== "healthy") {
    reasons.push(`${buyEx.name} / ${sellEx.name} health flagged as ${exchangeHealth}.`);
  }
  if (withdrawalRisk !== "low") {
    reasons.push("One leg requires on-chain settlement, adding withdrawal risk.");
  }

  return {
    id: `aud_${opp.id}`,
    opportunityId: opp.id,
    verdict,
    netProfitPct,
    confidence: verdict === "GO" ? seededBetween(rng, 0.82, 0.98) : seededBetween(rng, 0.4, 0.75),
    reasons,
    evaluatedAt: opp.detectedAt,
    factors: {
      feesPct,
      slippagePct,
      withdrawalRisk,
      latencyDecayPct,
      exchangeHealth,
    },
  };
}

export interface DemoDataset {
  opportunities: Opportunity[];
  audits: AuditDecision[];
  executions: Execution[];
  equityCurve: EquityPoint[];
  balances: PortfolioBalance[];
  systemHealth: SystemHealthMetric[];
}

export function generateDemoDataset(seed = 20260101): DemoDataset {
  const rng = mulberry32(seed);
  const now = Date.now();

  const opportunities: Opportunity[] = Array.from({ length: 42 }).map((_, i) => {
    const symbol = seededPick(rng, symbols);
    const [buyEx, sellEx] = pickTwoExchanges(rng);
    const buyPrice = basePrice(symbol) * seededBetween(rng, 0.997, 1.0);
    // Right-skewed so most spreads cluster low (realistic) with a tail of
    // wider, more clearly profitable ones — rng() ** 1.6 biases toward 0.
    const spreadPct = 0.08 + (1 - Math.pow(rng(), 1.6)) * 0.62;
    const sellPrice = buyPrice * (1 + spreadPct / 100);
    const detectedAt = new Date(now - i * seededBetween(rng, 30_000, 240_000)).toISOString();

    const opp: Opportunity = {
      id: `opp_${i.toString().padStart(3, "0")}`,
      symbol,
      buyExchangeId: buyEx.id,
      sellExchangeId: sellEx.id,
      buyPrice,
      sellPrice,
      spreadPct,
      estNetPct: 0,
      detectedAt,
      status: "detected",
      latencyBudgetMs: Math.round(seededBetween(rng, 180, 900)),
    };
    return opp;
  });

  const audits = opportunities.map((opp) => computeAudit(opp, rng));
  audits.forEach((audit, i) => {
    opportunities[i].estNetPct = audit.netProfitPct;
    // Most GO verdicts proceed straight to execution; a handful stay queued
    // ("audited") to show the pipeline mid-flight rather than fully drained.
    opportunities[i].status = audit.verdict === "GO" ? (rng() > 0.15 ? "closed" : "audited") : "rejected";
  });

  const executions: Execution[] = audits
    .map((audit, i) => ({ audit, opp: opportunities[i] }))
    .filter(({ opp }) => opp.status === "closed")
    .map(({ audit, opp }, i) => {
      const sizeUsd = seededBetween(rng, 2000, 45000);
      const slip = seededBetween(rng, -0.02, 0.01);
      const realizedPnlPct = audit.netProfitPct + slip;
      const status: Execution["status"] =
        realizedPnlPct < 0 && rng() > 0.7 ? "rolled_back" : rng() > 0.96 ? "partial" : "filled";
      return {
        id: `exe_${i.toString().padStart(3, "0")}`,
        opportunityId: opp.id,
        symbol: opp.symbol,
        buyExchangeId: opp.buyExchangeId,
        sellExchangeId: opp.sellExchangeId,
        sizeUsd,
        realizedPnlUsd: status === "rolled_back" ? 0 : (sizeUsd * realizedPnlPct) / 100,
        realizedPnlPct: status === "rolled_back" ? 0 : realizedPnlPct,
        status,
        executedAt: opp.detectedAt,
        durationMs: Math.round(seededBetween(rng, 120, opp.latencyBudgetMs)),
      };
    });

  const equityCurve = buildEquityCurve(rng, executions);
  const balances = buildBalances(rng);
  const systemHealth = buildSystemHealth(rng);

  return { opportunities, audits, executions, equityCurve, balances, systemHealth };
}

function pickTwoExchanges(rng: () => number) {
  const a = seededPick(rng, exchanges);
  let b = seededPick(rng, exchanges);
  let guard = 0;
  while (b.id === a.id && guard++ < 10) b = seededPick(rng, exchanges);
  return [a, b] as const;
}

function basePrice(symbol: string) {
  const prices: Record<string, number> = {
    "BTC/USDT": 64200,
    "ETH/USDT": 3180,
    "SOL/USDT": 142,
    "BNB/USDT": 578,
    "XRP/USDT": 0.62,
    "ARB/USDT": 0.94,
    "OP/USDT": 1.68,
  };
  return prices[symbol] ?? 100;
}

function buildEquityCurve(rng: () => number, executions: Execution[]): EquityPoint[] {
  const startEquity = 100_000;
  const days = 30;
  const pnlByDay = new Array(days).fill(0);
  executions.forEach((e) => {
    const dayIdx = Math.min(days - 1, Math.floor((Date.now() - new Date(e.executedAt).getTime()) / 86_400_000));
    pnlByDay[days - 1 - dayIdx] += e.realizedPnlUsd;
  });

  let equity = startEquity;
  const points: EquityPoint[] = [];
  for (let d = 0; d < days; d++) {
    const drift = seededBetween(rng, -80, 220);
    equity += pnlByDay[d] * 0.4 + drift;
    const time = new Date(Date.now() - (days - d) * 86_400_000).toISOString().slice(0, 10);
    points.push({ time, equityUsd: Math.round(equity) });
  }
  return points;
}

function buildBalances(rng: () => number): PortfolioBalance[] {
  const assets: { asset: string; price: number }[] = [
    { asset: "USDT", price: 1 },
    { asset: "BTC", price: 64200 },
    { asset: "ETH", price: 3180 },
    { asset: "SOL", price: 142 },
  ];
  return exchanges
    .filter((e) => e.status !== "disconnected")
    .flatMap((ex) =>
      assets
        .filter(() => rng() > 0.3)
        .map((a) => {
          const amount = a.asset === "USDT" ? seededBetween(rng, 2000, 40000) : seededBetween(rng, 0.05, 4);
          return {
            exchangeId: ex.id,
            asset: a.asset,
            amount,
            usdValue: amount * a.price,
          };
        }),
    );
}

function buildSystemHealth(rng: () => number): SystemHealthMetric[] {
  return [
    { label: "Market Ingestor", value: `${Math.round(seededBetween(rng, 4, 9))}ms p50`, status: "ok", detail: "WebSocket ticks normalized across 10 connected venues." },
    { label: "Spread Detector", value: `${Math.round(seededBetween(rng, 40, 90))}ms p50`, status: "ok", detail: "Incremental materialized view lag." },
    { label: "AI Auditor", value: `${Math.round(seededBetween(rng, 60, 140))}ms p50`, status: "ok", detail: "Monitor → Auditor → Executor flow latency." },
    { label: "Execution Orchestrator", value: `${Math.round(seededBetween(rng, 90, 200))}ms p50`, status: rng() > 0.8 ? "warning" : "ok", detail: "Order placement round-trip, entry + exit legs." },
    { label: "Kraken Connector", value: "Degraded", status: "warning", detail: "Elevated REST latency, WS reconnect in progress." },
    { label: "Gate.io Connector", value: "Disconnected", status: "critical", detail: "Auth token expired — reconnect required." },
  ];
}
