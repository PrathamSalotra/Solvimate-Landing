'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  HeroWrapper,
  BackgroundGlow,
  HeroContainer,
  TagPill,
  Headline,
  IntroText,
} from './CustomerSupportHero.styles';

export default function CustomerSupportHero() {
  const { t } = useLanguage();

  return (
    <HeroWrapper>
      <BackgroundGlow aria-hidden="true" />
      <HeroContainer data-gsap="heading">
        <TagPill>{t('customer_support.tag')}</TagPill>
        <Headline>{t('customer_support.headline')}</Headline>
        <IntroText>{t('customer_support.intro')}</IntroText>
      </HeroContainer>
    </HeroWrapper>
  );
}
