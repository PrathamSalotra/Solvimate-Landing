"use client";

import { useState } from "react";
import { Toaster } from "react-hot-toast";
import AssetUploadCard from "./components/AssetUploadCard";
import CertificateDetailsForm from "./components/CertificateDetailsForm";
import RecentCertificatesPanel, {
  RecentCertificateItem,
} from "./components/RecentCertificatesPanel";
import { UploadAssetResult } from "@/services/upload.service";

import {
  PageContainer,
  Header,
  Eyebrow,
  Grid,
  LeftColumn,
  RightColumn,
} from "./AdminCertificatesPage.styles";

interface AdminCertificatesPageProps {
  initialCertificates: RecentCertificateItem[];
}

export default function AdminCertificatesPage({
  initialCertificates,
}: AdminCertificatesPageProps) {
  const [uploadedAsset, setUploadedAsset] = useState<UploadAssetResult | null>(null);
  const [certificates, setCertificates] = useState<RecentCertificateItem[]>(
    initialCertificates
  );

  function handleCertificateCreated(item: RecentCertificateItem) {
    setCertificates((current) => [item, ...current].slice(0, 12));
    setUploadedAsset(null);
  }

  return (
    <>
      <PageContainer>
        <Toaster position="top-right" />

        <Header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div>
            <Eyebrow>CERTIFICATE OPERATIONS</Eyebrow>
            <h1>Admin Certificate Upload</h1>
            <p>
              Upload certificate file to Cloudinary, then save metadata to MongoDB.
              Verification URL becomes active right after save.
            </p>
          </div>
        </Header>

        <Grid>
          <LeftColumn>
            <AssetUploadCard
              uploadedAsset={uploadedAsset}
              onAssetUploaded={setUploadedAsset}
            />
            <CertificateDetailsForm
              uploadedAsset={uploadedAsset}
              onCertificateCreated={handleCertificateCreated}
            />
          </LeftColumn>
          <RightColumn>
            <RecentCertificatesPanel items={certificates} />
          </RightColumn>
        </Grid>
      </PageContainer>
    </>
  );
}
