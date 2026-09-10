import type { Metadata } from 'next';
import { listInternships } from '@/services/cms.service';
import InternshipsClient from './InternshipsClient';

export const revalidate = 60; // Short ISR window per spec §5.5

export interface InternshipListing {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'closed';
  created_at: string;
}

export const metadata: Metadata = {
  title: 'Internship Opportunities - Solvimate | Launch Your AI & Language Career',
  description:
    'Explore structured student and graduate internships with hands-on mentorship in language translation, localization, and artificial intelligence at Solvimate.',
  openGraph: {
    title: 'Internship Opportunities - Solvimate | Launch Your AI & Language Career',
    description:
      'Explore structured student and graduate internships with hands-on mentorship in language translation, localization, and artificial intelligence at Solvimate.',
    type: 'website',
  },
};

async function getInternships(): Promise<InternshipListing[]> {
  try {
    const internships = await listInternships();

    return internships
      .filter((internship) => internship.isActive)
      .map((internship) => ({
        id: internship.id,
        title: internship.title,
        description: internship.description,
        status: 'open' as const,
        created_at: internship.createdAt || new Date().toISOString(),
      }));
  } catch (err) {
    console.error('[Internships Page] Error fetching internships:', err);
    return [];
  }
}

export default async function InternshipsPage() {
  const internships = await getInternships();

  return <InternshipsClient initialInternships={internships} />;
}
