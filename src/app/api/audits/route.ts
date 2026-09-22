import { NextResponse } from "next/server";
import { getDemoDataset } from "@/lib/mock/dataset";

export async function GET() {
  const { audits, opportunities } = getDemoDataset();
  const enriched = audits.map((audit) => ({
    ...audit,
    opportunity: opportunities.find((o) => o.id === audit.opportunityId) ?? null,
  }));
  return NextResponse.json({ data: enriched, meta: { source: "simulated" } });
}
