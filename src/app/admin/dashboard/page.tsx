import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { ADMIN_ROLES } from "@/models/Admin";
import DashboardPage from "@/features/dashboard/DashboardPage";
import { getDashboardOverview } from "@/services/dashboard.service";
import AdminLayout from "@/features/dashboard/layouts/AdminLayout";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  const sessionEmail = session?.user?.email ?? "";
  const sessionRole = (session?.user as any)?.role ?? "";

  if (!sessionEmail || !ADMIN_ROLES.includes(sessionRole)) {
    redirect("/admin/login?callbackUrl=/admin/dashboard");
  }

  const overview = await getDashboardOverview();

  return (
    <AdminLayout>
      <DashboardPage overview={overview} />
    </AdminLayout>
  );
}
