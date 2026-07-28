'use client';

import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';

const PageContainer = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 1.5rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.foreground};
  }

  p {
    color: ${({ theme }) => theme.textSecondary};
    font-size: 1.125rem;
    max-width: 700px;
  }
`;

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <PageContainer>
      <h1>{t('nav.about')} - Solvimate</h1>
      <p>
        Learn more about Solvimate, our mission to empower global communication, and our dubbing &
        language translation solutions.
      </p>
    </PageContainer>
  );
}
