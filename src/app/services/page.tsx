import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const revalidate = 86400; // Longer ISR window per spec rendering-strategy decision (24 hours)

export const metadata: Metadata = {
  title: 'Our Services - Solvimate | Translation, Dubbing & AI Data Solutions',
  description:
    'Explore Solvimate’s six core service sectors: Translation & Localization, Dubbing Projects, Transcription & Recording, Data Collection & Annotation, Content Development, and IT & Platform Support.',
  openGraph: {
    title: 'Our Services - Solvimate | Translation, Dubbing & AI Data Solutions',
    description:
      'Explore Solvimate’s six core service sectors: Translation & Localization, Dubbing Projects, Transcription & Recording, Data Collection & Annotation, Content Development, and IT & Platform Support.',
    type: 'website',
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
