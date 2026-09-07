'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  SectionWrapper,
  SectionContainer,
  HeaderGroup,
  TagText,
  SectionTitle,
  SectionBody,
  PillarsGrid,
  PillarCard,
  IconCircle,
  CardTitle,
  CardText,
} from './WhatWeStandFor.styles';

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
