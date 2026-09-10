"use client";

import { Toaster } from "react-hot-toast";

import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import CertificateHealth from "./components/CertificateHealth";
import CertificateManagementTable, {
  DashboardCertificate,
} from "./components/CertificateManagementTable";
import { PageContainer } from "./AnalyticsPage.styles";

interface AnalyticsPageProps {
  analytics: {
    statusBreakdown: { active: number; revoked: number };
    verificationEngagement: { verifiedAtLeastOnce: number; neverVerified: number };
  };
  initialCertificates: DashboardCertificate[];
  totalInitial: number;
}

export default function AnalyticsPage({
  analytics,
  initialCertificates,
  totalInitial,
}: AnalyticsPageProps) {
  return (
    <>
      <PageContainer>
        <Toaster position="top-right" />
        <DashboardHeader
          eyebrow="INSIGHTS"
          title="Analytics"
          subtitle="Real-time certificate issuance trajectories, verification velocity, cryptographic audit traces, and lifecycle governance."
        />

        <CertificateHealth
          statusBreakdown={analytics.statusBreakdown}
          verificationEngagement={analytics.verificationEngagement}
        />

        <CertificateManagementTable
          initialCertificates={initialCertificates}
          totalInitial={totalInitial}
        />
      </PageContainer>
    </>
  );
}
