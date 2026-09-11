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
} from './HomeClient.styles';

export default function HomeClient({ listingsCount }: { listingsCount?: number }) {
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
    </HomeContainer>
  );
}
