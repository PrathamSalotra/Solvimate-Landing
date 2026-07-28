'use client';

import React from 'react';
import styled from 'styled-components';
import ContactHero from '@/components/contact/ContactHero';
import ContactChannels from '@/components/contact/ContactChannels';
import ContactForm from '@/components/contact/ContactForm';
import { useGSAPScrollReveal } from '@/hooks/useGSAPScrollReveal';

const MainWrapper = styled.main`
  width: 100%;
  overflow-x: hidden;
`;

export default function ContactClient() {
  const containerRef = useGSAPScrollReveal<HTMLElement>();

  return (
    <MainWrapper ref={containerRef}>
      <ContactHero />
      <ContactChannels />
      <ContactForm />
    </MainWrapper>
  );
}
