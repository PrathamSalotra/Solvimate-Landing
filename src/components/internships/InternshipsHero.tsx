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
} from './InternshipsHero.styles';

export default function InternshipsHero() {
  const { t } = useLanguage();

  return (
    <HeroWrapper>
      <BackgroundGlow aria-hidden="true" />
      <Container data-gsap="heading">
        <TagPill>{t('internships_page.tag')}</TagPill>
        <Headline>{t('internships_page.headline')}</Headline>
        <Subtitle>{t('internships_page.subtitle')}</Subtitle>
      </Container>
    </HeroWrapper>
  );
}
