'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';
import AnimatedWaveBackground from '@/components/home/AnimatedWaveBackground';

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
    rgba(190, 254, 114, 0.12) 0%,
    rgba(55, 251, 137, 0.08) 40%,
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
  font-family: ${({ theme }) => theme.fonts.mono};
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 1.25rem;
  background: rgba(190, 254, 114, 0.12);
  border: 1px solid rgba(190, 254, 114, 0.35);
  color: ${({ theme }) => theme.primaryText};
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(190, 254, 114, 0.1);
`;

const HeroHeadline = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.125rem, 3.5vw, 2.5rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: ${({ theme }) => theme.foreground};
  margin: 0 0 1.5rem 0;
  max-width: 900px;

  @media (max-width: 768px) {
    font-size: 1.625rem;
    line-height: 1.2;
  }

  @media (min-width: 1440px) {
    font-size: 4.4rem;
    line-height: 1.05;
  }
`;

const HeroSupport = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.6;
  margin: 0 0 2.5rem 0;
  max-width: 680px;
  font-weight: 400;
`;

const CtaButton = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.body};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1.125rem 2.75rem;
  border-radius: 9999px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.colors.ink};
  font-size: 1.125rem;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 10px 25px -5px rgba(190, 254, 114, 0.35);
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
    transform: translateY(-2px);
    box-shadow: 0 14px 30px -5px rgba(190, 254, 114, 0.45);
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
      <AnimatedWaveBackground />
      <HeroContent data-gsap="heading">
        <PillBadge>{t('home.heroPill')}</PillBadge>
        <HeroHeadline>{t('home.heroHeadline')}</HeroHeadline>
        <HeroSupport>{t('home.heroSupport')}</HeroSupport>
        <CtaButton href="/contact">{t('home.heroCta')}</CtaButton>
      </HeroContent>
    </HeroSectionWrapper>
  );
}
