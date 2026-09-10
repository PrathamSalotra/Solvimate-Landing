import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { ADMIN_ROLES } from "@/models/Admin";
import { listCertificates } from "@/services/certificate.service";
import AdminCertificatesPage from "@/features/certificates/admin/AdminCertificatesPage";
import AdminLayout from "@/features/dashboard/layouts/AdminLayout";

function toIso(value?: Date | null): string | undefined {
  if (!value) return undefined;
  return value.toISOString();
}

export default async function CertificatesServerPage() {
  const session = await getServerSession(authOptions);
  const sessionEmail = session?.user?.email ?? "";
  const sessionRole = (session?.user as any)?.role ?? "";

  if (!sessionEmail || !ADMIN_ROLES.includes(sessionRole)) {
    redirect("/admin/login?callbackUrl=/admin/certificates");
  }

  const { items } = await listCertificates({ page: 1, limit: 12 });

  const initialCertificates = items.map((item: any) => ({
    verificationId: item.verificationId,
    candidateName: item.candidateName,
    internshipRole: item.internshipRole,
    status: item.status,
    createdAt: toIso(item.createdAt) as string,
  }));

  return (
    <AdminLayout>
      <AdminCertificatesPage initialCertificates={initialCertificates} />
    </AdminLayout>
  );
}
