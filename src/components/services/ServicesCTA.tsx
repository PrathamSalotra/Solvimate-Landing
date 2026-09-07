'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  SectionWrapper,
  BannerCard,
  GlowSpot,
  Headline,
  Description,
  QuoteButton,
} from './ServicesCTA.styles';

export default function ServicesCTA() {
  const { t } = useLanguage();

  return (
    <SectionWrapper>
      <BannerCard data-gsap="heading">
        <GlowSpot aria-hidden="true" />
        <Headline>{t('services.cta_heading')}</Headline>
        <Description>{t('services.cta_desc')}</Description>
        <QuoteButton href="/contact">{t('services.cta_button')}</QuoteButton>
      </BannerCard>
    </SectionWrapper>
  );
}
