"use client";

import { useState, useEffect } from "react";

import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import {
  PageContainer,
  TabsContainer,
  TabButton,
  TabCount,
} from "./CmsDashboard.styles";
import JobsTab from "./components/JobsTab";
import InternshipsTab from "./components/InternshipsTab";
import NewsTab from "./components/NewsTab";
import { Toaster } from "react-hot-toast";

export default function CmsDashboard() {
  const [activeTab, setActiveTab] = useState<"jobs" | "internships" | "news">("jobs");
  const [counts, setCounts] = useState({ jobs: 0, internships: 0, news: 0 });

  useEffect(() => {
    // Fetch counts for tab badges
    Promise.all([
      fetch("/api/cms/jobs").then((r) => r.json()).then((d) => d.ok ? d.data.jobs.length : 0).catch(() => 0),
      fetch("/api/cms/internships").then((r) => r.json()).then((d) => d.ok ? d.data.internships.length : 0).catch(() => 0),
      fetch("/api/cms/news").then((r) => r.json()).then((d) => d.ok ? d.data.news.length : 0).catch(() => 0),
    ]).then(([jobs, internships, news]) => {
      setCounts({ jobs, internships, news });
    });
  }, []);

  return (
    <>
      <PageContainer>
        <Toaster position="top-right" />
        <DashboardHeader
          eyebrow="CONTENT MANAGEMENT"
          title="Website CMS"
          subtitle="Manage your public-facing marketing content, global talent acquisition feeds, and verified opportunities."
        />

        <TabsContainer>
          <TabButton $active={activeTab === "jobs"} onClick={() => setActiveTab("jobs")}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            Job Opportunities
            <TabCount $active={activeTab === "jobs"}>{counts.jobs}</TabCount>
          </TabButton>
          <TabButton
            $active={activeTab === "internships"}
            onClick={() => setActiveTab("internships")}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 6 3 6 3s3 0 6-3v-5"/></svg>
            Internships
            <TabCount $active={activeTab === "internships"}>{counts.internships}</TabCount>
          </TabButton>
          <TabButton $active={activeTab === "news"} onClick={() => setActiveTab("news")}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><line x1="10" y1="6" x2="18" y2="6"/><line x1="10" y1="10" x2="18" y2="10"/><line x1="10" y1="14" x2="14" y2="14"/></svg>
            News Articles
            <TabCount $active={activeTab === "news"}>{counts.news}</TabCount>
          </TabButton>
        </TabsContainer>

        {activeTab === "jobs" && <JobsTab onCountChange={(c) => setCounts((p) => ({ ...p, jobs: c }))} />}
        {activeTab === "internships" && <InternshipsTab onCountChange={(c) => setCounts((p) => ({ ...p, internships: c }))} />}
        {activeTab === "news" && <NewsTab onCountChange={(c) => setCounts((p) => ({ ...p, news: c }))} />}
      </PageContainer>
    </>
  );
}
