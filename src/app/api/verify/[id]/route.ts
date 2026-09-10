import { NextRequest, NextResponse } from "next/server";
import { getCertificateById, recordCertificateVerification } from "@/services/certificate.service";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ ok: false, message: "Certificate ID is required." }, { status: 400 });
    }

    const certificate = await getCertificateById(id);

    if (!certificate) {
      return NextResponse.json({ ok: false, message: "Certificate not found." }, { status: 404 });
    }

    if (certificate.status === "active") {
      await recordCertificateVerification(id, new Date());
    }

    // Only return safe public fields
    const publicData = {
      verificationId: certificate.verificationId,
      candidateName: certificate.candidateName,
      internshipRole: certificate.internshipRole,
      department: certificate.department,
      organization: certificate.organization,
      issueDate: certificate.issueDate,
      startDate: certificate.startDate,
      endDate: certificate.endDate,
      duration: certificate.duration,
      description: certificate.description,
      badges: certificate.badges,
      status: certificate.status,
      certificatePdfUrl: certificate.certificatePdfUrl,
    };

    return NextResponse.json({ ok: true, data: { certificate: publicData } }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, message: error.message || "Failed to verify certificate." },
      { status: 500 }
    );
  }
}
