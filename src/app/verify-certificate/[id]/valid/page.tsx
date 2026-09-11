import Image from "next/image";
import { redirect } from "next/navigation";
import { getCertificateById } from "@/services/certificate.service";
import ValidCertificateClient from "./ValidCertificateClient";

interface ValidCertificatePageProps {
  params: Promise<{ id: string }>;
}

export default async function ValidCertificatePage({
  params,
}: ValidCertificatePageProps) {
  const { id } = await params;
  const certificate = await getCertificateById(id);

  if (!certificate || certificate.status !== "active") {
    redirect(`/verify-certificate/${encodeURIComponent(id.trim().toUpperCase())}/invalid`);
  }

  const verificationId = certificate.verificationId;
  const initials = certificate.candidateName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Convert the complex mongoose document object to a plain object before passing it to a Client Component
  const plainCertificate = JSON.parse(JSON.stringify(certificate));

  return (
    <ValidCertificateClient
      certificate={plainCertificate}
      verificationId={verificationId}
      initials={initials}
    />
  );
}
