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
import ScrollReactiveGlobe from '@/components/home/ScrollReactiveGlobe';
import { useGSAPScrollReveal } from '@/hooks/useGSAPScrollReveal';

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

export default function AboutClient() {
  const containerRef = useGSAPScrollReveal<HTMLElement>();

  return (
    <MainWrapper ref={containerRef}>
      <FixedBackgroundGlobe aria-hidden="true">
        <ScrollReactiveGlobe />
      </FixedBackgroundGlobe>
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
