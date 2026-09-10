import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { ADMIN_ROLES } from "@/models/Admin";
import { listAdmins } from "@/services/admin.service";
import SettingsPage from "@/features/settings/SettingsPage";
import Admin from "@/models/Admin";
import dbConnect from "@/lib/mongodb";
import AdminLayout from "@/features/dashboard/layouts/AdminLayout";

export default async function SettingsServerPage() {
  const session = await getServerSession(authOptions);
  const sessionEmail = session?.user?.email ?? "";
  const sessionRole = (session?.user as { role?: string } | undefined)?.role ?? "";

  if (!sessionEmail || !ADMIN_ROLES.includes(sessionRole as (typeof ADMIN_ROLES)[number])) {
    redirect("/admin/login?callbackUrl=/admin/settings");
  }

  // Fetch current user's lastLoginAt from DB
  await dbConnect();
  const currentAdmin = await Admin.findOne({ email: sessionEmail }).select("lastLoginAt").lean();

  const lastLoginAt = currentAdmin?.lastLoginAt ? currentAdmin.lastLoginAt.toISOString() : null;

  // If super_admin, fetch list of admins
  let admins = undefined;
  if (sessionRole === "super_admin") {
    admins = await listAdmins();
  }

  return (
    <AdminLayout>
      <SettingsPage
        email={sessionEmail}
        role={sessionRole}
        lastLoginAt={lastLoginAt}
        admins={admins}
      />
    </AdminLayout>
  );
}
