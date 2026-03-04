import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

const JWT_SECRET = process.env.JWT_SECRET || "dzawani-secret-key-2024";

function verifyToken(request: NextRequest) {
  let token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) token = request.cookies.get("admin_token")?.value;
  if (!token) throw new Error("Unauthorized");
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    throw new Error("Invalid token");
  }
}

// GET - List all trip schedules
export async function GET(request: NextRequest) {
  try {
    verifyToken(request);
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const prismaAny = prisma as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: Record<string, any> = {};
    if (category) where.tripCategory = category;

    const schedules = await prismaAny.tripSchedule.findMany({
      where,
      orderBy: { createdAt: "asc" },
    });

    // Attach pricing for private trips
    const privateSchedules = schedules.filter((s: { tripCategory: string }) =>
      s.tripCategory?.startsWith("private_")
    );
    if (privateSchedules.length > 0) {
      const packageIds = privateSchedules.map((s: { id: string }) => s.id);
      const pricing = await prismaAny.privateTripPricing.findMany({
        where: { packageId: { in: packageIds } },
        orderBy: { pax: "asc" },
      });
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

    return NextResponse.json(schedules);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ error: msg }, { status: msg === "Unauthorized" ? 401 : 500 });
  }
}

// POST - Create new trip schedule
export async function POST(request: NextRequest) {
  try {
    verifyToken(request);
    const body = await request.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const prismaAny = prisma as any;

    const { pricing, ...scheduleData } = body;

    const schedule = await prismaAny.tripSchedule.create({
      data: {
        ...scheduleData,
        id: scheduleData.id || undefined,
      },
    });

    // If private trip, also create pricing
    if (pricing && Array.isArray(pricing)) {
      for (const p of pricing) {
        await prismaAny.privateTripPricing.create({
          data: {
            packageId: schedule.id,
            pax: p.pax,
            price: p.price,
          },
        });
      }
    }

    return NextResponse.json(schedule, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ error: msg }, { status: msg === "Unauthorized" ? 401 : 500 });
  }
}
