'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  HeroWrapper,
  BackgroundGlow,
  Container,
  TagPill,
  Headline,
  Subtitle,
} from './ProgramsHero.styles';

export default function ProgramsHero() {
  const { t } = useLanguage();

  return (
    <HeroWrapper>
      <BackgroundGlow aria-hidden="true" />
      <Container data-gsap="heading">
        <TagPill>{t('programs_page.tag')}</TagPill>
        <Headline>{t('programs_page.headline')}</Headline>
        <Subtitle>{t('programs_page.subtitle')}</Subtitle>
      </Container>
    </HeroWrapper>
  );
}
