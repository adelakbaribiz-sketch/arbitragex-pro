"use client";

import { useEffect, useRef } from "react";
import { AreaSeries, ColorType, createChart, type IChartApi } from "lightweight-charts";
import type { EquityPoint } from "@/types";

export function PnlChart({ data }: { data: EquityPoint[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#8b93a1",
        fontFamily: "var(--font-data)",
        fontSize: 11,
      },
      grid: {
        vertLines: { color: "#1c2026" },
        horzLines: { color: "#1c2026" },
      },
      rightPriceScale: { borderColor: "#262a31" },
      timeScale: { borderColor: "#262a31" },
      height: 260,
      autoSize: true,
    });
    chartRef.current = chart;

    const series = chart.addSeries(AreaSeries, {
      lineColor: "#d6a94b",
      topColor: "rgba(214, 169, 75, 0.28)",
      bottomColor: "rgba(214, 169, 75, 0.02)",
      lineWidth: 2,
      priceFormat: { type: "custom", formatter: (v: number) => `$${Math.round(v).toLocaleString()}` },
    });
    series.setData(data.map((p) => ({ time: p.time, value: p.equityUsd })));
    chart.timeScale().fitContent();

    const resizeObserver = new ResizeObserver(() => chart.applyOptions({}));
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, [data]);

  return <div ref={containerRef} className="w-full" />;
}
