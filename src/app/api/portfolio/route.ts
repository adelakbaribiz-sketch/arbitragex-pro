import { NextResponse } from "next/server";
import { getDemoDataset } from "@/lib/mock/dataset";

export async function GET() {
  const { balances, equityCurve } = getDemoDataset();
  return NextResponse.json({ data: { balances, equityCurve }, meta: { source: "simulated" } });
}
