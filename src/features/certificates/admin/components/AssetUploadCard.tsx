"use client";

import { useRef, useState } from "react";
import { UploadAssetResult } from "@/services/upload.service";
import {
  SectionCard,
  SectionHeader,
  TitleGroup,
  StepBadge,
  SectionTitle,
  UploadGrid,
  InputGroup,
  UploadZone,
  FileDetails,
  ActionButtons,
  ReplaceButton,
  PrimaryButton,
  ErrorText,
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
      <SectionHeader>
        <TitleGroup>
          <StepBadge>1</StepBadge>
          <SectionTitle>Certificate File Staging & Upload</SectionTitle>
        </TitleGroup>
      </SectionHeader>

      <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '0.8rem', color: 'var(--mist)' }}>
        Payload Artifact (.PDF / .PNG)
      </div>

      <UploadGrid>
        <InputGroup>
          <label>
            Certificate ID <span>*</span> 
            {uploadedAsset && <span className="value">{uploadedAsset.verificationId}</span>}
          </label>
          <div className="input-wrapper">
            <input
              ref={verificationIdInputRef}
              type="text"
              placeholder="SVM26-A8X9Q2"
              defaultValue={uploadedAsset?.verificationId || ""}
            />
            {uploadedAsset && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            )}
          </div>
        </InputGroup>

        <UploadZone>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.png,application/pdf,image/png"
            id="file-upload"
            style={{ display: 'none' }}
            onChange={(e) => {
              // trigger a re-render to show selected file name if needed, but for now just let it be
              if (e.target.files?.length) setLocalError(null);
            }}
          />
          
          <div className="icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          </div>

          <FileDetails>
            {uploadedAsset ? (
              <>
                <span className="name">{uploadedAsset.originalFilename}</span>
                <span className="size">{formatBytes(uploadedAsset.bytes)} • Ready</span>
              </>
            ) : (
              <>
                <span className="name">Select file to upload</span>
                <span className="size">Ready to stream</span>
              </>
            )}
          </FileDetails>

          <ActionButtons>
            <ReplaceButton type="button" onClick={() => fileInputRef.current?.click()}>
              {uploadedAsset ? 'Replace' : 'Select'}
            </ReplaceButton>
            <PrimaryButton
              type="button"
              onClick={handleUploadClick}
              disabled={uploadState === "uploading"}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              {uploadState === "uploading" ? "Uploading..." : "Upload"}
            </PrimaryButton>
          </ActionButtons>
        </UploadZone>
      </UploadGrid>

      {localError && <ErrorText>{localError}</ErrorText>}
    </SectionCard>
  );
}
