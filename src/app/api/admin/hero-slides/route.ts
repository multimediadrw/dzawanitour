import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    let token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) token = request.cookies.get("admin_token")?.value;
    if (!token || !verifyToken(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const slides = await prisma.heroSlide.findMany({ orderBy: { order: "asc" } });
    const response = NextResponse.json(slides);
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    return response;
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch slides" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    let token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) token = request.cookies.get("admin_token")?.value;
    if (!token || !verifyToken(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await request.json();
    const slide = await prisma.heroSlide.create({
      data: {
        title: body.title,
        titleEn: body.titleEn || "",
        subtitle: body.subtitle || "",
        subtitleEn: body.subtitleEn || "",
        image: body.image,
        order: body.order || 0,
        status: body.active !== false ? "active" : "inactive",
      },
    });
    revalidatePath("/admin/dashboard/hero-slides");
    revalidatePath("/");
    return NextResponse.json(slide, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create slide" }, { status: 500 });
  }
}
