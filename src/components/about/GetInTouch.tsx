'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  SectionWrapper,
  SectionContainer,
  HeaderGroup,
  TagText,
  SectionTitle,
  SectionBody,
  ContactGrid,
  ContactCard,
  ContactLabel,
  ContactValueLink,
  ContactValueText,
  CTAButtonsRow,
  PrimaryButton,
  SecondaryButton,
} from './GetInTouch.styles';

export default function GetInTouch() {
  const { t } = useLanguage();

  return (
    <SectionWrapper>
      <SectionContainer>
        <HeaderGroup data-gsap="heading">
          <TagText>{t('about.contactTag')}</TagText>
          <SectionTitle>{t('about.contactHeading')}</SectionTitle>
          <SectionBody>{t('about.contactBody')}</SectionBody>
        </HeaderGroup>

        <ContactGrid>
          <ContactCard data-gsap="card">
            <ContactLabel>{t('about.emailLabel')}</ContactLabel>
            <ContactValueLink href="mailto:sales@solvimate.com">
              sales@solvimate.com
            </ContactValueLink>
          </ContactCard>

          <ContactCard data-gsap="card">
            <ContactLabel>{t('about.locationLabel')}</ContactLabel>
            <ContactValueText>{t('about.locationVal')}</ContactValueText>
          </ContactCard>
        </ContactGrid>

        <CTAButtonsRow>
          <PrimaryButton href="/contact">{t('about.contactCTA1')}</PrimaryButton>
          <SecondaryButton href="/contact">{t('about.contactCTA2')}</SecondaryButton>
        </CTAButtonsRow>
      </SectionContainer>
    </SectionWrapper>
  );
}
