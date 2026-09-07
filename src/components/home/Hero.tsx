'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  HeroSectionWrapper,
  BackgroundGlow,
  HeroContent,
  PillBadge,
  HeroHeadline,
  HeroSupport,
  CtaButton,
} from './Hero.styles';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <HeroSectionWrapper>
      <BackgroundGlow />
      <HeroContent data-gsap="heading">
        <PillBadge>{t('home.heroPill')}</PillBadge>
        <HeroHeadline>{t('home.heroHeadline')}</HeroHeadline>
        <HeroSupport>{t('home.heroSupport')}</HeroSupport>
        <CtaButton href="/contact">{t('home.heroCta')}</CtaButton>
      </HeroContent>
    </HeroSectionWrapper>
  );
}
