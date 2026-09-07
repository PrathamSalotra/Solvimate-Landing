'use client';

import React from 'react';
import ContactHero from '@/components/contact/ContactHero';
import ContactChannels from '@/components/contact/ContactChannels';
import ContactForm from '@/components/contact/ContactForm';
import ScrollReactiveGlobe from '@/components/home/ScrollReactiveGlobe';
import { useGSAPScrollReveal } from '@/hooks/useGSAPScrollReveal';
import { MainWrapper, FixedBackgroundGlobe } from './ContactClient.styles';

export default function ContactClient() {
  const containerRef = useGSAPScrollReveal<HTMLElement>();

  return (
    <MainWrapper ref={containerRef}>
      <FixedBackgroundGlobe aria-hidden="true">
        <ScrollReactiveGlobe />
      </FixedBackgroundGlobe>
      <ContactHero />
      <ContactChannels />
      <ContactForm />
    </MainWrapper>
  );
}
