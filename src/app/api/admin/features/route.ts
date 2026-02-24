import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token || !verifyToken(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const features = await prisma.feature.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(features);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch features" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token || !verifyToken(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await request.json();
    const feature = await prisma.feature.create({
      data: {
        title: body.title,
        titleEn: body.titleEn || "",
        description: body.description,
        descriptionEn: body.descriptionEn || "",
        icon: body.icon || "star",
        order: body.order || 0,
      },
    });
    return NextResponse.json(feature, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create feature" }, { status: 500 });
  }
}
