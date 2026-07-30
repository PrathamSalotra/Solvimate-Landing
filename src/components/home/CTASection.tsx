'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const SectionWrapper = styled.section`
  width: 100%;
  padding: 6rem 1.5rem 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.background};
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 4rem 1rem 6rem;
  }
`;

const CardContainer = styled.div`
  max-width: 1100px;
  width: 100%;
  padding: 4.5rem 3rem;
  border-radius: 32px;
  background: linear-gradient(
    135deg,
    rgba(16, 185, 129, 0.15) 0%,
    rgba(5, 150, 105, 0.25) 50%,
    rgba(16, 185, 129, 0.1) 100%
  );
  border: 1px solid rgba(16, 185, 129, 0.35);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 2rem;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
    border-radius: 24px;
    gap: 1.5rem;
  }
`;

const BackgroundGlow = styled.div`
  position: absolute;
  top: -40%;
  left: 50%;
  width: 600px;
  height: 600px;
  transform: translateX(-50%);
  background: radial-gradient(circle, rgba(52, 211, 153, 0.2) 0%, transparent 70%);
  pointer-events: none;
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  z-index: 1;
`;

const Headline = styled.h2`
  font-size: clamp(2.25rem, 4.5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.foreground};
  margin: 0;
  max-width: 800px;
`;

const Subline = styled.p`
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  font-weight: 600;
  color: ${({ theme }) => theme.primaryText};
  margin: 0;
  text-transform: capitalize;
  letter-spacing: 0.01em;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  border-radius: 9999px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.colors.ink};
  font-weight: 700;
  font-size: 1.125rem;
  text-decoration: none;
  box-shadow: 0 10px 25px -5px rgba(190, 254, 114, 0.4);
  transition:
    transform 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;
  z-index: 1;

  &:hover {
    transform: translateY(-2px);
    background: ${({ theme }) => theme.primaryHover};
    box-shadow: 0 15px 30px -5px rgba(190, 254, 114, 0.5);
  }

  &:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 3px ${({ theme }) => theme.background},
      0 0 0 6px ${({ theme }) => theme.primary};
  }
`;

export default function CTASection() {
  const { t } = useLanguage();

  return (
    <SectionWrapper>
      <CardContainer data-gsap="heading">
        <BackgroundGlow aria-hidden="true" />
        <TextBlock>
          <Headline>{t('home.ctaHeadline')}</Headline>
          <Subline>{t('home.ctaSubline')}</Subline>
        </TextBlock>
        <CTAButton href="/contact">{t('home.ctaButton')}</CTAButton>
      </CardContainer>
    </SectionWrapper>
  );
}
