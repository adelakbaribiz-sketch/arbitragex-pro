import { NextResponse } from "next/server";
import { getDemoDataset } from "@/lib/mock/dataset";

export async function GET() {
  const { opportunities } = getDemoDataset();
  return NextResponse.json({ data: opportunities, meta: { source: "simulated" } });
}
