import { redirect } from "next/navigation";
import { getCertificateById } from "@/services/certificate.service";
import InvalidCertificateClient from "./InvalidCertificateClient";

interface InvalidCertificatePageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function InvalidCertificatePage({
  params,
}: InvalidCertificatePageProps) {
  const { id } = await params;
  const verificationId = id.trim().toUpperCase();
  const certificate = await getCertificateById(verificationId);

  if (certificate?.status === "active") {
    redirect(`/verify-certificate/${encodeURIComponent(verificationId)}/valid`);
  }

  return <InvalidCertificateClient verificationId={verificationId} />;
}
