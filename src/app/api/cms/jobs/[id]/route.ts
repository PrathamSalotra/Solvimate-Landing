import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ADMIN_ROLES } from "@/models/Admin";
import { updateJob, deleteJob } from "@/services/cms.service";

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
    const job = await updateJob(id, body);

    return NextResponse.json({ ok: true, data: { job } }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, message: error.message || "Failed to update job." },
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
    await deleteJob(id);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, message: error.message || "Failed to delete job." },
      { status: 500 }
    );
  }
}
