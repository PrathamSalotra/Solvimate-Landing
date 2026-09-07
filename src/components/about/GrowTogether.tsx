'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  SectionWrapper,
  SectionContainer,
  HeaderGroup,
  TagText,
  SectionTitle,
  SectionBody,
  BenefitsGrid,
  BenefitCard,
  CardTitle,
  CardBody,
  CTAButton,
} from './GrowTogether.styles';

interface GrowItem {
  keyTitle: string;
  keyBody: string;
}

const GROW_DATA: GrowItem[] = [
  { keyTitle: 'about.grow_g1_title', keyBody: 'about.grow_g1_body' },
  { keyTitle: 'about.grow_g2_title', keyBody: 'about.grow_g2_body' },
  { keyTitle: 'about.grow_g3_title', keyBody: 'about.grow_g3_body' },
  { keyTitle: 'about.grow_g4_title', keyBody: 'about.grow_g4_body' },
];

export default function GrowTogether() {
  const { t } = useLanguage();

  return (
    <SectionWrapper>
      <SectionContainer>
        <HeaderGroup data-gsap="heading">
          <TagText>{t('about.growTag')}</TagText>
          <SectionTitle>{t('about.growHeading')}</SectionTitle>
          <SectionBody>{t('about.growBody')}</SectionBody>
        </HeaderGroup>

        <BenefitsGrid>
          {GROW_DATA.map((item, idx) => (
            <BenefitCard key={idx} data-gsap="card">
              <CardTitle>{t(item.keyTitle)}</CardTitle>
              <CardBody>{t(item.keyBody)}</CardBody>
            </BenefitCard>
          ))}
        </BenefitsGrid>

        <CTAButton href="/contact">{t('about.growCTA')}</CTAButton>
      </SectionContainer>
    </SectionWrapper>
  );
}
