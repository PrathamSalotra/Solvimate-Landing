'use client';

import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';

const HeroWrapper = styled.section`
  width: 100%;
  padding: 6.5rem 1.5rem 4.5rem;
  display: flex;
  justify-content: center;
  background: transparent;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 5rem 1rem 3.5rem;
  }
`;

const BackgroundGlow = styled.div`
  position: absolute;
  top: -140px;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  height: 520px;
  background: radial-gradient(circle, rgba(190, 254, 114, 0.15) 0%, rgba(190, 254, 114, 0) 70%);
  pointer-events: none;
  z-index: 0;
`;

const HeroContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  position: relative;
  z-index: 1;
`;

const TagPill = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  border: 1px solid rgba(190, 254, 114, 0.35);
  background: rgba(190, 254, 114, 0.12);
  color: ${({ theme }) => theme.primaryText};
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  backdrop-filter: blur(8px);
`;

const Headline = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.125rem, 3.5vw, 2.5rem);
  font-weight: 500;
  letter-spacing: -0.01em;
  word-spacing: 0.08em;
  line-height: 1.15;
  color: ${({ theme }) => theme.foreground};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.625rem;
    line-height: 1.2;
  }
`;

const SubtitleText = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.7;
  max-width: 760px;
  margin: 0;
`;

export default function ServicesHero() {
  const { t } = useLanguage();

  return (
    <HeroWrapper>
      <BackgroundGlow aria-hidden="true" />
      <HeroContainer data-gsap="heading">
        <TagPill>{t('services.tag')}</TagPill>
        <Headline>{t('services.headline')}</Headline>
        <SubtitleText>{t('services.subtitle')}</SubtitleText>
      </HeroContainer>
    </HeroWrapper>
  );
}
