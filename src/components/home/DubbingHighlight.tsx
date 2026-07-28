'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';

const SectionWrapper = styled.section`
  width: 100%;
  padding: 6rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.cardBg};
  border-bottom: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 3.5rem;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  max-height: 480px;
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.background} 0%,
    rgba(59, 130, 246, 0.15) 50%,
    rgba(16, 185, 129, 0.15) 100%
  );
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.3);

  @media (max-width: 992px) {
    order: 2;
  }
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 992px) {
    order: 1;
  }
`;

const TagPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  background: rgba(59, 130, 246, 0.12);
  border: 1px solid rgba(59, 130, 246, 0.35);
  color: #3b82f6;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Headline = styled.h2`
  font-size: clamp(2.25rem, 4.5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.foreground};
  margin: 0;
`;

const Description = styled.p`
  font-size: clamp(1.0625rem, 1.8vw, 1.25rem);
  line-height: 1.65;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
`;

const FeaturesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const FeatureChip = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 12px;
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.foreground};
  font-size: 0.875rem;
  font-weight: 600;
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
  background: radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
  color: ${({ theme }) => theme.textSecondary};
  z-index: 0;

  svg {
    width: 48px;
    height: 48px;
    opacity: 0.75;
    color: #3b82f6;
  }

  span {
    font-size: 0.9375rem;
    font-weight: 600;
    max-width: 320px;
  }
`;

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
