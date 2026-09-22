import { NextResponse } from "next/server";
import { getDemoDataset } from "@/lib/mock/dataset";

export async function GET() {
  const { executions } = getDemoDataset();
  return NextResponse.json({ data: executions, meta: { source: "simulated" } });
}
