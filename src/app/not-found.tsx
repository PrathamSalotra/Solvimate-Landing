'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';

const NotFoundWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 6rem 1.5rem;
  max-width: 800px;
  margin: 0 auto;
  min-height: calc(100vh - 280px);
`;

const BigNumber = styled.h1`
  font-size: 7rem;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 1rem;

  @media (max-width: 640px) {
    font-size: 5rem;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.foreground};
  margin: 0 0 1rem;

  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.textSecondary};
  max-width: 500px;
  margin: 0 0 2rem;
  line-height: 1.6;
`;

const BackHomeButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.75rem;
  border-radius: 9999px;
  background: ${({ theme }) => theme.primary};
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
  }
`;

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <NotFoundWrapper>
      <BigNumber>404</BigNumber>
      <Title>{t('notFound.title')}</Title>
      <Description>{t('notFound.description')}</Description>
      <BackHomeButton href="/">{t('notFound.backHome')}</BackHomeButton>
    </NotFoundWrapper>
  );
}
