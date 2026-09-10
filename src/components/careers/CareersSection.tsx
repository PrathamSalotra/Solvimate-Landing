'use client';

import React, { useMemo, useState } from 'react';
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
  TypeBadge,
  AvailableBadge,
  JobTitle,
  JobDesc,
  OpeningDetails,
  OpeningDetail,
  ApplyButton,
  EmptyStateCard,
  EmptyTitle,
  EmptyDesc,
} from './CareersSection.styles';

interface CareersSectionProps {
  initialListings: JobListing[];
}

type OpeningFilter = 'all' | JobListing['type'];

export default function CareersSection({ initialListings }: CareersSectionProps) {
  const [activeFilter, setActiveFilter] = useState<OpeningFilter>('all');
  const filteredListings = useMemo(
    () =>
      activeFilter === 'all'
        ? initialListings
        : initialListings.filter((listing) => listing.type === activeFilter),
    [activeFilter, initialListings]
  );

  return (
    <SectionWrapper>
      <Container>
        <FilterBar data-gsap="card">
          <FilterRow>
            <FilterLabel>Openings:</FilterLabel>
            <FilterButton type="button" $active={activeFilter === 'all'} onClick={() => setActiveFilter('all')}>
              All
            </FilterButton>
            <FilterButton type="button" $active={activeFilter === 'job'} onClick={() => setActiveFilter('job')}>
              Jobs
            </FilterButton>
            <FilterButton type="button" $active={activeFilter === 'internship'} onClick={() => setActiveFilter('internship')}>
              Internships
            </FilterButton>
          </FilterRow>
        </FilterBar>

        <ListingsGrid data-gsap="card">
          {filteredListings.length > 0 ? (
            filteredListings.map((listing) => (
              <JobCard key={listing.id}>
                <JobCardHeader>
                  <BadgesGroup>
                    <TypeBadge>{listing.type === 'internship' ? 'Internship' : 'Job Opening'}</TypeBadge>
                  </BadgesGroup>

                  <AvailableBadge>Open</AvailableBadge>
                </JobCardHeader>

                <JobTitle>{listing.title}</JobTitle>
                <JobDesc>{listing.description}</JobDesc>

                <OpeningDetails>
                  <OpeningDetail><span>Department</span><strong>{listing.department || 'General'}</strong></OpeningDetail>
                  <OpeningDetail><span>Mode</span><strong>{listing.mode}</strong></OpeningDetail>
                </OpeningDetails>

                <ApplyButton href={`/customer-support?subject=${encodeURIComponent(listing.title)}`}>
                  Apply Now
                </ApplyButton>
              </JobCard>
            ))
          ) : (
            <EmptyStateCard>
              <EmptyTitle>No open positions in this category</EmptyTitle>
              <EmptyDesc>Check back soon for new job and internship opportunities.</EmptyDesc>
              <ApplyButton href="/customer-support?subject=Open%20Application">Contact Us</ApplyButton>
            </EmptyStateCard>
          )}
        </ListingsGrid>
      </Container>
    </SectionWrapper>
  );
}
