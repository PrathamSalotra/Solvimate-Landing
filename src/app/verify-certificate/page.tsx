import type { Metadata } from 'next';
import VerifyCertificateClient from './VerifyCertificateClient';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Verify Certificate - Solvimate | Certificate Verification Portal',
  description:
    'Check the authenticity and validity of any Solvimate issued certificate or credential.',
  openGraph: {
    title: 'Verify Certificate - Solvimate | Certificate Verification Portal',
    description:
      'Check the authenticity and validity of any Solvimate issued certificate or credential.',
    type: 'website',
  },
};

export default function VerifyCertificatePage() {
  return <VerifyCertificateClient />;
}
