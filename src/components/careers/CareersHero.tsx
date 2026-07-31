'use client';

import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';

const HeroWrapper = styled.section`
  width: 100%;
  padding: 6.5rem 1.5rem 3.5rem;
  background: ${({ theme }) => theme.background};
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 5rem 1rem 2.5rem;
  }
`;

const HeroGlow = styled.div`
  position: absolute;
  top: -150px;
  left: 50%;
  transform: translateX(-50%);
  width: 750px;
  height: 500px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.16) 0%, rgba(16, 185, 129, 0) 70%);
  pointer-events: none;
  z-index: 0;
`;

const HeroContainer = styled.div`
  max-width: 960px;
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
  font-family: ${({ theme }) => theme.fonts.mono};
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 1.15rem;
  border-radius: 9999px;
  border: 1px solid rgba(16, 185, 129, 0.35);
  background: rgba(16, 185, 129, 0.08);
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
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: ${({ theme }) => theme.foreground};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.625rem;
    line-height: 1.2;
  }

  @media (min-width: 1440px) {
    font-size: 4.4rem;
    line-height: 1.05;
  }
`;

const SubtitleText = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.7;
  max-width: 740px;
  margin: 0;
`;

const TracksGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  width: 100%;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TrackInfoCard = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 20px;
  padding: 1.75rem 2rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(16, 185, 129, 0.4);
  }
`;

const TrackTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 800;
  color: ${({ theme }) => theme.foreground};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TrackBadge = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  background: rgba(16, 185, 129, 0.12);
  color: ${({ theme }) => theme.primaryText};
`;

const TrackDesc = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.6;
  margin: 0;
`;

export default function CareersHero() {
  const { t } = useLanguage();

  return (
    <HeroWrapper>
      <HeroGlow aria-hidden="true" />
      <HeroContainer data-gsap="heading">
        <TagPill>{t('careers_page.tag')}</TagPill>
        <Headline>{t('careers_page.headline')}</Headline>
        <SubtitleText>{t('careers_page.subtitle')}</SubtitleText>

        <TracksGrid>
          <TrackInfoCard>
            <TrackTitle>
              {t('careers_page.track_candidate')}
              <TrackBadge>Individual</TrackBadge>
            </TrackTitle>
            <TrackDesc>{t('careers_page.track_candidate_desc')}</TrackDesc>
          </TrackInfoCard>

          <TrackInfoCard>
            <TrackTitle>
              {t('careers_page.track_vendor')}
              <TrackBadge>Partner / Agency</TrackBadge>
            </TrackTitle>
            <TrackDesc>{t('careers_page.track_vendor_desc')}</TrackDesc>
          </TrackInfoCard>
        </TracksGrid>
      </HeroContainer>
    </HeroWrapper>
  );
}
