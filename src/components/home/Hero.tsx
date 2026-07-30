'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';

const HeroSectionWrapper = styled.section`
  position: relative;
  width: 100%;
  padding: 6rem 1.5rem 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 4.5rem 1rem 3.5rem;
  }
`;

const BackgroundGlow = styled.div`
  position: absolute;
  top: -20%;
  left: 50%;
  transform: translateX(-50%);
  width: 80vw;
  height: 500px;
  background: radial-gradient(
    circle,
    rgba(16, 185, 129, 0.12) 0%,
    rgba(59, 130, 246, 0.08) 40%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 0;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PillBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 1.25rem;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.35);
  color: #10b981;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.1);
`;

const HeroHeadline = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4.4rem);
  line-height: 1.08;
  font-weight: 800;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.foreground};
  margin: 0 0 1.75rem;
  max-width: 1100px;

  @media (max-width: 480px) {
    font-size: 2.5rem;
    line-height: 1.15;
  }

  @media (min-width: 1440px) {
    font-size: 4.4rem;
    line-height: 1.05;
  }
`;

const HeroSupport = styled.p`
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.6;
  max-width: 760px;
  margin: 0 auto 2.5rem;
  font-weight: 400;
`;

const CtaButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1.125rem 2.75rem;
  border-radius: 9999px;
  background: ${({ theme }) => theme.primary};
  color: #ffffff;
  font-size: 1.125rem;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.35);
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
    transform: translateY(-2px);
    box-shadow: 0 14px 30px -5px rgba(16, 185, 129, 0.45);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default function Hero() {
  const { t } = useLanguage();

  return (
    <HeroSectionWrapper>
      <BackgroundGlow />
      <HeroContent data-gsap="heading">
        <PillBadge>{t('home.heroPill')}</PillBadge>
        <HeroHeadline>{t('home.heroHeadline')}</HeroHeadline>
        <HeroSupport>{t('home.heroSupport')}</HeroSupport>
        <CtaButton href="/contact">{t('home.heroCta')}</CtaButton>
      </HeroContent>
    </HeroSectionWrapper>
  );
}
