'use client';

import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';

const HeroWrapper = styled.section`
  width: 100%;
  padding: 6.5rem 1.5rem 3.5rem;
  background: transparent;
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
  z-index: 2;

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
  background: radial-gradient(circle, rgba(190, 254, 114, 0.16) 0%, rgba(190, 254, 114, 0) 70%);
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
  z-index: 2;
`;

const TagPill = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 1.15rem;
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
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 1.75rem 2rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  z-index: 2;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: ${({ theme }) => theme.primaryHover};
  }
`;

const TrackTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.25rem;
  font-weight: 800;
  color: ${({ theme }) => theme.foreground};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TrackBadge = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  background: rgba(55, 251, 137, 0.12);
  color: ${({ theme }) => theme.primaryHover};
  border: 1px solid rgba(55, 251, 137, 0.3);
`;

const TrackDesc = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
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
