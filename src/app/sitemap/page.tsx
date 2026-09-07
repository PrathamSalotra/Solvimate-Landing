'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { PageContainer, SitemapList } from './page.styles';

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
