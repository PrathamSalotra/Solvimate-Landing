import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { listAdmins, inviteAdmin } from "@/services/admin.service";
import { z } from "zod";

const inviteSchema = z.object({
  email: z.string().email("Invalid email address"),
  role: z.enum(["super_admin", "admin", "manager"]).default("manager"),
});

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const sessionRole = (session?.user as any)?.role ?? "";

    if (sessionRole !== "super_admin") {
      return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
    }

    const admins = await listAdmins();
    return NextResponse.json({ ok: true, data: { admins } }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, message: error.message || "Failed to list admins." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const sessionRole = (session?.user as any)?.role ?? "";

    if (sessionRole !== "super_admin") {
      return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = inviteSchema.parse(body);

    const admin = await inviteAdmin(validatedData.email, validatedData.role);

    return NextResponse.json({ ok: true, data: { admin } }, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, message: "Validation error", errors: (error as any).errors || (error as any).issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { ok: false, message: error.message || "Failed to invite admin." },
      { status: 500 }
    );
  }
}
