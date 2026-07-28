'use client';

import Image from 'next/image';
import styled from 'styled-components';
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

export default function HomeClient({ listingsCount }: { listingsCount: number }) {
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
          <StyledTitle>Solvimate - Dubbing & Language Solutions</StyledTitle>
          <p>
            Welcome to Solvimate. Next.js 14+ App Router project initialized with TypeScript,
            styled-components (SSR ready), ESLint, Prettier, and Supabase integration.
          </p>
          <StatusBadge>Server Query Verified: {listingsCount} job listings loaded</StatusBadge>
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
            Deploy Now
          </a>
          <a
            className={styles.secondary}
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
