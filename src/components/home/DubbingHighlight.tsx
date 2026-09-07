'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import {
  SectionWrapper,
  ContentContainer,
  ImageContainer,
  ScrimOverlay,
  DubbingOverlayBadge,
  TextBlock,
  TagPill,
  Headline,
  Description,
  FeaturesList,
  FeatureChip,
  PlaceholderFallback,
} from './DubbingHighlight.styles';

export default function DubbingHighlight() {
  const { t } = useLanguage();
  const [imgError, setImgError] = useState(false);

  return (
    <SectionWrapper>
      <ContentContainer>
        <ImageContainer data-gsap="image">
          <PlaceholderFallback aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="22" />
            </svg>
            <span>{t('home.dubbingAlt')}</span>
          </PlaceholderFallback>
          {!imgError && (
            <Image
              src="/images/dubbing-highlight.svg"
              alt={t('home.dubbingAlt')}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              style={{ objectFit: 'cover', zIndex: 1 }}
              onError={() => setImgError(true)}
            />
          )}
          <ScrimOverlay aria-hidden="true" />
          <DubbingOverlayBadge aria-hidden="true">{t('home.dubbingAlt')}</DubbingOverlayBadge>
        </ImageContainer>
        <TextBlock data-gsap="heading">
          <TagPill>
            <span>&bull;</span> Dubbing Solutions
          </TagPill>
          <Headline>{t('home.dubbingHeadline')}</Headline>
          <Description>{t('home.dubbingDesc')}</Description>
          <FeaturesList>
            <FeatureChip>Film Dubbing</FeatureChip>
            <FeatureChip>E-learning VO</FeatureChip>
            <FeatureChip>Commercial Voice-over</FeatureChip>
            <FeatureChip>Multi-speaker Sync</FeatureChip>
          </FeaturesList>
        </TextBlock>
      </ContentContainer>
    </SectionWrapper>
  );
}
