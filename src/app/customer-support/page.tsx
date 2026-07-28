import type { Metadata } from 'next';
import CustomerSupportClient from './CustomerSupportClient';

export const metadata: Metadata = {
  title: 'Customer Support - Solvimate | Access Global-Quality Language Experts',
  description:
    "Submit a request to Solvimate's customer support team for your language, translation, transcription, or AI data annotation project requirements.",
  openGraph: {
    title: 'Customer Support - Solvimate | Access Global-Quality Language Experts',
    description:
      "Submit a request to Solvimate's customer support team for your language, translation, transcription, or AI data annotation project requirements.",
    type: 'website',
  },
};

export default function CustomerSupportPage() {
  return <CustomerSupportClient />;
}
