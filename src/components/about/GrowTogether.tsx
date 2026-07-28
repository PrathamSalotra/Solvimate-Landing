'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const SectionWrapper = styled.section`
  width: 100%;
  padding: 5.5rem 1.5rem 6.5rem;
  background: ${({ theme }) => theme.background};

  @media (max-width: 768px) {
    padding: 4rem 1rem 5rem;
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

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const BenefitCard = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  color: ${({ theme }) => theme.foreground};
  margin: 0;
`;

const CardBody = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.6;
  margin: 0;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 2rem;
  border-radius: 9999px;
  background: ${({ theme }) => theme.primary};
  color: #ffffff;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.5);
  }
`;

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
