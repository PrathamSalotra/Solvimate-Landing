'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  SectionWrapper,
  SectionContainer,
  ContentColumn,
  TagText,
  SectionTitle,
  SectionBody,
  RoleChips,
  RoleChip,
  CTAButton,
  StatsCard,
  StatItem,
  StatNumber,
  StatLabel,
} from './JoinOurTeam.styles';

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
