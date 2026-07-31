'use client';

import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import type { JobListing } from '@/app/careers/page';

const SectionWrapper = styled.section`
  width: 100%;
  padding: 2rem 1.5rem 6.5rem;
  background: ${({ theme }) => theme.background};

  @media (max-width: 768px) {
    padding: 1.5rem 1rem 5rem;
  }
`;

const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const FilterBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 20px;
  padding: 1.5rem 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);

  @media (max-width: 640px) {
    padding: 1.25rem 1rem;
  }
`;

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const FilterLabel = styled.span`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-right: 0.5rem;
`;

const FilterButton = styled.button<{ $active?: boolean }>`
  padding: 0.55rem 1.15rem;
  border-radius: 9999px;
  border: 1px solid ${({ $active, theme }) => ($active ? theme.primary : theme.border)};
  background: ${({ $active, theme }) => ($active ? 'rgba(16, 185, 129, 0.12)' : theme.background)};
  color: ${({ $active, theme }) => ($active ? theme.primary : theme.foreground)};
  font-size: 0.875rem;
  font-weight: ${({ $active }) => ($active ? 700 : 600)};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primaryText};
  }
`;

const ListingsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const JobCard = styled.article`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 2.25rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.primaryHover};
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.06);
  }

  @media (max-width: 640px) {
    padding: 1.75rem 1.25rem;
  }
`;

const JobCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const BadgesGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TrackBadge = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  background: rgba(190, 254, 114, 0.12);
  color: ${({ theme }) => theme.primaryText};
`;

const CategoryBadge = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.textSecondary};
`;

const AvailableBadge = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.8125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primaryHover};
  background: rgba(55, 251, 137, 0.12);
  border: 1px solid rgba(55, 251, 137, 0.3);
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.primaryHover};
    display: inline-block;
    box-shadow: 0 0 6px ${({ theme }) => theme.primaryHover};
  }
`;

const JobTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.foreground};
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
`;

const JobDesc = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.65;
  margin: 0 0 1.25rem 0;
`;

const JobFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: 0.5rem;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const LangTagsRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const LangPill = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.foreground};
`;

const ApplyButton = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.body};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.75rem;
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

const EmptyStateCard = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border: 1px dashed ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 4rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
`;

const EmptyTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.foreground};
  margin: 0;
`;

const EmptyDesc = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.05rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.7;
  max-width: 640px;
  margin: 0;
`;

const CATEGORIES = [
  'All',
  'Recording',
  'Transcription',
  'Data Annotation',
  'Content Creation',
  'Robotic Video Data Collection',
] as const;

type TrackFilter = 'all' | 'candidate' | 'vendor';

interface CareersSectionProps {
  initialListings: JobListing[];
}

export default function CareersSection({ initialListings }: CareersSectionProps) {
  const { t } = useLanguage();

  const [activeTrack, setActiveTrack] = useState<TrackFilter>('all');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredListings = useMemo(() => {
    return initialListings.filter((listing) => {
      const matchTrack = activeTrack === 'all' || listing.track === activeTrack;
      const matchCat =
        activeCategory === 'All' || listing.category.toLowerCase() === activeCategory.toLowerCase();
      return matchTrack && matchCat;
    });
  }, [initialListings, activeTrack, activeCategory]);

  return (
    <SectionWrapper>
      <Container>
        {/* Interactive Filter Bar */}
        <FilterBar data-gsap="card">
          <FilterRow>
            <FilterLabel>Track:</FilterLabel>
            <FilterButton
              type="button"
              $active={activeTrack === 'all'}
              onClick={() => setActiveTrack('all')}
            >
              {t('careers_page.track_all')}
            </FilterButton>
            <FilterButton
              type="button"
              $active={activeTrack === 'candidate'}
              onClick={() => setActiveTrack('candidate')}
            >
              {t('careers_page.track_candidate')}
            </FilterButton>
            <FilterButton
              type="button"
              $active={activeTrack === 'vendor'}
              onClick={() => setActiveTrack('vendor')}
            >
              {t('careers_page.track_vendor')}
            </FilterButton>
          </FilterRow>

          <FilterRow>
            <FilterLabel>Category:</FilterLabel>
            {CATEGORIES.map((cat) => {
              const label =
                cat === 'All'
                  ? t('careers_page.cat_all')
                  : cat === 'Recording'
                    ? t('careers_page.cat_recording')
                    : cat === 'Transcription'
                      ? t('careers_page.cat_transcription')
                      : cat === 'Data Annotation'
                        ? t('careers_page.cat_annotation')
                        : cat === 'Content Creation'
                          ? t('careers_page.cat_content')
                          : t('careers_page.cat_robotic');

              return (
                <FilterButton
                  key={cat}
                  type="button"
                  $active={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                >
                  {label}
                </FilterButton>
              );
            })}
          </FilterRow>
        </FilterBar>

        {/* Listings Grid or Dedicated Empty State per spec §2.5 & §5.5 */}
        <ListingsGrid data-gsap="card">
          {filteredListings.length > 0 ? (
            filteredListings.map((listing) => (
              <JobCard key={listing.id}>
                <JobCardHeader>
                  <BadgesGroup>
                    <TrackBadge>
                      {listing.track === 'candidate'
                        ? t('careers_page.track_candidate')
                        : t('careers_page.track_vendor')}
                    </TrackBadge>
                    <CategoryBadge>{listing.category}</CategoryBadge>
                  </BadgesGroup>

                  <AvailableBadge>{t('careers_page.status_available')}</AvailableBadge>
                </JobCardHeader>

                <JobTitle>{listing.title}</JobTitle>
                <JobDesc>{listing.description}</JobDesc>

                <JobFooter>
                  <LangTagsRow>
                    {listing.languages &&
                      listing.languages.map((lang, idx) => <LangPill key={idx}>{lang}</LangPill>)}
                  </LangTagsRow>

                  {/* Apply Now button pre-filling the subject with listing.title per spec */}
                  <ApplyButton
                    href={`/customer-support?subject=${encodeURIComponent(listing.title)}`}
                  >
                    {t('careers_page.apply_button')}
                  </ApplyButton>
                </JobFooter>
              </JobCard>
            ))
          ) : (
            <EmptyStateCard>
              <EmptyTitle>{t('careers_page.empty_title')}</EmptyTitle>
              <EmptyDesc>{t('careers_page.empty_desc')}</EmptyDesc>
              <ApplyButton href="/customer-support?subject=Open%20Application">
                {t('careers_page.empty_button')}
              </ApplyButton>
            </EmptyStateCard>
          )}
        </ListingsGrid>
      </Container>
    </SectionWrapper>
  );
}
