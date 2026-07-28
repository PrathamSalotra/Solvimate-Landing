import type { Metadata } from 'next';
import ProgramsClient from './ProgramsClient';

export const revalidate = 3600; // Longer ISR window for static programs overview

export const metadata: Metadata = {
  title: 'Programs & Pathways - Solvimate | Job Opportunities & Internships',
  description:
    'Discover structured pathways to collaborate with Solvimate through Job Opportunities, Internship Programs, and General Applications.',
  openGraph: {
    title: 'Programs & Pathways - Solvimate | Job Opportunities & Internships',
    description:
      'Discover structured pathways to collaborate with Solvimate through Job Opportunities, Internship Programs, and General Applications.',
    type: 'website',
  },
};

export default function ProgramsPage() {
  return <ProgramsClient />;
}
