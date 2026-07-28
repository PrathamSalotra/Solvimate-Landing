'use client';

import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';
import Hero from '@/components/home/Hero';
import LogoCarousel from '@/components/home/LogoCarousel';
import ServicesSection from '@/components/home/ServicesSection';
import BannerSection from '@/components/home/BannerSection';
import DubbingHighlight from '@/components/home/DubbingHighlight';
import JourneySection from '@/components/home/JourneySection';

const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatusSection = styled.section`
  max-width: 1200px;
  width: 100%;
  padding: 2rem 1.5rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.35rem 1rem;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #10b981;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
`;

const TestInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  max-width: 420px;
`;

const TestInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.foreground};
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

export default function HomeClient({ listingsCount }: { listingsCount: number }) {
  const { t } = useLanguage();

  return (
    <HomeContainer>
      <Hero />
      <LogoCarousel />
      <ServicesSection />
      <BannerSection />
      <DubbingHighlight />
      <JourneySection />
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
