'use client';

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';

const StatsWrapper = styled.section`
  width: 100%;
  padding: 5.5rem 1.5rem;
  background: ${({ theme }) => theme.background};
  position: relative;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const StatsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 3.5rem;
`;

const HeaderGroup = styled.div`
  max-width: 650px;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  align-items: center;
`;

const TagText = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  display: inline-block;
  font-size: 0.8125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.85rem, 3.5vw, 2.75rem);
  font-weight: 800;
  color: ${({ theme }) => theme.foreground};
  line-height: 1.25;
  margin: 0;
`;

const GridBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.primaryHover};
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.08);
  }
`;

const NumberValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: clamp(2.5rem, 4.5vw, 3.75rem);
  font-weight: 900;
  color: ${({ theme }) => theme.primary};
  line-height: 1.05;
  letter-spacing: -0.02em;
`;

const StatLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.05rem;
  font-weight: 700;
  color: ${({ theme }) => theme.foreground};
`;

interface CounterProps {
  end: number;
  suffix?: string;
  format?: boolean;
}

function AnimatedCounter({ end, suffix = '', format = true }: CounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;

          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (prefersReducedMotion) {
            setCount(end);
            observer.disconnect();
            return;
          }

          const duration = 2000;
          let startTime: number | null = null;

          const animateStep = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const nextValue = Math.floor(easeOut * end);
            setCount(nextValue);

            if (progress < 1) {
              requestAnimationFrame(animateStep);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(animateStep);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setCount(end);
      }
    };
    mediaQuery.addEventListener?.('change', handleMotionChange);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener?.('change', handleMotionChange);
    };
  }, [end]);

  const displayValue = format ? count.toLocaleString() : count.toString();

  return (
    <NumberValue ref={elementRef}>
      {displayValue}
      {suffix}
    </NumberValue>
  );
}

export default function StatsBand() {
  const { t } = useLanguage();

  return (
    <StatsWrapper>
      <StatsContainer>
        <HeaderGroup data-gsap="heading">
          <TagText>{t('services.stats_tag')}</TagText>
          <SectionTitle>{t('services.stats_heading')}</SectionTitle>
        </HeaderGroup>

        <GridBox>
          <StatCard data-gsap="card">
            <AnimatedCounter end={50} suffix="+" />
            <StatLabel>{t('services.stat_languages_label')}</StatLabel>
          </StatCard>

          <StatCard data-gsap="card">
            <AnimatedCounter end={200} suffix="+" />
            <StatLabel>{t('services.stat_clients_label')}</StatLabel>
          </StatCard>

          <StatCard data-gsap="card">
            <AnimatedCounter end={1000000} suffix="+" />
            <StatLabel>{t('services.stat_transcriptions_label')}</StatLabel>
          </StatCard>
        </GridBox>
      </StatsContainer>
    </StatsWrapper>
  );
}
