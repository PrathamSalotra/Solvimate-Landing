'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const PageContainer = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 1.5rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.foreground};
  }

  p {
    color: ${({ theme }) => theme.textSecondary};
    font-size: 1.125rem;
    max-width: 700px;
    margin-bottom: 2rem;
  }
`;

const SitemapList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  a {
    color: ${({ theme }) => theme.primary};
    font-size: 1.0625rem;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function SitemapPage() {
  const { t } = useLanguage();

  return (
    <PageContainer>
      <h1>{t('footer.sitemap')} - Solvimate</h1>
      <p>An overview of all pages available on the Solvimate platform.</p>
      <SitemapList>
        <li>
          <Link href="/">{t('nav.home')}</Link>
        </li>
        <li>
          <Link href="/about">{t('nav.about')}</Link>
        </li>
        <li>
          <Link href="/services">{t('nav.services')}</Link>
        </li>
        <li>
          <Link href="/careers">{t('nav.careers')}</Link>
        </li>
        <li>
          <Link href="/contact">{t('nav.contact')}</Link>
        </li>
        <li>
          <Link href="/privacy">{t('footer.privacyPolicy')}</Link>
        </li>
        <li>
          <Link href="/terms">{t('footer.termsOfService')}</Link>
        </li>
      </SitemapList>
    </PageContainer>
  );
}
