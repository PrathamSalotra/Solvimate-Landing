'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import type { NewsArticle } from '@/app/news/page';
import {
  SectionWrapper,
  Container,
  ArticleCard,
  CardHeader,
  DateText,
  SlugBadge,
  TitleText,
  BodyText,
  EmptyStateCard,
  EmptyMessageText,
} from './NewsList.styles';

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
            <EmptyMessageText>{t('news_page.empty_message')}</EmptyMessageText>
          </EmptyStateCard>
        )}
      </Container>
    </SectionWrapper>
  );
}
