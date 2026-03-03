import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const packageId = searchParams.get("packageId") || "";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const prismaAny = prisma as any;

    const where: Record<string, unknown> = {};
    if (packageId) where.packageId = packageId;

    const pricing = await prismaAny.privateTripPricing.findMany({
      where,
      orderBy: { pax: "asc" },
    });
    return NextResponse.json(pricing);
  } catch (error) {
    console.error("Error fetching private pricing:", error);
    return NextResponse.json({ error: "Failed to fetch private pricing" }, { status: 500 });
  }
}
