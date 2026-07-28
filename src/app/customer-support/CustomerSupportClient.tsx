'use client';

import React from 'react';
import styled from 'styled-components';
import CustomerSupportHero from '@/components/customer-support/CustomerSupportHero';
import CustomerSupportForm from '@/components/customer-support/CustomerSupportForm';
import { useGSAPScrollReveal } from '@/hooks/useGSAPScrollReveal';

const MainWrapper = styled.main`
  width: 100%;
  overflow-x: hidden;
`;

export default function CustomerSupportClient() {
  const containerRef = useGSAPScrollReveal<HTMLElement>();

  return (
    <MainWrapper ref={containerRef}>
      <CustomerSupportHero />
      <CustomerSupportForm />
    </MainWrapper>
  );
}
