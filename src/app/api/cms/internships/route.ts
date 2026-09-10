import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ADMIN_ROLES } from "@/models/Admin";
import { listInternships, createInternship } from "@/services/cms.service";

export async function GET(req: NextRequest) {
  try {
    const internships = await listInternships();
    return NextResponse.json({ ok: true, data: { internships } }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, message: error.message || "Failed to list internships." },
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
    const internship = await createInternship(body);

    return NextResponse.json({ ok: true, data: { internship } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, message: error.message || "Failed to create internship." },
      { status: 500 }
    );
  }
}
