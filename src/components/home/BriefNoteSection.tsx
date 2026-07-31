'use client';

import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';

const SectionWrapper = styled.section`
  width: 100%;
  padding: 6rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.foreground};
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 4rem 1.25rem;
  }
`;

const DecorativeGlow = styled.div`
  position: absolute;
  top: -50%;
  left: 50%;
  width: 800px;
  height: 800px;
  transform: translateX(-50%);
  background: radial-gradient(circle at center, rgba(190, 254, 114, 0.15) 0%, transparent 70%);
  pointer-events: none;
`;

const ContentContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  position: relative;
  z-index: 1;
`;

const QuoteMark = styled.div`
  font-size: 3rem;
  line-height: 1;
  color: ${({ theme }) => theme.primaryText};
  opacity: 0.45;
  font-family: serif;
  user-select: none;
`;

const StatementText = styled.h2`
  font-size: clamp(1.875rem, 4vw, 2.75rem);
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: -0.015em;
  color: ${({ theme }) => theme.foreground};
  margin: 0;
  max-width: 900px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
`;

const DividerLine = styled.div`
  width: 60px;
  height: 4px;
  border-radius: 2px;
  background: ${({ theme }) => theme.primary};
  margin-top: 0.5rem;
`;

export default function BriefNoteSection() {
  const { t } = useLanguage();

  return (
    <SectionWrapper>
      <DecorativeGlow aria-hidden="true" />
      <ContentContainer data-gsap="heading">
        <QuoteMark aria-hidden="true">&ldquo;</QuoteMark>
        <StatementText>{t('home.briefNoteStatement')}</StatementText>
        <DividerLine />
      </ContentContainer>
    </SectionWrapper>
  );
}
