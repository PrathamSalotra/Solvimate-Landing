'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  HeroWrapper,
  BackgroundGlow,
  HeroContainer,
  TagPill,
  Headline,
  SubtitleText,
} from './ServicesHero.styles';

export default function ServicesHero() {
  const { t } = useLanguage();

  return (
    <HeroWrapper>
      <BackgroundGlow aria-hidden="true" />
      <HeroContainer data-gsap="heading">
        <TagPill>{t('services.tag')}</TagPill>
        <Headline>{t('services.headline')}</Headline>
        <SubtitleText>{t('services.subtitle')}</SubtitleText>
      </HeroContainer>
    </HeroWrapper>
  );
}
