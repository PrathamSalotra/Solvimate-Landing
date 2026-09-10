"use client";

import { useState } from "react";
import { Actions, ActionLink, CopyButton } from "./valid.styles";

interface CertificateActionsProps {
  verificationId: string;
  certificatePdfUrl?: string;
  certificateImageUrl?: string;
}

export default function CertificateActions({
  verificationId,
  certificatePdfUrl,
  certificateImageUrl,
}: CertificateActionsProps) {
  const [copied, setCopied] = useState(false);
  const certificateUrl = certificatePdfUrl || certificateImageUrl;

  async function copyCertificateId() {
    await navigator.clipboard.writeText(verificationId);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <Actions>
      {certificateImageUrl ? <ActionLink href={certificateImageUrl} target="_blank" rel="noreferrer">View Certificate</ActionLink> : null}
      {certificateUrl ? <ActionLink href={certificateUrl} target="_blank" rel="noreferrer" download={Boolean(certificatePdfUrl)}>Download Certificate</ActionLink> : null}
      <CopyButton type="button" onClick={copyCertificateId}>{copied ? "Copied" : "Copy Certificate ID"}</CopyButton>
    </Actions>
  );
}