'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Hero from '@/components/home/Hero';
import LogoMarquee from '@/components/home/LogoMarquee';
import ServicesSection from '@/components/home/ServicesSection';
import BannerSection from '@/components/home/BannerSection';
import DubbingHighlight from '@/components/home/DubbingHighlight';
import JourneySection from '@/components/home/JourneySection';
import BriefNoteSection from '@/components/home/BriefNoteSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';
import AnimatedWaveBackground from '@/components/home/AnimatedWaveBackground';
import { useGSAPScrollReveal } from '@/hooks/useGSAPScrollReveal';
import {
  HomeContainer,
  FixedWaveBackgroundContainer,
  StatusSection,
  StatusBadge,
  TestInputWrapper,
  TestInput,
} from './HomeClient.styles';

export default function HomeClient({ listingsCount }: { listingsCount: number }) {
  const { t } = useLanguage();
  const containerRef = useGSAPScrollReveal<HTMLDivElement>();

  return (
    <HomeContainer ref={containerRef}>
      <FixedWaveBackgroundContainer aria-hidden="true">
        <AnimatedWaveBackground />
      </FixedWaveBackgroundContainer>
      <Hero />
      <LogoMarquee />
      <ServicesSection />
      <BannerSection />
      <DubbingHighlight />
      <JourneySection />
      <BriefNoteSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <StatusSection>
        <StatusBadge>{t('home.serverQuery', { count: listingsCount })}</StatusBadge>
        <TestInputWrapper>
          <label
            htmlFor="test-input"
            style={{ fontSize: '0.75rem', opacity: 0.8, color: 'inherit' }}
          >
            {t('home.inputLabel')}
          </label>
          <TestInput id="test-input" type="text" placeholder={t('home.inputPlaceholder')} />
        </TestInputWrapper>
      </StatusSection>
    </HomeContainer>
  );
}
