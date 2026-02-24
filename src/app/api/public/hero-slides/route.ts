import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const slides = await prisma.heroSlide.findMany({
      where: { status: "active" },
      orderBy: { order: "asc" },
    });
    return NextResponse.json(slides);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch hero slides" }, { status: 500 });
  }
}