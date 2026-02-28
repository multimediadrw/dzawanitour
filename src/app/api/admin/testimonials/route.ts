import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    let token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) token = request.cookies.get("admin_token")?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });

    const response = NextResponse.json(testimonials);
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    return response;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    let token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) token = request.cookies.get("admin_token")?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const testimonial = await prisma.testimonial.create({
      data: {
        name: body.name,
        location: body.location,
        packageName: body.packageName || "Paket Tour",
        rating: body.rating,
        comment: body.comment,
        commentEn: body.commentEn || "",
        date: body.date || new Date().toLocaleDateString("id-ID", { month: "long", year: "numeric" }),
        avatar: body.image || "",
        featured: body.featured || false,
      },
    });

    revalidatePath("/admin/dashboard/testimonials");
    revalidatePath("/");
    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}
