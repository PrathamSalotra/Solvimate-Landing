'use client';

import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';

const SectionWrapper = styled.section`
  width: 100%;
  padding: 5rem 1.5rem;
  background: ${({ theme }) => theme.cardBg};
  border-top: 1px solid ${({ theme }) => theme.border};
  border-bottom: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const HeaderGroup = styled.div`
  max-width: 680px;
  margin-bottom: 3.5rem;
`;

const TagText = styled.span`
  display: inline-block;
  font-size: 0.8125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.6rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.85rem, 3.5vw, 2.75rem);
  font-weight: 800;
  color: ${({ theme }) => theme.foreground};
  line-height: 1.25;
  margin: 0 0 1rem;
`;

const SectionBody = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.7;
  margin: 0;
`;

const PillarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PillarCard = styled.div`
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(16, 185, 129, 0.45);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  }
`;

const IconCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(16, 185, 129, 0.12);
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.foreground};
  margin: 0;
`;

const CardText = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.6;
  margin: 0;
`;

interface PillarItem {
  keyTitle: string;
  keyBody: string;
  icon: React.ReactNode;
}

const PILLARS_DATA: PillarItem[] = [
  {
    keyTitle: 'about.pillar_accuracy_title',
    keyBody: 'about.pillar_accuracy_body',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    keyTitle: 'about.pillar_cultural_title',
    keyBody: 'about.pillar_cultural_body',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    keyTitle: 'about.pillar_speed_title',
    keyBody: 'about.pillar_speed_body',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    keyTitle: 'about.pillar_transparency_title',
    keyBody: 'about.pillar_transparency_body',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    keyTitle: 'about.pillar_ai_title',
    keyBody: 'about.pillar_ai_body',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
  },
  {
    keyTitle: 'about.pillar_partnership_title',
    keyBody: 'about.pillar_partnership_body',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function WhatWeStandFor() {
  const { t } = useLanguage();

  return (
    <SectionWrapper>
      <SectionContainer>
        <HeaderGroup data-gsap="heading">
          <TagText>{t('about.pillarsTag')}</TagText>
          <SectionTitle>{t('about.pillarsHeading')}</SectionTitle>
          <SectionBody>{t('about.pillarsBody')}</SectionBody>
        </HeaderGroup>

        <PillarsGrid>
          {PILLARS_DATA.map((item, idx) => (
            <PillarCard key={idx} data-gsap="card">
              <IconCircle>{item.icon}</IconCircle>
              <CardTitle>{t(item.keyTitle)}</CardTitle>
              <CardText>{t(item.keyBody)}</CardText>
            </PillarCard>
          ))}
        </PillarsGrid>
      </SectionContainer>
    </SectionWrapper>
  );
}
