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
} from './NewsHero.styles';

export default function NewsHero() {
  const { t } = useLanguage();

  return (
    <HeroWrapper>
      <BackgroundGlow aria-hidden="true" />
      <Container data-gsap="heading">
        <TagPill>{t('news_page.tag')}</TagPill>
        <Headline>{t('news_page.headline')}</Headline>
        <Subtitle>{t('news_page.subtitle')}</Subtitle>
      </Container>
    </HeroWrapper>
  );
}
