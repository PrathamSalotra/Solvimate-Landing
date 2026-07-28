'use client';

import React from 'react';
import styled from 'styled-components';
import ProgramsHero from '@/components/programs/ProgramsHero';
import ProgramsPathways from '@/components/programs/ProgramsPathways';
import { useGSAPScrollReveal } from '@/hooks/useGSAPScrollReveal';

const MainWrapper = styled.main`
  width: 100%;
  overflow-x: hidden;
`;

export default function ProgramsClient() {
  const containerRef = useGSAPScrollReveal<HTMLElement>();

  return (
    <MainWrapper ref={containerRef}>
      <ProgramsHero />
      <ProgramsPathways />
    </MainWrapper>
  );
}
