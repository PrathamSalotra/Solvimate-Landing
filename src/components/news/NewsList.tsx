'use client';

import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';
import type { NewsArticle } from '@/app/news/page';

const SectionWrapper = styled.section`
  width: 100%;
  padding: 2rem 1.5rem 6.5rem;
  background: ${({ theme }) => theme.background};

  @media (max-width: 768px) {
    padding: 1.5rem 1rem 5rem;
  }
`;

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ArticleCard = styled.article`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 20px;
  padding: 2.5rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(16, 185, 129, 0.4);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.06);
  }

  @media (max-width: 640px) {
    padding: 1.75rem 1.5rem;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const DateText = styled.time`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const SlugBadge = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background: rgba(16, 185, 129, 0.1);
  color: ${({ theme }) => theme.textSecondary};
  border: 1px solid ${({ theme }) => theme.border};
`;

const TitleText = styled.h2`
  font-size: 1.65rem;
  font-weight: 800;
  color: ${({ theme }) => theme.foreground};
  margin: 0;
  line-height: 1.35;
`;

const BodyText = styled.p`
  font-size: 1.05rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.75;
  margin: 0;
  white-space: pre-line;
`;

const EmptyStateCard = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border: 1px dashed ${({ theme }) => theme.border};
  border-radius: 24px;
  padding: 4.5rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
`;

const EmptyMessageText = styled.h3`
  font-size: clamp(1.35rem, 2.5vw, 1.75rem);
  font-weight: 700;
  color: ${({ theme }) => theme.foreground};
  margin: 0;
`;

interface NewsListProps {
  initialArticles: NewsArticle[];
}

export default function NewsList({ initialArticles }: NewsListProps) {
  const { t } = useLanguage();

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return '';
    }
  };

  return (
    <SectionWrapper>
      <Container data-gsap="card">
        {initialArticles.length > 0 ? (
          initialArticles.map((article) => (
            <ArticleCard key={article.id}>
              <CardHeader>
                <DateText dateTime={article.published_at || article.created_at}>
                  {formatDate(article.published_at || article.created_at)}
                </DateText>
                {article.slug && <SlugBadge>#{article.slug}</SlugBadge>}
              </CardHeader>

              <TitleText>{article.title}</TitleText>
              <BodyText>{article.body}</BodyText>
            </ArticleCard>
          ))
        ) : (
          /* MUST match spec exactly when zero rows: "No news articles yet." */
          <EmptyStateCard>
            <EmptyMessageText>
              {t('news_page.empty_message')}
            </EmptyMessageText>
          </EmptyStateCard>
        )}
      </Container>
    </SectionWrapper>
  );
}
