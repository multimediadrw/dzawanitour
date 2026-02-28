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
    const faqs = await prisma.fAQ.findMany({ orderBy: { order: "asc" } });
    const response = NextResponse.json(faqs);
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    return response;
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
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
    const faq = await prisma.fAQ.create({
      data: {
        question: body.question,
        questionEn: body.questionEn || "",
        answer: body.answer,
        answerEn: body.answerEn || "",
        category: body.category || "Umum",
        order: body.order || 0,
      },
    });
    revalidatePath("/admin/dashboard/faqs");
    revalidatePath("/faq");
    return NextResponse.json(faq, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 });
  }
}
