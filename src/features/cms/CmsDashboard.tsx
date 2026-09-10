"use client";

import { useState } from "react";

import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import { PageContainer, TabsContainer, TabButton } from "./CmsDashboard.styles";
import JobsTab from "./components/JobsTab";
import InternshipsTab from "./components/InternshipsTab";
import NewsTab from "./components/NewsTab";
import { Toaster } from "react-hot-toast";

interface CmsDashboardProps {}

export default function CmsDashboard() {
  const [activeTab, setActiveTab] = useState<"jobs" | "internships" | "news">("jobs");

  return (
    <>
      <PageContainer>
        <Toaster position="top-right" />
        <DashboardHeader
          eyebrow="CONTENT MANAGEMENT"
          title="Website CMS"
          subtitle="Manage your public-facing marketing content and opportunities."
        />

        <TabsContainer>
          <TabButton $active={activeTab === "jobs"} onClick={() => setActiveTab("jobs")}>
            Job Opportunities
          </TabButton>
          <TabButton
            $active={activeTab === "internships"}
            onClick={() => setActiveTab("internships")}
          >
            Internships
          </TabButton>
          <TabButton $active={activeTab === "news"} onClick={() => setActiveTab("news")}>
            News Articles
          </TabButton>
        </TabsContainer>

        {activeTab === "jobs" && <JobsTab />}
        {activeTab === "internships" && <InternshipsTab />}
        {activeTab === "news" && <NewsTab />}
      </PageContainer>
    </>
  );
}
