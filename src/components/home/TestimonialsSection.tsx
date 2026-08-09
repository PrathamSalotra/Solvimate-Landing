'use client';

import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';

const SectionWrapper = styled.section`
  width: 100%;
  padding: 6rem 1.5rem 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.foreground};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 4rem 1rem 5rem;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.5rem;
  position: relative;
  z-index: 1;
`;

const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
`;

const BadgePill = styled.span`
  display: inline-block;
  padding: 0.4rem 1.1rem;
  border-radius: 9999px;
  background: ${({ theme }) => theme.accentBadgeBg};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.accentText};
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const HeadingText = styled.h2`
  font-size: clamp(2.25rem, 4vw, 3.25rem);
  font-weight: 500;
  letter-spacing: -0.01em;
  word-spacing: 0.08em;
  color: ${({ theme }) => theme.foreground};
  margin: 0;
  line-height: 1.15;

  @media (max-width: 640px) {
    font-size: 2rem;
  }
`;

const SubtitleText = styled.p`
  font-size: clamp(1.125rem, 2vw, 1.35rem);
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
  max-width: 680px;
  line-height: 1.6;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TestimonialCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  padding: 2.25rem 2rem;
  border-radius: ${({ theme }) => theme.radius.card};
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-left: 4px solid ${({ theme }) => theme.primary};
  box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.25);
  transition:
    transform ${({ theme }) => theme.motion.interaction} ease,
    box-shadow ${({ theme }) => theme.motion.interaction} ease;
  min-height: 100%;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 25px 45px -12px rgba(0, 0, 0, 0.35);
  }
`;

const QuoteTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const StarsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${({ theme }) => theme.accentText};
  font-size: 1.125rem;
  letter-spacing: 0.1em;
`;

const QuoteText = styled.p`
  font-size: 1.0625rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
  font-style: normal;
`;

const AttributionFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const AvatarCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.colors.ink};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.125rem;
  flex-shrink: 0;
  border: 2px solid ${({ theme }) => theme.border};
`;

const AuthorDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const AuthorName = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  word-spacing: 0.04em;
  color: ${({ theme }) => theme.foreground};
  margin: 0;
`;

const AuthorRole = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.accentText};
  font-weight: 600;
`;

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
