'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';

const SectionWrapper = styled.section`
  width: 100%;
  padding: 6rem 1.5rem 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.background};
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 4rem 1rem 5rem;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.5rem;
`;

const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
`;

const TagBadge = styled.span`
  display: inline-block;
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: ${({ theme }) => theme.primary};
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const Headline = styled.h2`
  font-size: clamp(2.5rem, 5vw, 3.75rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.foreground};
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: clamp(1.125rem, 2vw, 1.375rem);
  color: ${({ theme }) => theme.textSecondary};
  max-width: 650px;
  margin: 0;
  line-height: 1.6;
`;

const ParallaxContainer = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  max-height: 540px;
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
  cursor: default;
`;

const ParallaxLayer = styled.div<{ $offsetX: number; $offsetY: number }>`
  position: absolute;
  inset: -20px;
  transform: translate3d(${({ $offsetX }) => $offsetX}px, ${({ $offsetY }) => $offsetY}px, 0);
  transition: transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1);
  will-change: transform;
  pointer-events: none;
`;

const AbstractNode = styled.div<{
  $top: string;
  $left: string;
  $size: string;
  $color: string;
}>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  border-radius: 50%;
  background: ${({ $color }) => $color};
  opacity: 0.25;
  filter: blur(40px);
`;

const FloatingCard = styled.div<{ $top: string; $left: string }>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  padding: 1.25rem;
  background: ${({ theme }) => theme.cardBg};
  backdrop-filter: blur(12px);
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.3);
  z-index: 2;
  pointer-events: none;

  @media (max-width: 768px) {
    padding: 0.85rem;
  }
`;

const FloatingPill = styled.div<{ $top: string; $left: string }>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  padding: 0.6rem 1.2rem;
  background: ${({ theme }) => theme.surface};
  backdrop-filter: blur(8px);
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 9999px;
  color: ${({ theme }) => theme.foreground};
  font-size: 0.875rem;
  font-weight: 700;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
  z-index: 2;
  pointer-events: none;

  @media (max-width: 768px) {
    display: none;
  }
`;

const PlaceholderFallback = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  text-align: center;
  background: radial-gradient(circle at center, rgba(190, 254, 114, 0.12) 0%, transparent 70%);
  color: ${({ theme }) => theme.textSecondary};
  z-index: 0;

  svg {
    width: 48px;
    height: 48px;
    opacity: 0.75;
    color: ${({ theme }) => theme.primary};
  }

  span {
    font-size: 0.9375rem;
    font-weight: 600;
    max-width: 320px;
  }
`;

export default function JourneySection() {
  const { t } = useLanguage();
  const [imgError, setImgError] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
