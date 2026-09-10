"use client";


import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import AccountCard from "@/features/settings/components/AccountCard";
import AdminsTable from "@/features/settings/components/AdminsTable";
import { PageContainer } from "./SettingsPage.styles";
import { AdminPayload } from "@/services/admin.service";

interface SettingsPageProps {
  lastLoginAt?: string | null;
  admins?: AdminPayload[];
}

export default function SettingsPage({ lastLoginAt, admins }: SettingsPageProps) {
  return (
    <>
      <PageContainer>
        <DashboardHeader
          eyebrow="ACCESS CONTROL"
          title="Settings"
          subtitle="Manage your account and, if you're a super admin, review who has access."
        />

        <AccountCard lastLoginAt={lastLoginAt} />

        {admins ? <AdminsTable initialAdmins={admins} currentEmail="" /> : null}
      </PageContainer>
    </>
  );
}
