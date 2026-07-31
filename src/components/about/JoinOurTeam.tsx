'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const SectionWrapper = styled.section`
  width: 100%;
  padding: 5.5rem 1.5rem;
  background: ${({ theme }) => theme.background};

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 3.5rem;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TagText = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  display: inline-block;
  font-size: 0.8125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.85rem, 3.5vw, 2.75rem);
  font-weight: 800;
  color: ${({ theme }) => theme.foreground};
  line-height: 1.25;
  margin: 0;
`;

const SectionBody = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.7;
  margin: 0;
`;

const RoleChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 0.5rem;
`;

const RoleChip = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  padding: 0.4rem 0.9rem;
  border-radius: 8px;
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.foreground};
  font-size: 0.85rem;
  font-weight: 600;
`;

const CTAButton = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.body};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.9rem 1.75rem;
  border-radius: 9999px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.colors.ink};
  font-weight: 700;
  font-size: 0.95rem;
  text-decoration: none;
  width: fit-content;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 14px rgba(190, 254, 114, 0.35);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(190, 254, 114, 0.45);
  }
`;

const StatsCard = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 2.5rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: 640px) {
    padding: 1.75rem;
    gap: 1.5rem;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const StatNumber = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: 900;
  color: ${({ theme }) => theme.primary};
  line-height: 1.1;
`;

const StatLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textSecondary};
`;

export default function JoinOurTeam() {
  const { t } = useLanguage();

  return (
    <SectionWrapper>
      <SectionContainer>
        <ContentColumn data-gsap="heading">
          <TagText>{t('about.teamTag')}</TagText>
          <SectionTitle>{t('about.teamHeading')}</SectionTitle>
          <SectionBody>{t('about.teamBody')}</SectionBody>

          <RoleChips>
            <RoleChip>Linguists</RoleChip>
            <RoleChip>Annotators</RoleChip>
            <RoleChip>Voice Artists</RoleChip>
            <RoleChip>Content Writers</RoleChip>
            <RoleChip>Tech Specialists</RoleChip>
          </RoleChips>

          <CTAButton href="/careers">{t('about.teamCTA')}</CTAButton>
        </ContentColumn>

        <StatsCard data-gsap="card">
          <StatItem>
            <StatNumber>50+</StatNumber>
            <StatLabel>Languages Supported</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>200+</StatNumber>
            <StatLabel>Global Clients</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>1M+</StatNumber>
            <StatLabel>Transcriptions Delivered</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>5★</StatNumber>
            <StatLabel>Client Satisfaction</StatLabel>
          </StatItem>
        </StatsCard>
      </SectionContainer>
    </SectionWrapper>
  );
}
