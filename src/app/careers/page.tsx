import type { Metadata } from 'next';
import { listInternships, listJobs } from '@/services/cms.service';
import CareersClient from './CareersClient';

export const revalidate = 60; // Short revalidation window per spec §5.5

export interface JobListing {
  id: string;
  title: string;
  type: 'job' | 'internship';
  department?: string;
  description: string;
  duration?: string;
  location?: string;
  mode: 'remote' | 'onsite' | 'hybrid';
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
    const [jobs, internships] = await Promise.all([listJobs(), listInternships()]);

    return [
      ...jobs
        .filter((listing) => listing.isActive)
        .map((listing) => ({
          id: listing.id,
          title: listing.title,
          type: 'job' as const,
          department: listing.department,
          description: listing.description,
          location: listing.location,
          mode: listing.mode,
        })),
      ...internships
        .filter((listing) => listing.isActive)
        .map((listing) => ({
          id: listing.id,
          title: listing.title,
          type: 'internship' as const,
          department: listing.department,
          description: listing.description,
          duration: listing.duration,
          location: listing.location,
          mode: listing.mode,
        })),
    ];
  } catch (err) {
    console.error('[Careers Page] Error fetching openings:', err);
    return [];
  }
}

export default async function CareersPage() {
  const listings = await getJobListings();

  return <CareersClient initialListings={listings} />;
}
