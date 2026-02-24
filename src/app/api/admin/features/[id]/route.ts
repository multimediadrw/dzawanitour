import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token || !verifyToken(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const feature = await prisma.feature.findUnique({ where: { id: params.id } });
    if (!feature) return NextResponse.json({ error: "Feature not found" }, { status: 404 });
    return NextResponse.json(feature);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch feature" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token || !verifyToken(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await request.json();
    const feature = await prisma.feature.update({
      where: { id: params.id },
      data: {
        title: body.title,
        titleEn: body.titleEn,
        description: body.description,
        descriptionEn: body.descriptionEn,
        icon: body.icon,
        order: body.order,
      },
    });
    return NextResponse.json(feature);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update feature" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token || !verifyToken(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    await prisma.feature.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Feature deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete feature" }, { status: 500 });
  }
}
