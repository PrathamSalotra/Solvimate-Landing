import type { Metadata } from 'next';
import { listNews } from '@/services/cms.service';
import NewsClient from './NewsClient';

export const revalidate = 60; // Short ISR revalidation window per spec §5.5

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  body: string;
  is_published: boolean;
  published_at?: string;
  created_at?: string;
}

export const metadata: Metadata = {
  title: 'News & Insights - Solvimate | Multilingual AI & Expansion Updates',
  description:
    'Stay updated with the latest announcements, breakthroughs in multilingual AI, and global expansion stories from Solvimate.',
  openGraph: {
    title: 'News & Insights - Solvimate | Multilingual AI & Expansion Updates',
    description:
      'Stay updated with the latest announcements, breakthroughs in multilingual AI, and global expansion stories from Solvimate.',
    type: 'website',
  },
};

async function getPublishedNews(): Promise<NewsArticle[]> {
  try {
    const news = await listNews();

    return news
      .filter((article) => article.isPublished)
      .map((article) => ({
        id: article.id,
        title: article.title,
        slug: article.slug,
        body: article.excerpt || article.content,
        is_published: article.isPublished,
        published_at: article.publishedAt,
        created_at: article.createdAt,
      }));
  } catch (err) {
    console.error('[News Page] Error fetching news:', err);
    return [];
  }
}

export default async function NewsPage() {
  const articles = await getPublishedNews();

  return <NewsClient initialArticles={articles} />;
}
