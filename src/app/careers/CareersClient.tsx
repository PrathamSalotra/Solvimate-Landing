'use client';

import React from 'react';
import CareersHero from '@/components/careers/CareersHero';
import CareersSection from '@/components/careers/CareersSection';
import ScrollReactiveGlobe from '@/components/home/ScrollReactiveGlobe';
import { useGSAPScrollReveal } from '@/hooks/useGSAPScrollReveal';
import type { JobListing } from './page';
import { MainWrapper, FixedBackgroundGlobe } from './CareersClient.styles';

interface CareersClientProps {
  initialListings: JobListing[];
}

export default function CareersClient({ initialListings }: CareersClientProps) {
  const containerRef = useGSAPScrollReveal<HTMLElement>();

  return (
    <MainWrapper ref={containerRef}>
      <FixedBackgroundGlobe aria-hidden="true">
        <ScrollReactiveGlobe />
      </FixedBackgroundGlobe>
      <CareersHero />
      <CareersSection initialListings={initialListings} />
    </MainWrapper>
  );
}
