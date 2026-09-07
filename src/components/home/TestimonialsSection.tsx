'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  SectionWrapper,
  ContentContainer,
  HeaderBlock,
  BadgePill,
  HeadingText,
  SubtitleText,
  GridContainer,
  TestimonialCard,
  QuoteTop,
  StarsRow,
  QuoteText,
  AttributionFooter,
  AvatarCircle,
  AuthorDetails,
  AuthorName,
  AuthorRole,
} from './TestimonialsSection.styles';

export default function TestimonialsSection() {
  const { t } = useLanguage();

  const testimonials = [
    {
      authorKey: 'testi1Author',
      roleKey: 'testi1Role',
      quoteKey: 'testi1Quote',
      initials: 'CW',
    },
    {
      authorKey: 'testi2Author',
      roleKey: 'testi2Role',
      quoteKey: 'testi2Quote',
      initials: 'EH',
    },
    {
      authorKey: 'testi3Author',
      roleKey: 'testi3Role',
      quoteKey: 'testi3Quote',
      initials: 'RF',
    },
  ];

  return (
    <SectionWrapper>
      <ContentContainer>
        <HeaderBlock data-gsap="heading">
          <BadgePill>{t('home.testimonialsBadge')}</BadgePill>
          <HeadingText>{t('home.testimonialsHeading')}</HeadingText>
        </HeaderBlock>

        <GridContainer>
          {testimonials.map((item) => (
            <TestimonialCard key={item.authorKey} data-gsap="card">
              <QuoteTop>
                <StarsRow aria-label="5 out of 5 stars">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </StarsRow>
                <QuoteText>&ldquo;{t(`home.${item.quoteKey}`)}&rdquo;</QuoteText>
              </QuoteTop>
              <AttributionFooter>
                <AvatarCircle aria-hidden="true">{item.initials}</AvatarCircle>
                <AuthorDetails>
                  <AuthorName>{t(`home.${item.authorKey}`)}</AuthorName>
                  <AuthorRole>{t(`home.${item.roleKey}`)}</AuthorRole>
                </AuthorDetails>
              </AttributionFooter>
            </TestimonialCard>
          ))}
        </GridContainer>
      </ContentContainer>
    </SectionWrapper>
  );
}
