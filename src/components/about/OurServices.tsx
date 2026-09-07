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
  ServicesGrid,
  ServiceCard,
  ServiceHeader,
  Dot,
  ServiceTitle,
  ChipsList,
  Chip,
} from './OurServices.styles';

interface ServiceGroup {
  keyTitle: string;
  items: string[];
}

const SERVICE_GROUPS: ServiceGroup[] = [
  {
    keyTitle: 'about.svcBlock1Title',
    items: ['Document Translation', 'Website Localization', 'Cultural Adaptation'],
  },
  {
    keyTitle: 'about.svcBlock2Title',
    items: ['Film Dubbing', 'E-learning VO', 'Commercial Voice-over', 'Multi-speaker'],
  },
  {
    keyTitle: 'about.svcBlock3Title',
    items: ['Audio Transcription', 'Video Transcription', 'Multi-speaker'],
  },
  {
    keyTitle: 'about.svcBlock4Title',
    items: ['Text Annotation', 'Image Labeling', 'Audio Annotation'],
  },
  {
    keyTitle: 'about.svcBlock5Title',
    items: ['K-12 Curriculum', 'Assessment Design', 'EdTech Content', 'Digital Learning'],
  },
  {
    keyTitle: 'about.svcBlock6Title',
    items: [
      'Platform Integration',
      'Workflow Automation',
      'Technical Support',
      'Digital Infrastructure',
    ],
  },
];

export default function OurServices() {
  const { t } = useLanguage();

  return (
    <SectionWrapper>
      <SectionContainer>
        <HeaderGroup data-gsap="heading">
          <TagText>{t('about.servicesTag')}</TagText>
          <SectionTitle>{t('about.servicesHeading')}</SectionTitle>
          <SectionBody>{t('about.servicesBody')}</SectionBody>
        </HeaderGroup>

        <ServicesGrid>
          {SERVICE_GROUPS.map((group, idx) => (
            <ServiceCard key={idx} data-gsap="card">
              <ServiceHeader>
                <Dot aria-hidden="true" />
                <ServiceTitle>{t(group.keyTitle)}</ServiceTitle>
              </ServiceHeader>
              <ChipsList>
                {group.items.map((item, cIdx) => (
                  <Chip key={cIdx}>{item}</Chip>
                ))}
              </ChipsList>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </SectionContainer>
    </SectionWrapper>
  );
}
