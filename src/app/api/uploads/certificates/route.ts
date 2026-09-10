import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ADMIN_ROLES } from "@/models/Admin";
import { uploadCertificateAsset, UploadValidationError } from "@/services/upload.service";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const sessionRole = (session?.user as any)?.role ?? "";

    if (!session?.user?.email || !ADMIN_ROLES.includes(sessionRole)) {
      return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
    }

    const formData = await req.formData();
    const verificationIdRaw = formData.get("verificationId");
    const file = formData.get("file");

    if (!verificationIdRaw || typeof verificationIdRaw !== "string") {
      return NextResponse.json(
        { ok: false, message: "Certificate ID is required." },
        { status: 400 }
      );
    }

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { ok: false, message: "A valid file is required." },
        { status: 400 }
      );
    }

    const asset = await uploadCertificateAsset(file, verificationIdRaw);

    return NextResponse.json({ ok: true, data: { asset } }, { status: 200 });
  } catch (error: any) {
    if (error instanceof UploadValidationError) {
      return NextResponse.json({ ok: false, message: error.message }, { status: error.statusCode });
    }
    return NextResponse.json(
      { ok: false, message: error.message || "Failed to upload certificate." },
      { status: 500 }
    );
  }
}
