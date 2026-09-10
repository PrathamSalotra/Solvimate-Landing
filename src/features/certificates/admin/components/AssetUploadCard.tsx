"use client";

import { useRef, useState } from "react";
import { UploadAssetResult } from "@/services/upload.service";
import {
  SectionCard,
  SectionTitle,
  SectionDescription,
  UploadRow,
  TextInput,
  FileInput,
  PrimaryButton,
  ErrorText,
  UploadMeta,
  LinkUrl,
} from "./AssetUploadCard.styles";

function formatBytes(bytes: number) {
  if (bytes <= 0) {
    return "0 B";
  }
  const units = ["B", "KB", "MB"];
  const unitIndex = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );
  const value = bytes / 1024 ** unitIndex;
  return `${value.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

interface AssetUploadCardProps {
  uploadedAsset: UploadAssetResult | null;
  onAssetUploaded: (asset: UploadAssetResult) => void;
}

export default function AssetUploadCard({
  uploadedAsset,
  onAssetUploaded,
}: AssetUploadCardProps) {
  const verificationIdInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadState, setUploadState] = useState<"idle" | "uploading">("idle");
  const [localError, setLocalError] = useState<string | null>(null);

  async function handleUploadClick() {
    const selectedFile = fileInputRef.current?.files?.[0];
    const verificationId =
      verificationIdInputRef.current?.value.trim().toUpperCase() ?? "";

    if (!verificationId) {
      setLocalError("Enter the Certificate ID before uploading.");
      return;
    }

    if (!selectedFile) {
      setLocalError("Select a certificate PDF or PNG before uploading.");
      return;
    }

    setLocalError(null);
    setUploadState("uploading");

    try {
      const payload = new FormData();
      payload.append("verificationId", verificationId);
      payload.append("file", selectedFile);

      const response = await fetch("/api/uploads/certificates", {
        method: "POST",
        body: payload,
      });

      const responseData = await response.json();

      if (!response.ok || !responseData.ok || !responseData.data?.asset) {
        throw new Error(responseData.message || "Failed to upload certificate file.");
      }

      onAssetUploaded(responseData.data.asset);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      if (verificationIdInputRef.current) {
        verificationIdInputRef.current.value = responseData.data.asset.verificationId;
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to upload certificate file.";
      setLocalError(message);
    } finally {
      setUploadState("idle");
    }
  }

  return (
    <SectionCard>
      <SectionTitle>1. Upload Certificate File</SectionTitle>
      <SectionDescription>
        Enter Certificate ID, then upload final PDF or PNG. File will be stored in the matching
        Cloudinary certificate folder.
      </SectionDescription>

      <UploadRow>
        <TextInput
          ref={verificationIdInputRef}
          type="text"
          placeholder="Certificate ID (e.g. SVM26-A8X9Q2)"
        />
        <FileInput
          ref={fileInputRef}
          type="file"
          accept=".pdf,.png,application/pdf,image/png"
        />
        <PrimaryButton
          type="button"
          onClick={handleUploadClick}
          disabled={uploadState === "uploading"}
        >
          {uploadState === "uploading" ? "Uploading..." : "Upload to Cloudinary"}
        </PrimaryButton>
      </UploadRow>

      {localError && <ErrorText>{localError}</ErrorText>}

      {uploadedAsset && (
        <UploadMeta>
          <p>
            Uploaded: <strong>{uploadedAsset.originalFilename}</strong>
          </p>
          <p>
            Certificate ID: <strong>{uploadedAsset.verificationId}</strong>
          </p>
          <p>
            Type: <strong>{uploadedAsset.resourceType}</strong> - Size:{" "}
            <strong>{formatBytes(uploadedAsset.bytes)}</strong>
          </p>
          <LinkUrl href={uploadedAsset.secureUrl} target="_blank" rel="noreferrer">
            Open Uploaded Asset
          </LinkUrl>
        </UploadMeta>
      )}
    </SectionCard>
  );
}
