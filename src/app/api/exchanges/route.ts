import { NextResponse } from "next/server";
import { exchanges } from "@/lib/mock/exchanges";

export async function GET() {
  return NextResponse.json({ data: exchanges, meta: { source: "simulated" } });
}
