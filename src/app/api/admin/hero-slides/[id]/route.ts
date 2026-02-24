import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token || !verifyToken(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const slide = await prisma.heroSlide.findUnique({ where: { id: params.id } });
    if (!slide) return NextResponse.json({ error: "Slide not found" }, { status: 404 });
    return NextResponse.json(slide);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch slide" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token || !verifyToken(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await request.json();
    const slide = await prisma.heroSlide.update({
      where: { id: params.id },
      data: {
        title: body.title,
        titleEn: body.titleEn,
        subtitle: body.subtitle,
        subtitleEn: body.subtitleEn,
        image: body.image,
        order: body.order,
        status: body.active !== false ? "active" : "inactive",
      },
    });
    return NextResponse.json(slide);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update slide" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token || !verifyToken(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    await prisma.heroSlide.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Slide deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete slide" }, { status: 500 });
  }
}
