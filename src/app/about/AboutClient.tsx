'use client';

import React from 'react';
import styled from 'styled-components';
import AboutHero from '@/components/about/AboutHero';
import WhatWeStandFor from '@/components/about/WhatWeStandFor';
import ServiceSectors from '@/components/about/ServiceSectors';
import OurServices from '@/components/about/OurServices';
import JoinOurTeam from '@/components/about/JoinOurTeam';
import GetInTouch from '@/components/about/GetInTouch';
import GrowTogether from '@/components/about/GrowTogether';
import { useGSAPScrollReveal } from '@/hooks/useGSAPScrollReveal';

const MainWrapper = styled.main`
  width: 100%;
  overflow-x: hidden;
`;

export default function AboutClient() {
  const containerRef = useGSAPScrollReveal<HTMLElement>();

  return (
    <MainWrapper ref={containerRef}>
      <AboutHero />
      <WhatWeStandFor />
      <ServiceSectors />
      <OurServices />
      <JoinOurTeam />
      <GetInTouch />
      <GrowTogether />
    </MainWrapper>
  );
}
