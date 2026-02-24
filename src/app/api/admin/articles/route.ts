import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token || !verifyToken(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const articles = await prisma.article.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token || !verifyToken(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await request.json();
    const article = await prisma.article.create({
      data: {
        title: body.title,
        titleEn: body.titleEn || "",
        slug: body.slug,
        excerpt: body.excerpt || "",
        excerptEn: body.excerptEn || "",
        content: body.content,
        contentEn: body.contentEn || "",
        image: body.image || "",
        category: body.category || "Umum",
        tags: body.tags || [],
        author: body.author || "Admin",
        status: body.status || "draft",
        publishedAt: body.status === "published" ? new Date() : null,
      },
    });
    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
  }
}
