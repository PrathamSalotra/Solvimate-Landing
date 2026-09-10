import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { ADMIN_ROLES } from "@/models/Admin";
import CmsDashboard from "@/features/cms/CmsDashboard";
import AdminLayout from "@/features/dashboard/layouts/AdminLayout";

export default async function CmsServerPage() {
  const session = await getServerSession(authOptions);
  const sessionEmail = session?.user?.email ?? "";
  const sessionRole = (session?.user as any)?.role ?? "";

  if (!sessionEmail || !ADMIN_ROLES.includes(sessionRole as any)) {
    redirect("/admin/login?callbackUrl=/admin/cms");
  }

  return (
    <AdminLayout>
      <CmsDashboard />
    </AdminLayout>
  );
}
