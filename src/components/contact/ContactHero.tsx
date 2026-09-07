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
} from './ContactHero.styles';

export default function ContactHero() {
  const { t } = useLanguage();

  return (
    <HeroWrapper>
      <BackgroundGlow aria-hidden="true" />
      <HeroContainer data-gsap="heading">
        <TagPill>{t('contact_page.tag')}</TagPill>
        <Headline>{t('contact_page.headline')}</Headline>
        <IntroText>{t('contact_page.intro')}</IntroText>
      </HeroContainer>
    </HeroWrapper>
  );
}
