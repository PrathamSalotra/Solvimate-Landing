import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ADMIN_ROLES } from "@/models/Admin";
import { updateNews, deleteNews } from "@/services/cms.service";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const sessionRole = (session?.user as any)?.role ?? "";

    if (!session?.user?.email || !ADMIN_ROLES.includes(sessionRole)) {
      return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const news = await updateNews(id, body);

    return NextResponse.json({ ok: true, data: { news } }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, message: error.message || "Failed to update news." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const sessionRole = (session?.user as any)?.role ?? "";

    if (!session?.user?.email || !ADMIN_ROLES.includes(sessionRole)) {
      return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;
    await deleteNews(id);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, message: error.message || "Failed to delete news." },
      { status: 500 }
    );
  }
}
