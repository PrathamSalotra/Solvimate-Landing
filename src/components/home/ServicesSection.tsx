'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';

const ServicesWrapper = styled.section`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.sectionDesktop} 1.5rem`};
  background: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: ${({ theme }) => `${theme.spacing.sectionMobile} 1rem`};
  }
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.foreground};
  margin: 0 0 1rem;
  text-align: center;
`;

const SectionSubtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: clamp(1.0625rem, 1.8vw, 1.25rem);
  color: ${({ theme }) => theme.textSecondary};
  max-width: 680px;
  text-align: center;
  margin: 0 0 3.5rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    margin: 0 0 2.5rem;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ServiceCard = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 100%;
  padding: 2.5rem 2rem;
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius.card};
  transition:
    transform ${({ theme }) => theme.motion.interaction} ease,
    border-color ${({ theme }) => theme.motion.interaction} ease,
    box-shadow ${({ theme }) => theme.motion.interaction} ease;

  &:hover {
    transform: translateY(-6px);
    border-color: ${({ theme }) => theme.colors.mint};
    box-shadow: 0 16px 40px -10px rgba(55, 251, 137, 0.15);
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const IconBadge = styled.div`
  width: 52px;
  height: 52px;
  border-radius: ${({ theme }) => theme.radius.default};
  background: ${({ theme }) => theme.accentBadgeBg};
  border: 1px solid ${({ theme }) => theme.accentBadgeBorder};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.accentText};
  margin-bottom: 1.75rem;

  svg {
    width: 26px;
    height: 26px;
    fill: currentColor;
  }
`;

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.375rem;
  font-weight: 700;
  color: ${({ theme }) => theme.foreground};
  margin: 0 0 1rem;
  line-height: 1.3;
`;

const CardDesc = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0 0 2rem;
  flex-grow: 1;
`;

const LearnMoreLink = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.body};
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.primaryText};
  font-weight: 600;
  font-size: 0.9375rem;
  text-decoration: none;
  margin-top: auto;
  transition: color ${({ theme }) => theme.motion.hover} ease;

  &:hover {
    color: ${({ theme }) => theme.colors.mint};
    text-decoration: underline;
  }
`;

export default function ServicesSection() {
  const { t } = useLanguage();

  const services = [
    {
      key: 'service1',
      title: t('home.service1Title'),
      desc: t('home.service1Desc'),
      iconPath:
        'M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8ZM11 7h2v6h-2Zm0 8h2v2h-2Z',
    },
    {
      key: 'service2',
      title: t('home.service2Title'),
      desc: t('home.service2Desc'),
      iconPath:
        'M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3Zm5-3c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2Z',
    },
    {
      key: 'service3',
      title: t('home.service3Title'),
      desc: t('home.service3Desc'),
      iconPath:
        'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2ZM9 17H7v-7h2v7Zm4 0h-2V7h2v10Zm4 0h-2v-4h2v4Z',
    },
  ];

  return (
    <ServicesWrapper>
      <SectionTitle data-gsap="heading">{t('home.servicesHeading')}</SectionTitle>
      <SectionSubtitle data-gsap="heading">{t('home.servicesSubheading')}</SectionSubtitle>
      <ServicesGrid>
        {services.map((svc) => (
          <ServiceCard key={svc.key} data-gsap="card">
            <IconBadge>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d={svc.iconPath} />
              </svg>
            </IconBadge>
            <CardTitle>{svc.title}</CardTitle>
            <CardDesc>{svc.desc}</CardDesc>
            <LearnMoreLink href="/services">{t('home.serviceLearnMore')} &rarr;</LearnMoreLink>
          </ServiceCard>
        ))}
      </ServicesGrid>
    </ServicesWrapper>
  );
}
