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
  z-index: 2;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 5rem 1rem 3.5rem;
  }
`;

const BackgroundGlow = styled.div`
  position: absolute;
  top: -120px;
  left: 50%;
  transform: translateX(-50%);
  width: 750px;
  height: 520px;
  background: radial-gradient(circle, rgba(190, 254, 114, 0.15) 0%, rgba(190, 254, 114, 0) 70%);
  pointer-events: none;
  z-index: 0;
`;

const HeroContainer = styled.div`
  max-width: 1100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  z-index: 1;
`;

const PillRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
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
  letter-spacing: 0.05em;
  text-transform: uppercase;
  backdrop-filter: blur(8px);
`;

const DotIndicator = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  display: inline-block;
  box-shadow: 0 0 6px ${({ theme }) => theme.primary};
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
  max-width: 860px;

  @media (max-width: 768px) {
    font-size: 1.625rem;
    line-height: 1.2;
  }

  @media (min-width: 1440px) {
    font-size: 4.4rem;
    line-height: 1.05;
  }
`;

const ParagraphText = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.75;
  max-width: 780px;
  margin: 0;
`;

const BadgeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const ComplianceBadge = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 1.1rem;
  border-radius: 8px;
  background: ${({ theme }) => theme.surface};
  opacity: 1;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: ${({ theme }) => (theme.isDark ? '0 8px 24px rgba(0, 0, 0, 0.25)' : '0 8px 24px rgba(0, 0, 0, 0.08)')};
  color: ${({ theme }) => theme.foreground};
  font-size: 0.85rem;
  font-weight: 600;
`;

export default function AboutHero() {
  const { t } = useLanguage();

  return (
    <HeroWrapper>
      <BackgroundGlow aria-hidden="true" />
      <HeroContainer data-gsap="heading">
        <PillRow>
          <TagPill>
            <DotIndicator />
            {t('about.tagCompany')}
          </TagPill>
          <TagPill>
            <DotIndicator />
            {t('about.tagAI')}
          </TagPill>
        </PillRow>

        <Headline>{t('about.headline')}</Headline>
        <ParagraphText>{t('about.description1')}</ParagraphText>
        <ParagraphText>{t('about.description2')}</ParagraphText>

        <BadgeRow>
          <ComplianceBadge>
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
            {t('about.gstBadge')}
          </ComplianceBadge>
        </BadgeRow>
      </HeroContainer>
    </HeroWrapper>
  );
}
