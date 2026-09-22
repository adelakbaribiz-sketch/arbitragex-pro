import { NextResponse } from "next/server";
import { getDemoDataset } from "@/lib/mock/dataset";

export async function GET() {
  const { systemHealth } = getDemoDataset();
  return NextResponse.json({ data: systemHealth, meta: { source: "simulated" } });
}
