import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import AdminLoginForm from '@/features/auth/AdminLoginForm';

export const metadata: Metadata = {
  title: 'Admin Sign In | Solvimate',
  description: 'Two-factor authenticated administrator sign-in for Solvimate operations and credentials management.',
};

interface AdminLoginPageProps {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
}

export function sanitizeCallbackUrl(callbackUrl?: string): string {
  if (!callbackUrl) {
    return '/admin/dashboard';
  }
  // Prevent open redirect vulnerabilities by ensuring it begins with /admin
  return callbackUrl.startsWith('/admin') ? callbackUrl : '/admin/dashboard';
}

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  let session = null;
  try {
    session = await getServerSession(authOptions);
  } catch {
    session = null;
  }

  if (session?.user?.email && (session.user as any)?.role) {
    redirect('/admin/dashboard');
  }

  const params = await searchParams;
  const callbackUrl = sanitizeCallbackUrl(params?.callbackUrl);

  return <AdminLoginForm callbackUrl={callbackUrl} />;
}
