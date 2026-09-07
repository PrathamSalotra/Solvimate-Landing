'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { NotFoundWrapper, BigNumber, Title, Description, BackHomeButton } from './not-found.styles';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <NotFoundWrapper>
      <BigNumber>404</BigNumber>
      <Title>{t('notFound.title')}</Title>
      <Description>{t('notFound.description')}</Description>
      <BackHomeButton href="/">{t('notFound.backHome')}</BackHomeButton>
    </NotFoundWrapper>
  );
}
