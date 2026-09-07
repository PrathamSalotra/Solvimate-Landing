'use client';

import React from 'react';
import CustomerSupportHero from '@/components/customer-support/CustomerSupportHero';
import CustomerSupportForm from '@/components/customer-support/CustomerSupportForm';
import { useGSAPScrollReveal } from '@/hooks/useGSAPScrollReveal';
import { MainWrapper } from './CustomerSupportClient.styles';

export default function CustomerSupportClient() {
  const containerRef = useGSAPScrollReveal<HTMLElement>();

  return (
    <MainWrapper ref={containerRef}>
      <CustomerSupportHero />
      <CustomerSupportForm />
    </MainWrapper>
  );
}
