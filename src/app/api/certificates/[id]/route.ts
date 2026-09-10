import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ADMIN_ROLES } from "@/models/Admin";
import { updateCertificate } from "@/services/certificate.service";
import { z } from "zod";

const updateSchema = z.object({
  status: z.enum(["active", "revoked"]),
});

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
    if (!id) {
      return NextResponse.json({ ok: false, message: "Certificate ID is required." }, { status: 400 });
    }

    const body = await req.json();
    const validatedData = updateSchema.parse(body);

    const certificate = await updateCertificate(id, { status: validatedData.status });

    return NextResponse.json({ ok: true, data: { certificate } }, { status: 200 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, message: "Validation error", errors: (error as any).errors || (error as any).issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { ok: false, message: error.message || "Failed to update certificate." },
      { status: 500 }
    );
  }
}
