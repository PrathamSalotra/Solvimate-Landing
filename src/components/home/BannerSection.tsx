'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import {
  SectionWrapper,
  ContentContainer,
  TextBlock,
  Headline,
  Description,
  ImageContainer,
  ScrimOverlay,
  BannerOverlayBadge,
  PlaceholderFallback,
} from './BannerSection.styles';

export default function BannerSection() {
  const { t } = useLanguage();
  const [imgError, setImgError] = useState(false);

  return (
    <SectionWrapper>
      <ContentContainer>
        <TextBlock data-gsap="heading">
          <Headline>{t('home.bannerHeadline')}</Headline>
          <Description>{t('home.bannerDesc')}</Description>
        </TextBlock>
        <ImageContainer data-gsap="image">
          <PlaceholderFallback aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span>{t('home.bannerAlt')}</span>
          </PlaceholderFallback>
          {!imgError && (
            <Image
              src="/images/global-banner.svg"
              alt={t('home.bannerAlt')}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              style={{ objectFit: 'cover', zIndex: 1 }}
              onError={() => setImgError(true)}
            />
          )}
          <ScrimOverlay aria-hidden="true" />
          <BannerOverlayBadge aria-hidden="true">{t('home.bannerAlt')}</BannerOverlayBadge>
        </ImageContainer>
      </ContentContainer>
    </SectionWrapper>
  );
}
