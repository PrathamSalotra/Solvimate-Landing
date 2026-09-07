'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import type { InternshipListing } from '@/app/internships/page';
import {
  SectionWrapper,
  Container,
  InternshipCard,
  CardHeader,
  OpenBadge,
  TitleText,
  DescText,
  DetailsBox,
  CardFooter,
  ActionsGroup,
  ViewDetailsButton,
  ApplyButton,
  EmptyStateCard,
  EmptyMessageText,
  EmptySubtext,
} from './InternshipsList.styles';

interface InternshipsListProps {
  initialInternships: InternshipListing[];
}

export default function InternshipsList({ initialInternships }: InternshipsListProps) {
  const { t } = useLanguage();
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleDetails = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <SectionWrapper>
      <Container data-gsap="card">
        {initialInternships.length > 0 ? (
          initialInternships.map((item) => (
            <InternshipCard key={item.id}>
              <CardHeader>
                <TitleText>{item.title}</TitleText>
                <OpenBadge>{t('internships_page.status_open')}</OpenBadge>
              </CardHeader>

              <DescText>{item.description}</DescText>

              {/* View Details affordance per spec §2.6 */}
              <DetailsBox $expanded={Boolean(expandedIds[item.id])}>
                <strong>Program Requirements & Mentorship Overview:</strong>
                <span>
                  This structured internship includes hands-on mentorship from senior Solvimate
                  linguists and AI engineers, real-world project deliverables, and flexible remote
                  scheduling.
                </span>
              </DetailsBox>

              <CardFooter>
                <ActionsGroup>
                  <ViewDetailsButton type="button" onClick={() => toggleDetails(item.id)}>
                    {expandedIds[item.id] ? 'Hide Details' : t('internships_page.view_details')}
                  </ViewDetailsButton>

                  <ApplyButton href={`/customer-support?subject=${encodeURIComponent(item.title)}`}>
                    {t('internships_page.apply_button')}
                  </ApplyButton>
                </ActionsGroup>
              </CardFooter>
            </InternshipCard>
          ))
        ) : (
          /* MUST match spec exactly when zero rows: "No open internships at the moment. Check back soon!" */
          <EmptyStateCard>
            <EmptyMessageText>{t('internships_page.empty_message')}</EmptyMessageText>
            <EmptySubtext>
              Want to get notified about future openings? Explore our pathways or submit a general
              inquiry.
            </EmptySubtext>
            <ApplyButton href="/programs">View Programs</ApplyButton>
          </EmptyStateCard>
        )}
      </Container>
    </SectionWrapper>
  );
}
