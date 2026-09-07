'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { PageContainer } from './page.styles';

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
