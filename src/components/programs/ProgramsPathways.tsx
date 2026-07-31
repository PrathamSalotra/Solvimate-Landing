'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const SectionWrapper = styled.section`
  width: 100%;
  padding: 2rem 1.5rem 6.5rem;
  background: ${({ theme }) => theme.background};

  @media (max-width: 768px) {
    padding: 1.5rem 1rem 5rem;
  }
`;

const Container = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
`;

const PathwaysGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PathwayCard = styled.article`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 2.75rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.primaryHover};
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.07);
  }

  @media (max-width: 640px) {
    padding: 2rem 1.5rem;
  }
`;

const ContentTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PathwayBadge = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  display: inline-flex;
  align-self: flex-start;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  background: rgba(55, 251, 137, 0.12);
  border: 1px solid rgba(55, 251, 137, 0.3);
  color: ${({ theme }) => theme.primaryHover};
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const PathwayTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.75rem;
  font-weight: 800;
  color: ${({ theme }) => theme.foreground};
  margin: 0;
  line-height: 1.25;
`;

const PathwayDesc = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.05rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.7;
  margin: 0;
`;

const PrimaryButton = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.body};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  padding: 0.85rem 2rem;
  border-radius: 9999px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.colors.ink};
  font-size: 0.95rem;
  font-weight: 700;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: 0 4px 14px rgba(190, 254, 114, 0.25);

  &:hover {
    transform: translateY(-2px);
    background: ${({ theme }) => theme.primaryHover};
    box-shadow: 0 6px 20px rgba(190, 254, 114, 0.4);
  }
`;

const GeneralBanner = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;

  @media (max-width: 640px) {
    padding: 2.25rem 1.5rem;
  }
`;

const GeneralTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.75rem;
  font-weight: 800;
  color: ${({ theme }) => theme.foreground};
  margin: 0;
`;

const GeneralDesc = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.05rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.7;
  max-width: 680px;
  margin: 0;
`;

const ButtonsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const OutlineButton = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.body};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 2rem;
  border-radius: 9999px;
  border: 2px solid ${({ theme }) => theme.primaryText};
  color: ${({ theme }) => theme.primaryText};
  background: transparent;
  font-size: 0.95rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(190, 254, 114, 0.12);
    transform: translateY(-2px);
  }
`;

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
