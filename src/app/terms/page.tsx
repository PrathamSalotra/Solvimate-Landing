'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { PageContainer } from './page.styles';

export default function TermsPage() {
  const { t } = useLanguage();

  return (
    <PageContainer>
      <h1>{t('footer.termsOfService')} - Solvimate</h1>
      <p>
        Read the terms and conditions governing access to Solvimate language and transcription tools
        and services.
      </p>
    </PageContainer>
  );
}
