import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const prismaAny = prisma as any;

    // Build where clause using tripCategory field
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: Record<string, any> = {};
    if (category) {
      where.tripCategory = category;
    }

    const schedules = await prismaAny.tripSchedule.findMany({
      where,
      orderBy: { createdAt: "asc" },
    });

    // For private trips, also fetch pricing
    if (category.startsWith("private_") || !category) {
      const privateSchedules = schedules.filter((s: { tripCategory: string }) =>
        s.tripCategory?.startsWith("private_")
      );
      if (privateSchedules.length > 0) {
        const packageIds = privateSchedules.map((s: { id: string }) => s.id);
        const pricing = await prismaAny.privateTripPricing.findMany({
          where: { packageId: { in: packageIds } },
          orderBy: { pax: "asc" },
        });
        // Attach pricing to each schedule
        const pricingByPackage: Record<string, { pax: number; price: number }[]> = {};
        for (const p of pricing) {
          if (!pricingByPackage[p.packageId]) pricingByPackage[p.packageId] = [];
          pricingByPackage[p.packageId].push({ pax: p.pax, price: p.price });
        }
        return NextResponse.json(
          schedules.map((s: { id: string; tripCategory: string }) => ({
            ...s,
            pricing: pricingByPackage[s.id] || [],
          }))
        );
      }
    }

    return NextResponse.json(schedules);
  } catch (error) {
    console.error("Error fetching trip schedules:", error);
    return NextResponse.json({ error: "Failed to fetch trip schedules" }, { status: 500 });
  }
}
