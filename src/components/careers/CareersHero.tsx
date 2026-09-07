'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  HeroWrapper,
  HeroGlow,
  HeroContainer,
  TagPill,
  Headline,
  SubtitleText,
  TracksGrid,
  TrackInfoCard,
  TrackTitle,
  TrackBadge,
  TrackDesc,
} from './CareersHero.styles';

export default function CareersHero() {
  const { t } = useLanguage();

  return (
    <HeroWrapper>
      <HeroGlow aria-hidden="true" />
      <HeroContainer data-gsap="heading">
        <TagPill>{t('careers_page.tag')}</TagPill>
        <Headline>{t('careers_page.headline')}</Headline>
        <SubtitleText>{t('careers_page.subtitle')}</SubtitleText>

        <TracksGrid>
          <TrackInfoCard>
            <TrackTitle>
              {t('careers_page.track_candidate')}
              <TrackBadge>Individual</TrackBadge>
            </TrackTitle>
            <TrackDesc>{t('careers_page.track_candidate_desc')}</TrackDesc>
          </TrackInfoCard>

          <TrackInfoCard>
            <TrackTitle>
              {t('careers_page.track_vendor')}
              <TrackBadge>Partner / Agency</TrackBadge>
            </TrackTitle>
            <TrackDesc>{t('careers_page.track_vendor_desc')}</TrackDesc>
          </TrackInfoCard>
        </TracksGrid>
      </HeroContainer>
    </HeroWrapper>
  );
}
