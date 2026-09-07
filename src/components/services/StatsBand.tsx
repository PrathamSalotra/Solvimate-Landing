'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  StatsWrapper,
  StatsContainer,
  HeaderGroup,
  TagText,
  SectionTitle,
  GridBox,
  StatCard,
  NumberValue,
  StatLabel,
} from './StatsBand.styles';

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

          const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
          ).matches;
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
