import type { Metadata } from 'next';
import AdminPortalClient from './AdminPortalClient';

export const metadata: Metadata = {
  title: 'Admin Portal - Solvimate | Management & Operations Console',
  description:
    'Administrative dashboard and portal for Solvimate operations, certificate provisioning, content CMS, and platform management.',
  openGraph: {
    title: 'Admin Portal - Solvimate | Management & Operations Console',
    description:
      'Administrative dashboard and portal for Solvimate operations, certificate provisioning, content CMS, and platform management.',
    type: 'website',
  },
};

export default function AdminPage() {
  return <AdminPortalClient />;
}
