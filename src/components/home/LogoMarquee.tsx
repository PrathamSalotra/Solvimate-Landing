'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';

/*
 * TODO [TRACKED]: Kuku FM's logo (/client-logos/kukufm.png) is flagged as a placeholder
 * pending an official transparent export. Do not ship as final without verifying transparent
 * background asset replacement.
 */

interface ClientLogo {
  name: string;
  src: string;
  isPlaceholder?: boolean;
}

const CLIENT_LOGOS: ClientLogo[] = [
  { name: 'BayanTech', src: '/client-logos/bayantech.png' },
  { name: 'FutureBeeAI', src: '/client-logos/futurebeeai.png' },
  { name: 'GienTech', src: '/client-logos/gientech.png' },
  { name: 'Josh Talks', src: '/client-logos/joshtalks.png' },
  {
    name: 'Kuku FM',
    src: '/client-logos/kukufm.png',
    // TODO [TRACKED]: Placeholder logo pending an official transparent export
    isPlaceholder: true,
  },
  { name: 'OpenAI', src: '/client-logos/openai.png' },
  { name: 'Pocket FM', src: '/client-logos/pocketfm.png' },
  { name: 'Story TV', src: '/client-logos/storytv.png' },
  { name: 'Uber', src: '/client-logos/uber.png' },
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
`;

const SectionHeader = styled.h2`
  font-size: 0.8125rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
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
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);

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
  animation: ${marqueeScroll} 28s linear infinite;

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

  @media (max-width: 768px) {
    gap: 3rem;
    padding-right: 3rem;
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

const LogoImage = styled.img`
  height: 32px;
  width: auto;
  max-width: 150px;
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
    transform: scale(1.06);
    outline: none;
  }

  @media (max-width: 768px) {
    height: 24px;
    max-width: 110px;
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
                data-placeholder={logo.isPlaceholder ? 'true' : undefined}
                loading="lazy"
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
                data-placeholder={logo.isPlaceholder ? 'true' : undefined}
                loading="lazy"
              />
            ))}
          </LogoStrip>
        </CarouselTrack>
      </ViewportContainer>
    </MarqueeSection>
  );
}
