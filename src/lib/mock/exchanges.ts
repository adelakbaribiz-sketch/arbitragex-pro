import type { Exchange } from "@/types";

// DEMO DATA — a representative subset of the 100+ CEX / 25+ DEX the target
// architecture connects to (see docs/DATA_MODEL.md). Static because exchange
// metadata (fees, regions) changes rarely; opportunities/executions below are
// what get generated dynamically.
export const exchanges: Exchange[] = [
  { id: "binance", name: "Binance", kind: "CEX", status: "connected", latencyMs: 42, makerFeeBps: 10, takerFeeBps: 10, withdrawalEnabled: false, region: "Global" },
  { id: "coinbase", name: "Coinbase Advanced", kind: "CEX", status: "connected", latencyMs: 68, makerFeeBps: 40, takerFeeBps: 60, withdrawalEnabled: false, region: "US" },
  { id: "okx", name: "OKX", kind: "CEX", status: "connected", latencyMs: 51, makerFeeBps: 8, takerFeeBps: 10, withdrawalEnabled: false, region: "Global" },
  { id: "kraken", name: "Kraken", kind: "CEX", status: "degraded", latencyMs: 145, makerFeeBps: 16, takerFeeBps: 26, withdrawalEnabled: false, region: "US/EU" },
  { id: "kucoin", name: "KuCoin", kind: "CEX", status: "connected", latencyMs: 59, makerFeeBps: 10, takerFeeBps: 10, withdrawalEnabled: false, region: "Global" },
  { id: "bybit", name: "Bybit", kind: "CEX", status: "connected", latencyMs: 47, makerFeeBps: 10, takerFeeBps: 10, withdrawalEnabled: false, region: "Global" },
  { id: "gate", name: "Gate.io", kind: "CEX", status: "disconnected", latencyMs: 0, makerFeeBps: 20, takerFeeBps: 20, withdrawalEnabled: false, region: "Global" },
  { id: "uniswap", name: "Uniswap v3", kind: "DEX", status: "connected", latencyMs: 210, makerFeeBps: 5, takerFeeBps: 30, withdrawalEnabled: true, region: "Ethereum" },
  { id: "pancakeswap", name: "PancakeSwap v3", kind: "DEX", status: "connected", latencyMs: 180, makerFeeBps: 5, takerFeeBps: 25, withdrawalEnabled: true, region: "BNB Chain" },
  { id: "curve", name: "Curve Finance", kind: "DEX", status: "connected", latencyMs: 195, makerFeeBps: 4, takerFeeBps: 4, withdrawalEnabled: true, region: "Ethereum" },
];

export const symbols = ["BTC/USDT", "ETH/USDT", "SOL/USDT", "BNB/USDT", "XRP/USDT", "ARB/USDT", "OP/USDT"] as const;

export const exchangeById = (id: string) => exchanges.find((e) => e.id === id);
