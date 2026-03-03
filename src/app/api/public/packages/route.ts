import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "";
    const category = searchParams.get("category") || "";
    const featured = searchParams.get("featured") || "";

    const where: Record<string, unknown> = { status: "active" };
    if (type) where.type = type;
    if (category) where.category = category;
    if (featured === "true") where.featured = true;

    const packages = await prisma.tourPackage.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(packages);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 });
  }
}
