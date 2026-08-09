'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import type { InternshipListing } from '@/app/internships/page';

const SectionWrapper = styled.section`
  width: 100%;
  padding: 2rem 1.5rem 6.5rem;
  background: ${({ theme }) => theme.background};

  @media (max-width: 768px) {
    padding: 1.5rem 1rem 5rem;
  }
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InternshipCard = styled.article`
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

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const OpenBadge = styled.span`
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
  text-transform: uppercase;
  letter-spacing: 0.05em;

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

const TitleText = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.5rem;
  font-weight: 500;
  word-spacing: 0.06em;
  color: ${({ theme }) => theme.foreground};
  margin: 0;
  line-height: 1.3;
`;

const DescText = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.65;
  margin: 0;
`;

const DetailsBox = styled.div<{ $expanded: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
  display: ${({ $expanded }) => ($expanded ? 'flex' : 'none')};
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.25rem;
  border-radius: 12px;
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  font-size: 0.95rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.6;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: 0.5rem;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const ActionsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const ViewDetailsButton = styled.button`
  font-family: ${({ theme }) => theme.fonts.body};
  padding: 0.7rem 1.4rem;
  border-radius: 9999px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.foreground};
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primaryText};
  }
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
  padding: 4.5rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const EmptyMessageText = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.35rem, 2.5vw, 1.75rem);
  font-weight: 500;
  word-spacing: 0.06em;
  color: ${({ theme }) => theme.foreground};
  margin: 0;
  max-width: 600px;
  line-height: 1.4;
`;

const EmptySubtext = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
`;

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
