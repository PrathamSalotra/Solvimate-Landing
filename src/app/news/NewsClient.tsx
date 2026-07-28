'use client';

import React from 'react';
import styled from 'styled-components';
import NewsHero from '@/components/news/NewsHero';
import NewsList from '@/components/news/NewsList';
import { useGSAPScrollReveal } from '@/hooks/useGSAPScrollReveal';
import type { NewsArticle } from './page';

const MainWrapper = styled.main`
  width: 100%;
  overflow-x: hidden;
`;

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
