import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const revalidate = 86400; // Longer ISR window per spec rendering-strategy decision (24 hours)

export const metadata: Metadata = {
  title: 'About Us - Solvimate | Content Solutions that Break Language Barriers',
  description:
    'Solvimate operates at the crossroads of education, language, and AI. MSME registered and GST compliant (UDYAM-UP-75-0114640), delivering expert translation, dubbing, transcription, and AI-ready data solutions.',
  openGraph: {
    title: 'About Us - Solvimate | Content Solutions that Break Language Barriers',
    description:
      'Solvimate operates at the crossroads of education, language, and AI. MSME registered and GST compliant (UDYAM-UP-75-0114640), delivering expert translation, dubbing, transcription, and AI-ready data solutions.',
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
