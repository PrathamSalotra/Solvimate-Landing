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
  HeaderPills,
  HeaderPill,
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
            <Eyebrow>
              <div className="dot" />
              <span>CERTIFICATE OPERATIONS</span> &bull; REGISTRY INGEST V2.4
            </Eyebrow>
            <h1>Admin Certificate Upload</h1>
            <p>
              Ingest verifiable credentials directly into the encrypted registry. Cloudinary media lake and MongoDB Atlas state activate atomically upon confirmation.
            </p>
          </div>
          <HeaderPills>
            <HeaderPill>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5.5 15.5A4.5 4.5 0 0 1 2 11c0-2.5 2-4.5 4.5-4.5.5-3 3-5 6-5 3.3 0 6 2.7 6 6 2 0 3.5 1.5 3.5 3.5S20.5 14.5 18.5 14.5"/><polyline points="8 12 12 8 16 12"/><line x1="12" y1="8" x2="12" y2="21"/></svg>
              <div>
                <span className="label">MEDIA PIPELINE</span>
                <span className="value">Cloudinary Engine</span>
              </div>
            </HeaderPill>
            <HeaderPill>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
              <div>
                <span className="label">PERSISTENCE</span>
                <span className="value">Atlas Verified</span>
              </div>
            </HeaderPill>
          </HeaderPills>
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
