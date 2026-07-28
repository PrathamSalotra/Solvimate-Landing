import type { Metadata } from 'next';
import { supabaseServer } from '@/lib/supabase/server';
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
    const { data, error } = await supabaseServer
      .from('news_articles')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('[News Page] Supabase error fetching news_articles:', error.message);
      return [];
    }

    return (data as NewsArticle[]) || [];
  } catch (err) {
    console.error('[News Page] Unexpected error fetching news_articles:', err);
    return [];
  }
}

export default async function NewsPage() {
  const articles = await getPublishedNews();

  return <NewsClient initialArticles={articles} />;
}
