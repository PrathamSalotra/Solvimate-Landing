import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us - Solvimate | Get in Touch for Language & AI Solutions',
  description:
    'Reach out to Solvimate via email, phone, or office location in Varanasi, India, or send us a message for your translation, dubbing, and AI data project needs.',
  openGraph: {
    title: 'Contact Us - Solvimate | Get in Touch for Language & AI Solutions',
    description:
      'Reach out to Solvimate via email, phone, or office location in Varanasi, India, or send us a message for your translation, dubbing, and AI data project needs.',
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
