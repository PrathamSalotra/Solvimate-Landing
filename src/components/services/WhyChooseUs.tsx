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
  CardsGrid,
  ReasonCard,
  IconBox,
  ReasonTitle,
  ReasonDesc,
} from './WhyChooseUs.styles';

interface WhyItem {
  keyTitle: string;
  keyDesc: string;
  icon: React.ReactNode;
}

const WHY_DATA: WhyItem[] = [
  {
    keyTitle: 'services.why_w1_title',
    keyDesc: 'services.why_w1_desc',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    keyTitle: 'services.why_w2_title',
    keyDesc: 'services.why_w2_desc',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    keyTitle: 'services.why_w3_title',
    keyDesc: 'services.why_w3_desc',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    keyTitle: 'services.why_w4_title',
    keyDesc: 'services.why_w4_desc',
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

export default function WhyChooseUs() {
  const { t } = useLanguage();

  return (
    <SectionWrapper>
      <SectionContainer>
        <HeaderGroup data-gsap="heading">
          <TagText>{t('services.why_tag')}</TagText>
          <SectionTitle>{t('services.why_heading')}</SectionTitle>
          <SectionBody>{t('services.why_subtitle')}</SectionBody>
        </HeaderGroup>

        <CardsGrid>
          {WHY_DATA.map((item, idx) => (
            <ReasonCard key={idx} data-gsap="card">
              <IconBox>{item.icon}</IconBox>
              <ReasonTitle>{t(item.keyTitle)}</ReasonTitle>
              <ReasonDesc>{t(item.keyDesc)}</ReasonDesc>
            </ReasonCard>
          ))}
        </CardsGrid>
      </SectionContainer>
    </SectionWrapper>
  );
}
