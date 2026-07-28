'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';
import styles from './page.module.css';

const StyledTitle = styled.h1`
  font-size: 2.5rem;
  background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #10b981;
  border-radius: 9999px;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const TestInputWrapper = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  max-width: 400px;
`;

const TestInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.foreground};
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

export default function HomeClient({ listingsCount }: { listingsCount: number }) {
  const { t } = useLanguage();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className={styles.intro}>
          <StyledTitle>{t('home.title')}</StyledTitle>
          <p>{t('home.welcome')}</p>
          <StatusBadge>{t('home.serverQuery', { count: listingsCount })}</StatusBadge>
          <TestInputWrapper>
            <label htmlFor="test-input" style={{ fontSize: '0.75rem', opacity: 0.8 }}>
              {t('home.inputLabel')}
            </label>
            <TestInput id="test-input" type="text" placeholder={t('home.inputPlaceholder')} />
          </TestInputWrapper>
        </div>
        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            {t('home.deployNow')}
          </a>
          <a
            className={styles.secondary}
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('home.documentation')}
          </a>
        </div>
      </main>
    </div>
  );
}
