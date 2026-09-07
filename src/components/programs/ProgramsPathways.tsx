'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  SectionWrapper,
  Container,
  PathwaysGrid,
  PathwayCard,
  ContentTop,
  PathwayBadge,
  PathwayTitle,
  PathwayDesc,
  PrimaryButton,
  GeneralBanner,
  GeneralTitle,
  GeneralDesc,
  ButtonsRow,
  OutlineButton,
} from './ProgramsPathways.styles';

export default function ProgramsPathways() {
  const { t } = useLanguage();

  return (
    <SectionWrapper>
      <Container>
        {/* Two Main Paths (§2.6) */}
        <PathwaysGrid data-gsap="card">
          <PathwayCard>
            <ContentTop>
              <PathwayBadge>Career Path</PathwayBadge>
              <PathwayTitle>{t('programs_page.path_jobs_title')}</PathwayTitle>
              <PathwayDesc>{t('programs_page.path_jobs_desc')}</PathwayDesc>
            </ContentTop>
            <PrimaryButton href="/careers">{t('programs_page.path_jobs_button')}</PrimaryButton>
          </PathwayCard>

          <PathwayCard>
            <ContentTop>
              <PathwayBadge>Internship Path</PathwayBadge>
              <PathwayTitle>{t('programs_page.path_internships_title')}</PathwayTitle>
              <PathwayDesc>{t('programs_page.path_internships_desc')}</PathwayDesc>
            </ContentTop>
            <PrimaryButton href="/internships">
              {t('programs_page.path_internships_button')}
            </PrimaryButton>
          </PathwayCard>
        </PathwaysGrid>

        {/* General Application Option & Buttons (§2.6) */}
        <GeneralBanner data-gsap="card">
          <GeneralTitle>{t('programs_page.general_title')}</GeneralTitle>
          <GeneralDesc>{t('programs_page.general_desc')}</GeneralDesc>

          <ButtonsRow>
            <PrimaryButton href="/customer-support?subject=General%20Application">
              {t('programs_page.general_apply_button')}
            </PrimaryButton>
            <OutlineButton href="/customer-support?subject=Candidate%20Application">
              {t('programs_page.general_candidate_button')}
            </OutlineButton>
          </ButtonsRow>
        </GeneralBanner>
      </Container>
    </SectionWrapper>
  );
}
