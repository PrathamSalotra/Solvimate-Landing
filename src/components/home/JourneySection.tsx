'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import {
  SectionWrapper,
  ContentContainer,
  HeaderBlock,
  TagBadge,
  Headline,
  Subtitle,
  ParallaxContainer,
  ScrimOverlay,
  ParallaxLayer,
  FloatingPill,
  PlaceholderFallback,
} from './JourneySection.styles';

export default function JourneySection() {
  const { t } = useLanguage();
  const [imgError, setImgError] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setOffset({
      x: ((mouseX - centerX) / centerX) * -12,
      y: ((mouseY - centerY) / centerY) * -12,
    });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <SectionWrapper>
      <ContentContainer>
        <HeaderBlock data-gsap="heading">
          <TagBadge>Solvimate Journey</TagBadge>
          <Headline>{t('home.journeyHeadline')}</Headline>
          <Subtitle>{t('home.journeyDesc')}</Subtitle>
        </HeaderBlock>

        <ParallaxContainer
          data-gsap="image"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <PlaceholderFallback aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span>{t('home.journeyAlt')}</span>
          </PlaceholderFallback>

          <ParallaxLayer $offsetX={offset.x} $offsetY={offset.y}>
            {!imgError && (
              <Image
                src="/images/journey-parallax.svg"
                alt={t('home.journeyAlt')}
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                style={{ objectFit: 'cover', zIndex: 1 }}
                onError={() => setImgError(true)}
              />
            )}
          </ParallaxLayer>

          <ScrimOverlay aria-hidden="true" />

          <FloatingPill $top="15%" $left="8%">
            Learn Continuously
          </FloatingPill>
          <FloatingPill $top="78%" $left="75%">
            Global Expansion
          </FloatingPill>
        </ParallaxContainer>
      </ContentContainer>
    </SectionWrapper>
  );
}
