import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ADMIN_ROLES } from "@/models/Admin";
import { listCertificates, createCertificate } from "@/services/certificate.service";
import { z } from "zod";

const certificateSchema = z.object({
  verificationId: z.string().min(1, "Certificate ID is required"),
  candidateName: z.string().min(1, "Candidate name is required"),
  candidatePhoto: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  internshipRole: z.string().min(1, "Role is required"),
  department: z.string().min(1, "Department is required"),
  organization: z.string().min(1, "Organization is required"),
  issueDate: z.string().min(1, "Issue date is required"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  duration: z.string().optional(),
  description: z.string().optional(),
  badges: z.array(z.string()).optional(),
  status: z.enum(["active", "revoked"]).optional(),
  certificatePdfUrl: z.string().optional(),
  certificateImageUrl: z.string().optional(),
  cloudinaryPublicId: z.string().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const status = searchParams.get("status") || undefined;
    const query = searchParams.get("query") || undefined;

    const result = await listCertificates({ page, limit, status, query });

    return NextResponse.json({ ok: true, data: result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, message: error.message || "Failed to list certificates." },
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
    const validatedData = certificateSchema.parse(body);

    const certificate = await createCertificate(validatedData);

    return NextResponse.json({ ok: true, data: { certificate } }, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, message: "Validation error", errors: (error as any).errors || (error as any).issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { ok: false, message: error.message || "Failed to create certificate." },
      { status: 500 }
    );
  }
}
