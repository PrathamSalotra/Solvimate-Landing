"use client";

import { useState } from "react";
import { Toaster } from "react-hot-toast";
import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import AssetUploadCard from "./components/AssetUploadCard";
import CertificateDetailsForm from "./components/CertificateDetailsForm";
import RecentCertificatesPanel, {
  RecentCertificateItem,
} from "./components/RecentCertificatesPanel";
import { UploadAssetResult } from "@/services/upload.service";

import {
  PageContainer,
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

        <DashboardHeader
          eyebrow="CERTIFICATE OPERATIONS"
          title="Certificates"
          subtitle="Ingest verifiable credentials into the encrypted registry and manage recent certificate records."
        />

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
