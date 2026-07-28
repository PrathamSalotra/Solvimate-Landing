'use client';

import React from 'react';
import styled from 'styled-components';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesGrid from '@/components/services/ServicesGrid';
import StatsBand from '@/components/services/StatsBand';
import WhyChooseUs from '@/components/services/WhyChooseUs';
import ServicesCTA from '@/components/services/ServicesCTA';
import { useGSAPScrollReveal } from '@/hooks/useGSAPScrollReveal';

const MainWrapper = styled.main`
  width: 100%;
  overflow-x: hidden;
`;

export default function ServicesClient() {
  const containerRef = useGSAPScrollReveal<HTMLElement>();

  return (
    <MainWrapper ref={containerRef}>
      <ServicesHero />
      <ServicesGrid />
      <StatsBand />
      <WhyChooseUs />
      <ServicesCTA />
    </MainWrapper>
  );
}
