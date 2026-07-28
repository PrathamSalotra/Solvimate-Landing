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

export default function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <PageContainer>
      <h1>{t('footer.privacyPolicy')} - Solvimate</h1>
      <p>
        Learn how Solvimate collects, protects, and handles your data for translation, dubbing, and
        localization services.
      </p>
    </PageContainer>
  );
}
