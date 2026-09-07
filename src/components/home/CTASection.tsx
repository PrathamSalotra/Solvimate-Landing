'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  SectionWrapper,
  CardContainer,
  BackgroundGlow,
  TextBlock,
  Headline,
  Subline,
  CTAButton,
} from './CTASection.styles';

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
