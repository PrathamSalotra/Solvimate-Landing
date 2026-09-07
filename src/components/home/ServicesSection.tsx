'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  ServicesWrapper,
  SectionTitle,
  SectionSubtitle,
  ServicesGrid,
  ServiceCard,
  CardHeader,
  IconBadge,
  NumberBadge,
  CardTitle,
  CardDesc,
  LearnMoreLink,
} from './ServicesSection.styles';

export default function ServicesSection() {
  const { t } = useLanguage();

  const services = [
    {
      key: 'service1',
      number: '01',
      title: t('home.service1Title'),
      desc: t('home.service1Desc'),
      iconPath:
        'M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8ZM11 7h2v6h-2Zm0 8h2v2h-2Z',
    },
    {
      key: 'service2',
      number: '02',
      title: t('home.service2Title'),
      desc: t('home.service2Desc'),
      iconPath:
        'M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3Zm5-3c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2Z',
    },
    {
      key: 'service3',
      number: '03',
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
            <CardHeader>
              <IconBadge>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d={svc.iconPath} />
                </svg>
              </IconBadge>
              <NumberBadge aria-hidden="true">{svc.number}</NumberBadge>
            </CardHeader>
            <CardTitle>{svc.title}</CardTitle>
            <CardDesc>{svc.desc}</CardDesc>
            <LearnMoreLink href="/services">{t('home.serviceLearnMore')} &rarr;</LearnMoreLink>
          </ServiceCard>
        ))}
      </ServicesGrid>
    </ServicesWrapper>
  );
}
