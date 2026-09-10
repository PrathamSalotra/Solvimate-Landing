"use client";


import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import AccountCard from "@/features/settings/components/AccountCard";
import AdminsTable from "@/features/settings/components/AdminsTable";
import { PageContainer } from "./SettingsPage.styles";
import { AdminPayload } from "@/services/admin.service";

interface SettingsPageProps {
  email: string;
  role: string;
  lastLoginAt?: string | null;
  admins?: AdminPayload[];
}

export default function SettingsPage({ email, role, lastLoginAt, admins }: SettingsPageProps) {
  return (
    <>
      <PageContainer>
        <DashboardHeader
          eyebrow="ACCESS CONTROL"
          title="Settings"
          subtitle="Manage your administrator session and securely sign out of the Solvimate Control Plane."
        />

        <AccountCard email={email} role={role} lastLoginAt={lastLoginAt} />

        {admins ? <AdminsTable initialAdmins={admins} currentEmail={email} /> : null}
      </PageContainer>
    </>
  );
}
