import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ADMIN_ROLES } from "@/models/Admin";
import { listJobs, createJob } from "@/services/cms.service";

export async function GET(req: NextRequest) {
  try {
    const jobs = await listJobs();
    return NextResponse.json({ ok: true, data: { jobs } }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, message: error.message || "Failed to list jobs." },
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
    const job = await createJob(body);

    return NextResponse.json({ ok: true, data: { job } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, message: error.message || "Failed to create job." },
      { status: 500 }
    );
  }
}
