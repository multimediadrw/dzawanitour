import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token || !verifyToken(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const article = await prisma.article.findUnique({ where: { id: params.id } });
    if (!article) return NextResponse.json({ error: "Article not found" }, { status: 404 });
    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token || !verifyToken(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await request.json();
    const article = await prisma.article.update({
      where: { id: params.id },
      data: {
        title: body.title,
        titleEn: body.titleEn,
        slug: body.slug,
        excerpt: body.excerpt,
        excerptEn: body.excerptEn,
        content: body.content,
        contentEn: body.contentEn,
        image: body.image,
        category: body.category,
        tags: body.tags,
        author: body.author,
        status: body.status,
        publishedAt: body.status === "published" && !body.publishedAt ? new Date() : body.publishedAt,
      },
    });
    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token || !verifyToken(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    await prisma.article.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Article deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete article" }, { status: 500 });
  }
}
