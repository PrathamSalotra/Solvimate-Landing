'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  SectionWrapper,
  DecorativeGlow,
  ContentContainer,
  QuoteMark,
  StatementText,
  DividerLine,
} from './BriefNoteSection.styles';

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
