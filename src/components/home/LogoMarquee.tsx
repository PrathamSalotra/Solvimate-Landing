'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';

interface ClientLogo {
  name: string;
  src: string;
  isPlaceholder?: boolean;
  scale?: number;
}

const CLIENT_LOGOS: ClientLogo[] = [
  { name: 'BayanTech', src: '/client-logos/bayantech.png?v=20260731_2' },
  { name: 'FutureBeeAI', src: '/client-logos/futurebeeai.png?v=20260731_2' },
  { name: 'GienTech', src: '/client-logos/gientech.png?v=20260731_2' },
  { name: 'Josh Talks', src: '/client-logos/joshtalks.png?v=20260731_2', scale: 1.4 },
  { name: 'Kuku FM', src: '/client-logos/kukufm.png?v=20260731_2' },
  { name: 'OpenAI', src: '/client-logos/openai.png?v=20260731_2', scale: 1.4 },
  { name: 'Pocket FM', src: '/client-logos/pocketfm.png?v=20260731_2', scale: 1.4 },
  { name: 'Story TV', src: '/client-logos/storytv.png?v=20260731_2', scale: 1.45 },
  { name: 'Uber', src: '/client-logos/uber.png?v=20260731_2', scale: 1.4 },
];

const marqueeScroll = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
`;

const MarqueeSection = styled.section`
  width: 100%;
  padding: 3.5rem 0 4.5rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.cardBg};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 228px;

  @media (max-width: 768px) {
    min-height: 196px;
  }
`;

const SectionHeader = styled.h2`
  font-size: 0.8125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  word-spacing: 0.08em;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0 0 2rem;
  text-align: center;
  padding: 0 1.5rem;
`;

const ViewportContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  overflow: hidden;
  position: relative;
  padding: 0.75rem 0;
  min-height: 56px;
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);

  @media (max-width: 768px) {
    min-height: 48px;
  }

  @media (prefers-reduced-motion: reduce) {
    mask-image: none !important;
    -webkit-mask-image: none !important;
    overflow: visible;
  }
`;

const CarouselTrack = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  min-height: 32px;
  animation: ${marqueeScroll} 28s linear infinite;

  @media (max-width: 768px) {
    min-height: 24px;
  }

  &:hover,
  &:focus-within {
    animation-play-state: paused;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
    transform: none !important;
    width: 100%;
    justify-content: center;
  }
`;

const LogoStrip = styled.div<{ $isDuplicate?: boolean }>`
  display: flex;
  align-items: center;
  gap: 4.5rem;
  padding-right: 4.5rem;
  flex-shrink: 0;
  min-height: 32px;

  @media (max-width: 768px) {
    gap: 3rem;
    padding-right: 3rem;
    min-height: 24px;
  }

  @media (prefers-reduced-motion: reduce) {
    ${({ $isDuplicate }) =>
      $isDuplicate
        ? `
      display: none !important;
    `
        : `
      flex-wrap: wrap;
      justify-content: center;
      padding-right: 0;
      width: 100%;
      gap: 2rem 3rem;
    `}
  }
`;

const LogoImage = styled.img<{ $scale?: number }>`
  height: ${({ $scale = 1 }) => Math.round(32 * $scale)}px;
  width: auto;
  max-width: 200px;
  object-fit: contain;
  opacity: 0.55;
  flex-shrink: 0;
  cursor: pointer;
  transition:
    opacity 0.25s ease,
    transform 0.25s ease,
    filter 0.25s ease;

  &:hover,
  &:focus-visible {
    opacity: 1;
    transform: scale(1.08);
    outline: none;
  }

  @media (max-width: 768px) {
    height: ${({ $scale = 1 }) => Math.round(24 * $scale)}px;
    max-width: 140px;
  }
`;

export default function LogoMarquee() {
  const { t } = useLanguage();

  return (
    <MarqueeSection aria-label={t('home.trustedBy')}>
      <SectionHeader>{t('home.trustedBy')}</SectionHeader>
      <ViewportContainer>
        <CarouselTrack>
          <LogoStrip $isDuplicate={false}>
            {CLIENT_LOGOS.map((logo, index) => (
              <LogoImage
                key={`logo-primary-${index}`}
                src={logo.src}
                alt={`${logo.name} logo`}
                title={logo.name}
                tabIndex={0}
                $scale={logo.scale || 1}
                width={150}
                height={Math.round(32 * (logo.scale || 1))}
                data-placeholder={logo.isPlaceholder ? 'true' : undefined}
                loading="eager"
                decoding="async"
              />
            ))}
          </LogoStrip>
          <LogoStrip $isDuplicate={true} aria-hidden="true">
            {CLIENT_LOGOS.map((logo, index) => (
              <LogoImage
                key={`logo-duplicate-${index}`}
                src={logo.src}
                alt=""
                title={logo.name}
                $scale={logo.scale || 1}
                width={150}
                height={Math.round(32 * (logo.scale || 1))}
                data-placeholder={logo.isPlaceholder ? 'true' : undefined}
                loading="eager"
                decoding="async"
              />
            ))}
          </LogoStrip>
        </CarouselTrack>
      </ViewportContainer>
    </MarqueeSection>
  );
}
