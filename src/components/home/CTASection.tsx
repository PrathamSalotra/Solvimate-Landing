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
    rgba(190, 254, 114, 0.15) 0%,
    rgba(55, 251, 137, 0.2) 50%,
    rgba(190, 254, 114, 0.1) 100%
  );
  border: 1px solid rgba(190, 254, 114, 0.35);
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
  background: radial-gradient(circle, rgba(190, 254, 114, 0.18) 0%, transparent 70%);
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
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.25rem, 4.5vw, 3.5rem);
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.01em;
  word-spacing: 0.08em;
  color: ${({ theme }) => theme.foreground};
  margin: 0;
  max-width: 800px;
`;

const Subline = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  font-weight: 600;
  color: ${({ theme }) => theme.primaryText};
  margin: 0;
  text-transform: capitalize;
  letter-spacing: 0.01em;
`;

const CTAButton = styled(Link)`
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
  z-index: 1;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
    transform: translateY(-2px);
    box-shadow: 0 14px 30px -5px rgba(190, 254, 114, 0.45);
  }

  &:active {
    transform: translateY(0);
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
