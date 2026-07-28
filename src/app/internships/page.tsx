import type { Metadata } from 'next';
import { supabaseServer } from '@/lib/supabase/server';
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
    const { data, error } = await supabaseServer
      .from('internships')
      .select('*')
      .eq('status', 'open')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Internships Page] Supabase error fetching internships:', error.message);
      return [];
    }

    return (data as InternshipListing[]) || [];
  } catch (err) {
    console.error('[Internships Page] Unexpected error fetching internships:', err);
    return [];
  }
}

export default async function InternshipsPage() {
  const internships = await getInternships();

  return <InternshipsClient initialInternships={internships} />;
}
