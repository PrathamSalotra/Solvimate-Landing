import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ADMIN_ROLES } from "@/models/Admin";
import { listNews, createNews } from "@/services/cms.service";

export async function GET(req: NextRequest) {
  try {
    const news = await listNews();
    return NextResponse.json({ ok: true, data: { news } }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, message: error.message || "Failed to list news." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const sessionRole = (session?.user as any)?.role ?? "";

    if (!session?.user?.email || !ADMIN_ROLES.includes(sessionRole)) {
      return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
    }

    const body = await req.json();
    const news = await createNews(body);

    return NextResponse.json({ ok: true, data: { news } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, message: error.message || "Failed to create news." },
      { status: 500 }
    );
  }
}
