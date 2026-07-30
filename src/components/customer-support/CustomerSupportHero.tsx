'use client';

import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';

const HeroWrapper = styled.section`
  width: 100%;
  padding: 6.5rem 1.5rem 3.5rem;
  display: flex;
  justify-content: center;
  background: ${({ theme }) => theme.background};
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 5rem 1rem 3rem;
  }
`;

const BackgroundGlow = styled.div`
  position: absolute;
  top: -140px;
  left: 50%;
  transform: translateX(-50%);
  width: 750px;
  height: 500px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.16) 0%, rgba(16, 185, 129, 0) 70%);
  pointer-events: none;
  z-index: 0;
`;

const HeroContainer = styled.div`
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.25rem;
  position: relative;
  z-index: 1;
`;

const TagPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 1.15rem;
  border-radius: 9999px;
  border: 1px solid rgba(16, 185, 129, 0.35);
  background: rgba(16, 185, 129, 0.08);
  color: ${({ theme }) => theme.primary};
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  backdrop-filter: blur(8px);
`;

const Headline = styled.h1`
  font-size: clamp(2.35rem, 5vw, 4.4rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.15;
  color: ${({ theme }) => theme.foreground};
  margin: 0;

  @media (min-width: 1440px) {
    font-size: 4.4rem;
    line-height: 1.05;
  }
`;

const IntroText = styled.p`
  font-size: clamp(1.05rem, 1.6vw, 1.25rem);
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.7;
  max-width: 720px;
  margin: 0;
`;

export default function CustomerSupportHero() {
  const { t } = useLanguage();

  return (
    <HeroWrapper>
      <BackgroundGlow aria-hidden="true" />
      <HeroContainer data-gsap="heading">
        <TagPill>{t('customer_support.tag')}</TagPill>
        <Headline>{t('customer_support.headline')}</Headline>
        <IntroText>{t('customer_support.intro')}</IntroText>
      </HeroContainer>
    </HeroWrapper>
  );
}
