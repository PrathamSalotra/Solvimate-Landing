'use client';

import React from 'react';
import NewsHero from '@/components/news/NewsHero';
import NewsList from '@/components/news/NewsList';
import { useGSAPScrollReveal } from '@/hooks/useGSAPScrollReveal';
import type { NewsArticle } from './page';
import { MainWrapper } from './NewsClient.styles';

interface NewsClientProps {
  initialArticles: NewsArticle[];
}

export default function NewsClient({ initialArticles }: NewsClientProps) {
  const containerRef = useGSAPScrollReveal<HTMLElement>();

  return (
    <MainWrapper ref={containerRef}>
      <NewsHero />
      <NewsList initialArticles={initialArticles} />
    </MainWrapper>
  );
}
