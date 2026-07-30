'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';

const SectionWrapper = styled.section`
  width: 100%;
  padding: 5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.background};
  border-bottom: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 768px) {
    padding: 3.5rem 1rem;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 3.5rem;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Headline = styled.h2`
  font-size: clamp(2.25rem, 4.5vw, 3.25rem);
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

const ImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  max-height: 480px;
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.cardBg} 0%,
    rgba(16, 185, 129, 0.15) 50%,
    rgba(59, 130, 246, 0.15) 100%
  );
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.3);
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
  background: radial-gradient(circle at center, rgba(16, 185, 129, 0.08) 0%, transparent 70%);
  color: ${({ theme }) => theme.textSecondary};
  z-index: 0;

  svg {
    width: 48px;
    height: 48px;
    opacity: 0.75;
    color: ${({ theme }) => theme.primaryText};
  }

  span {
    font-size: 0.9375rem;
    font-weight: 600;
    max-width: 320px;
  }
`;

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
        </ImageContainer>
      </ContentContainer>
    </SectionWrapper>
  );
}
