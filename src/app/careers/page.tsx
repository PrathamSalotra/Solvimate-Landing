import type { Metadata } from 'next';
import { supabaseServer } from '@/lib/supabase/server';
import CareersClient from './CareersClient';

export const revalidate = 60; // Short revalidation window per spec §5.5

export interface JobListing {
  id: string;
  title: string;
  track: 'candidate' | 'vendor';
  category: string;
  languages: string[];
  status: 'available' | 'closed';
  description: string;
  created_at: string;
}

export const metadata: Metadata = {
  title: 'Opportunities - Solvimate | For Candidates & Vendors',
  description:
    'Explore global freelance language specialist roles and vendor agency partnerships across Recording, Transcription, Data Annotation, Content Creation, and Robotic Video Data Collection.',
  openGraph: {
    title: 'Opportunities - Solvimate | For Candidates & Vendors',
    description:
      'Explore global freelance language specialist roles and vendor agency partnerships across Recording, Transcription, Data Annotation, Content Creation, and Robotic Video Data Collection.',
    type: 'website',
  },
};

async function getJobListings(): Promise<JobListing[]> {
  try {
    const { data, error } = await supabaseServer
      .from('job_listings')
      .select('*')
      .eq('status', 'available')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Careers Page] Supabase error fetching job_listings:', error.message);
      return [];
    }

    return (data as JobListing[]) || [];
  } catch (err) {
    console.error('[Careers Page] Unexpected error fetching listings:', err);
    return [];
  }
}

export default async function CareersPage() {
  const listings = await getJobListings();

  return <CareersClient initialListings={listings} />;
}
