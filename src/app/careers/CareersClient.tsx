'use client';

import React from 'react';
import styled from 'styled-components';
import CareersHero from '@/components/careers/CareersHero';
import CareersSection from '@/components/careers/CareersSection';
import { useGSAPScrollReveal } from '@/hooks/useGSAPScrollReveal';
import type { JobListing } from './page';

const MainWrapper = styled.main`
  width: 100%;
  overflow-x: hidden;
`;

interface CareersClientProps {
  initialListings: JobListing[];
}

export default function CareersClient({ initialListings }: CareersClientProps) {
  const containerRef = useGSAPScrollReveal<HTMLElement>();

  return (
    <MainWrapper ref={containerRef}>
      <CareersHero />
      <CareersSection initialListings={initialListings} />
    </MainWrapper>
  );
}
