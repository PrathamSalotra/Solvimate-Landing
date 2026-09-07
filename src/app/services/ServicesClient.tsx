'use client';

import React from 'react';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesGrid from '@/components/services/ServicesGrid';
import StatsBand from '@/components/services/StatsBand';
import WhyChooseUs from '@/components/services/WhyChooseUs';
import ServicesCTA from '@/components/services/ServicesCTA';
import ScrollReactiveGlobe from '@/components/home/ScrollReactiveGlobe';
import { useGSAPScrollReveal } from '@/hooks/useGSAPScrollReveal';
import { MainWrapper, FixedBackgroundGlobe } from './ServicesClient.styles';

export default function ServicesClient() {
  const containerRef = useGSAPScrollReveal<HTMLElement>();

  return (
    <MainWrapper ref={containerRef}>
      <FixedBackgroundGlobe aria-hidden="true">
        <ScrollReactiveGlobe />
      </FixedBackgroundGlobe>
      <ServicesHero />
      <ServicesGrid />
      <StatsBand />
      <WhyChooseUs />
      <ServicesCTA />
    </MainWrapper>
  );
}
