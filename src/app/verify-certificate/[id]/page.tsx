import { redirect } from "next/navigation";
import {
  getCertificateById,
  recordCertificateVerification,
} from "@/services/certificate.service";

interface VerifyCertificateRouteProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function VerifyCertificateRoute({
  params,
}: VerifyCertificateRouteProps) {
  const { id } = await params;
  const certificate = await getCertificateById(id);
  const normalizedId = encodeURIComponent(id.trim().toUpperCase());

  if (!certificate || certificate.status !== "active") {
    redirect(`/verify-certificate/${normalizedId}/invalid`);
  }

  await recordCertificateVerification(certificate.verificationId, new Date());
  redirect(`/verify-certificate/${normalizedId}/valid`);
}
