'use client';

import React from 'react';
import styled from 'styled-components';
import CareersHero from '@/components/careers/CareersHero';
import CareersSection from '@/components/careers/CareersSection';
import ScrollReactiveGlobe from '@/components/home/ScrollReactiveGlobe';
import { useGSAPScrollReveal } from '@/hooks/useGSAPScrollReveal';
import type { JobListing } from './page';

const MainWrapper = styled.main`
  width: 100%;
  overflow-x: hidden;
  position: relative;
  z-index: 1;
`;

const FixedBackgroundGlobe = styled.div`
  position: fixed;
  top: 15vh;
  left: 50%;
  transform: translateX(-50%);
  width: 680px;
  height: 680px;
  opacity: 0.3;
  pointer-events: none;
  z-index: 0;

  @media (max-width: 768px) {
    width: 420px;
    height: 420px;
    top: 20vh;
  }
`;

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
