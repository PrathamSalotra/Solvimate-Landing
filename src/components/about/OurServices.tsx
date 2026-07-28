'use client';

import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';

const SectionWrapper = styled.section`
  width: 100%;
  padding: 5.5rem 1.5rem;
  background: ${({ theme }) => theme.cardBg};
  border-top: 1px solid ${({ theme }) => theme.border};
  border-bottom: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const HeaderGroup = styled.div`
  max-width: 680px;
  margin-bottom: 3.5rem;
`;

const TagText = styled.span`
  display: inline-block;
  font-size: 0.8125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.6rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.85rem, 3.5vw, 2.75rem);
  font-weight: 800;
  color: ${({ theme }) => theme.foreground};
  line-height: 1.25;
  margin: 0 0 1rem;
`;

const SectionBody = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.7;
  margin: 0;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div`
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(16, 185, 129, 0.45);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  }
`;

const ServiceHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  flex-shrink: 0;
`;

const ServiceTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.foreground};
  margin: 0;
`;

const ChipsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Chip = styled.span`
  display: inline-block;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.22);
  color: ${({ theme }) => theme.foreground};
  font-size: 0.85rem;
  font-weight: 500;
`;

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
