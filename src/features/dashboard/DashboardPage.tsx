"use client";


import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import StatsGrid from "@/features/dashboard/components/StatsGrid";
import AnalyticsSection from "@/features/dashboard/components/AnalyticsSection";
import ActivityFeed from "@/features/dashboard/components/ActivityFeed";
import { DashboardOverview } from "@/services/dashboard.service";
import { TwoColumn } from "./DashboardPage.styles";

interface DashboardPageProps {
  overview: DashboardOverview;
}

export default function DashboardPage({ overview }: DashboardPageProps) {
  return (
    <>
      <DashboardHeader />
      <StatsGrid stats={overview.stats} />

      <TwoColumn>
        <AnalyticsSection topVerifiedCertificates={overview.topVerifiedCertificates} />
        <ActivityFeed
          recentCertificates={overview.recentCertificates}
          recentVerifications={overview.recentVerifications}
        />
      </TwoColumn>
    </>
  );
}
