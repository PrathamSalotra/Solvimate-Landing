'use client';

import React from 'react';
import styled from 'styled-components';
import { useLanguage, Locale } from '@/context/LanguageContext';

const SwitcherWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  position: relative;
`;

const StyledSelect = styled.select`
  appearance: none;
  background: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.foreground};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 9999px;
  padding: 0.5rem 2.25rem 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover,
  &:focus-visible {
    border-color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.surface};
  }

  option {
    background: ${({ theme }) => theme.surface};
    color: ${({ theme }) => theme.foreground};
  }
`;

const ArrowIcon = styled.svg`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  pointer-events: none;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
`;

const LANGUAGE_OPTIONS: { code: Locale; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'hi', label: 'हिन्दी' },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <SwitcherWrapper>
      <StyledSelect
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        aria-label="Select language"
        title="Select language"
      >
        {LANGUAGE_OPTIONS.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </StyledSelect>
      <ArrowIcon viewBox="0 0 24 24" aria-hidden="true">
        <polyline points="6 9 12 15 18 9" />
      </ArrowIcon>
    </SwitcherWrapper>
  );
}
