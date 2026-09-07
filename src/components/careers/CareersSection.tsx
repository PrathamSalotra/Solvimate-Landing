'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import type { JobListing } from '@/app/careers/page';
import {
  SectionWrapper,
  Container,
  FilterBar,
  FilterRow,
  FilterLabel,
  FilterButton,
  ListingsGrid,
  JobCard,
  JobCardHeader,
  BadgesGroup,
  TrackBadge,
  CategoryBadge,
  AvailableBadge,
  JobTitle,
  JobDesc,
  JobFooter,
  LangTagsRow,
  LangPill,
  ApplyButton,
  EmptyStateCard,
  EmptyTitle,
  EmptyDesc,
} from './CareersSection.styles';

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
