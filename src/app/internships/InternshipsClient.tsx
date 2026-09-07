'use client';

import React from 'react';
import InternshipsHero from '@/components/internships/InternshipsHero';
import InternshipsList from '@/components/internships/InternshipsList';
import { useGSAPScrollReveal } from '@/hooks/useGSAPScrollReveal';
import type { InternshipListing } from './page';
import { MainWrapper } from './InternshipsClient.styles';

interface InternshipsClientProps {
  initialInternships: InternshipListing[];
}

export default function InternshipsClient({ initialInternships }: InternshipsClientProps) {
  const containerRef = useGSAPScrollReveal<HTMLElement>();

  return (
    <MainWrapper ref={containerRef}>
      <InternshipsHero />
      <InternshipsList initialInternships={initialInternships} />
    </MainWrapper>
  );
}
