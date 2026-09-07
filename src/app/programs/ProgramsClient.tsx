'use client';

import React from 'react';
import ProgramsHero from '@/components/programs/ProgramsHero';
import ProgramsPathways from '@/components/programs/ProgramsPathways';
import { useGSAPScrollReveal } from '@/hooks/useGSAPScrollReveal';
import { MainWrapper } from './ProgramsClient.styles';

export default function ProgramsClient() {
  const containerRef = useGSAPScrollReveal<HTMLElement>();

  return (
    <MainWrapper ref={containerRef}>
      <ProgramsHero />
      <ProgramsPathways />
    </MainWrapper>
  );
}
