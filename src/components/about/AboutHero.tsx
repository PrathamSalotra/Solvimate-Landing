'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  HeroWrapper,
  BackgroundGlow,
  HeroContainer,
  PillRow,
  TagPill,
  DotIndicator,
  Headline,
  ParagraphText,
  BadgeRow,
  ComplianceBadge,
} from './AboutHero.styles';

export default function AboutHero() {
  const { t } = useLanguage();

  return (
    <HeroWrapper>
      <BackgroundGlow aria-hidden="true" />
      <HeroContainer data-gsap="heading">
        <PillRow>
          <TagPill>
            <DotIndicator />
            {t('about.tagCompany')}
          </TagPill>
          <TagPill>
            <DotIndicator />
            {t('about.tagAI')}
          </TagPill>
        </PillRow>

        <Headline>{t('about.headline')}</Headline>
        <ParagraphText>{t('about.description1')}</ParagraphText>
        <ParagraphText>{t('about.description2')}</ParagraphText>

        <BadgeRow>
          <ComplianceBadge>
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
            {t('about.gstBadge')}
          </ComplianceBadge>
        </BadgeRow>
      </HeroContainer>
    </HeroWrapper>
  );
}
