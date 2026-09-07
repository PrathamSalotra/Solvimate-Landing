'use client';

import React from 'react';
import AboutHero from '@/components/about/AboutHero';
import WhatWeStandFor from '@/components/about/WhatWeStandFor';
import ServiceSectors from '@/components/about/ServiceSectors';
import OurServices from '@/components/about/OurServices';
import JoinOurTeam from '@/components/about/JoinOurTeam';
import GetInTouch from '@/components/about/GetInTouch';
import GrowTogether from '@/components/about/GrowTogether';
import ScrollReactiveGlobe from '@/components/home/ScrollReactiveGlobe';
import { useGSAPScrollReveal } from '@/hooks/useGSAPScrollReveal';
import { MainWrapper, FixedBackgroundGlobe } from './AboutClient.styles';

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
