import { ReactNode } from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import { PageContainer, LayoutGrid, MainContent } from "./AdminLayout.styles";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <PageContainer>
      <LayoutGrid>
        <DashboardSidebar />
        <MainContent>{children}</MainContent>
      </LayoutGrid>
    </PageContainer>
  );
}
