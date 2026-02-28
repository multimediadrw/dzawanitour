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
    const settings = await prisma.setting.findMany();
    const response = NextResponse.json(settings);
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    return response;
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    let token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) token = request.cookies.get("admin_token")?.value;
    if (!token || !verifyToken(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await request.json();
    
    const setting = await prisma.setting.upsert({
      where: { key: body.key },
      update: { value: body.value },
      create: { 
        key: body.key, 
        value: body.value,
        type: "text",
        label: body.key,
        group: "general"
      },
    });
    
    revalidatePath("/admin/dashboard/settings");
    revalidatePath("/");
    return NextResponse.json(setting);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update setting" }, { status: 500 });
  }
}
