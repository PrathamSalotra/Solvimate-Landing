'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';

const CarouselSection = styled.section`
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
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0 0 1.5rem;
  text-align: center;
  padding: 0 1.5rem;
`;

const ViewportContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  overflow: hidden;
  position: relative;
  padding: 1.25rem 0;
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 12%,
    black 88%,
    transparent 100%
  );
  mask-image: linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%);
`;

const scrollAnimation = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
`;

const CarouselTrack = styled.div`
  display: flex;
  align-items: center;
  gap: 3.5rem;
  padding: 0.5rem 0;
  width: max-content;
  animation: ${scrollAnimation} 30s linear infinite;

  &:hover,
  &:focus-within {
    animation-play-state: paused;
  }
`;

const LogoCard = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.75rem;
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 9999px;
  color: ${({ theme }) => theme.foreground};
  font-size: 1.0625rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  white-space: nowrap;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
  cursor: default;
  outline: none;

  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.primary};
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.15);
  }

  svg {
    width: 22px;
    height: 22px;
    fill: currentColor;
    color: ${({ theme }) => theme.primary};
    flex-shrink: 0;
  }
`;

interface LogoItem {
  name: string;
  iconPath: string;
}

const clientLogos: LogoItem[] = [
  {
    name: 'GlobalTech',
    iconPath:
      'M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm7.93 6h-3.17a15.822 15.822 0 0 0-1.38-4.24A8.028 8.028 0 0 1 19.93 8ZM12 4a13.916 13.916 0 0 1 1.79 4H10.21A13.916 13.916 0 0 1 12 4ZM4.07 8h3.17a15.822 15.822 0 0 0 1.38-4.24A8.028 8.028 0 0 1 4.07 8ZM4 10a7.9 7.9 0 0 1 .07-1h3.76a17.65 17.65 0 0 0 0 6H4.07A7.9 7.9 0 0 1 4 10Zm4.62 6.24A15.822 15.822 0 0 0 10 20.48V16ZM10.21 14h3.58a13.916 13.916 0 0 1-1.79 4 13.916 13.916 0 0 1-1.79-4Zm5.17 2.24a15.822 15.822 0 0 0 1.38 4.24A8.028 8.028 0 0 1 15.38 16.24Zm.79-2.24h3.76a7.9 7.9 0 0 1 .07 1 7.9 7.9 0 0 1-.07 1H16.17a17.65 17.65 0 0 0 0-2Z',
  },
  {
    name: 'LinguaCorp',
    iconPath:
      'M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Zm0 14H5.17L4 17.17V4h16ZM7 9h2v2H7Zm4 0h2v2h-2Zm4 0h2v2h-2Z',
  },
  {
    name: 'NexaVoice',
    iconPath:
      'M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3Zm5-3c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2Z',
  },
  {
    name: 'AudioPulse',
    iconPath:
      'M3 9v6h4l5 5V4L7 9H3Zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02ZM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77Z',
  },
  {
    name: 'EduSphere',
    iconPath: 'M12 3 1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82Z',
  },
  {
    name: 'DataPeak',
    iconPath:
      'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2ZM9 17H7v-7h2v7Zm4 0h-2V7h2v10Zm4 0h-2v-4h2v4Z',
  },
  {
    name: 'VoxAI',
    iconPath:
      'M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z',
  },
  {
    name: 'MediaScale',
    iconPath:
      'M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4Z',
  },
];

export default function LogoCarousel() {
  const { t } = useLanguage();

  return (
    <CarouselSection aria-label={t('home.trustedBy')}>
      <SectionHeader>{t('home.trustedBy')}</SectionHeader>
      <ViewportContainer>
        <CarouselTrack>
          {clientLogos.map((logo, index) => (
            <LogoCard key={`logo-primary-${index}`} tabIndex={0}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d={logo.iconPath} />
              </svg>
              <span>{logo.name}</span>
            </LogoCard>
          ))}
          {clientLogos.map((logo, index) => (
            <LogoCard key={`logo-duplicate-${index}`} tabIndex={0} aria-hidden="true">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d={logo.iconPath} />
              </svg>
              <span>{logo.name}</span>
            </LogoCard>
          ))}
        </CarouselTrack>
      </ViewportContainer>
    </CarouselSection>
  );
}
