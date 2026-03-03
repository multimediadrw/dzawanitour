import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

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

// PUT - Update trip schedule
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    verifyToken(request);
    const body = await request.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const prismaAny = prisma as any;

    const { pricing, id: _id, createdAt: _c, updatedAt: _u, ...updateData } = body;

    const schedule = await prismaAny.tripSchedule.update({
      where: { id: params.id },
      data: updateData,
    });

    // Update pricing if provided
    if (pricing && Array.isArray(pricing)) {
      // Delete existing pricing
      await prismaAny.privateTripPricing.deleteMany({
        where: { packageId: params.id },
      });
      // Create new pricing
      for (const p of pricing) {
        await prismaAny.privateTripPricing.create({
          data: {
            packageId: params.id,
            pax: p.pax,
            price: p.price,
          },
        });
      }
    }

    return NextResponse.json(schedule);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ error: msg }, { status: msg === "Unauthorized" ? 401 : 500 });
  }
}

// DELETE - Delete trip schedule
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    verifyToken(request);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const prismaAny = prisma as any;

    // Delete pricing first
    await prismaAny.privateTripPricing.deleteMany({
      where: { packageId: params.id },
    });

    await prismaAny.tripSchedule.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ error: msg }, { status: msg === "Unauthorized" ? 401 : 500 });
  }
}
