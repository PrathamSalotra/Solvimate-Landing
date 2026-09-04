'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useLanguage, Locale } from '@/context/LanguageContext';

const SwitcherWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  position: relative;
`;

const TriggerButton = styled.button<{ $isOpen: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 13px;
  font-weight: ${({ $isOpen }) => ($isOpen ? '600' : '500')};
  letter-spacing: 0.02em;
  color: ${({ theme, $isOpen }) =>
    $isOpen ? (theme.isDark ? '#BEFE72' : theme.accentText) : theme.textSecondary};
  background: transparent;
  border: none;
  padding: 0.5rem 0;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
  transition: color 0.2s ease;
  outline: none;

  &:hover {
    color: ${({ theme }) => (theme.isDark ? '#BEFE72' : theme.foreground)};
  }

  svg {
    width: 10px;
    height: 10px;
    stroke: currentColor;
    stroke-width: 2.5;
    fill: none;
    transition: transform 0.2s ease;
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  }
`;

const MobileBackdrop = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    z-index: 99;
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
    transition:
      opacity 180ms ease,
      visibility 180ms;
    pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  }
`;

const DropdownMenu = styled.ul<{ $isOpen: boolean }>`
  list-style: none;
  margin: 0;
  padding: 0.5rem;
  background: ${({ theme }) => theme.surface};
  border: 1px solid
    ${({ theme }) => (theme.isDark ? 'rgba(190, 254, 114, 0.3)' : 'rgba(190, 254, 114, 0.35)')};
  border-radius: 16px;
  box-shadow: ${({ theme }) =>
    theme.isDark
      ? '0 16px 36px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(190, 254, 114, 0.15)'
      : '0 12px 32px rgba(190, 254, 114, 0.15), 0 4px 16px rgba(0, 0, 0, 0.08)'};
  z-index: 100;

  /* Desktop layout: compact popover anchored below trigger */
  @media (min-width: 769px) {
    position: absolute;
    top: calc(100% + 14px);
    right: 0;
    min-width: 170px;
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
    transform: ${({ $isOpen }) =>
      $isOpen ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(-8px)'};
    transform-origin: top right;
    transition:
      opacity 200ms ease,
      transform 200ms cubic-bezier(0.16, 1, 0.3, 1),
      visibility 200ms;
    pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};

    &::before {
      content: '';
      position: absolute;
      top: -6px;
      right: 18px;
      transform: rotate(45deg);
      width: 10px;
      height: 10px;
      background: ${({ theme }) => theme.surface};
      border-top: 1px solid
        ${({ theme }) => (theme.isDark ? 'rgba(190, 254, 114, 0.3)' : 'rgba(190, 254, 114, 0.35)')};
      border-left: 1px solid
        ${({ theme }) => (theme.isDark ? 'rgba(190, 254, 114, 0.3)' : 'rgba(190, 254, 114, 0.35)')};
    }
  }

  /* Mobile layout: bottom-anchored full-width panel sheet */
  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    max-width: 100vw;
    border-radius: 20px 20px 0 0;
    padding: 1.25rem 1.25rem 2rem;
    box-sizing: border-box;
    background: ${({ theme }) => (theme.isDark ? '#001E2B' : theme.surface)};
    border-top: 1px solid
      ${({ theme }) => (theme.isDark ? 'rgba(190, 254, 114, 0.3)' : 'rgba(190, 254, 114, 0.35)')};
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
    transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0%)' : 'translateY(100%)')};
    transition:
      transform 200ms cubic-bezier(0.16, 1, 0.3, 1),
      opacity 180ms ease,
      visibility 180ms;
    pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none !important;
  }
`;

const MobileHeader = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 0.85rem;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid ${({ theme }) => theme.border};

    span {
      font-family: ${({ theme }) => theme.fonts.display};
      font-size: 1rem;
      font-weight: 600;
      color: ${({ theme }) => theme.foreground};
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textSecondary};
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;

  &:hover {
    color: ${({ theme }) => theme.foreground};
  }
`;

const OptionItem = styled.li`
  margin: 0;
  padding: 0;
`;

const OptionButton = styled.button<{ $isSelected: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 0.85rem;
  border: 1px solid
    ${({ theme, $isSelected }) =>
      $isSelected
        ? theme.isDark
          ? 'rgba(190, 254, 114, 0.35)'
          : 'rgba(190, 254, 114, 0.3)'
        : 'transparent'};
  background: ${({ theme, $isSelected }) =>
    $isSelected
      ? theme.isDark
        ? 'rgba(190, 254, 114, 0.15)'
        : 'rgba(190, 254, 114, 0.12)'
      : 'transparent'};
  color: ${({ theme, $isSelected }) =>
    $isSelected ? (theme.isDark ? '#BEFE72' : theme.accentText) : theme.foreground};
  font-size: 0.9rem;
  font-weight: ${({ $isSelected }) => ($isSelected ? 600 : 500)};
  border-radius: 12px;
  cursor: pointer;
  text-align: left;
  transition:
    background-color 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease;

  &:hover,
  &:focus-visible {
    background: ${({ theme, $isSelected }) =>
      $isSelected
        ? theme.isDark
          ? 'rgba(190, 254, 114, 0.22)'
          : 'rgba(190, 254, 114, 0.18)'
        : theme.isDark
          ? 'rgba(190, 254, 114, 0.08)'
          : 'rgba(190, 254, 114, 0.1)'};
    color: ${({ theme, $isSelected }) =>
      $isSelected || theme.isDark ? '#BEFE72' : theme.foreground};
    outline: none;
  }
`;

const CheckIcon = styled.svg`
  width: 16px;
  height: 16px;
  stroke: ${({ theme }) => (theme.isDark ? '#BEFE72' : theme.accentText)};
  stroke-width: 2.5;
  fill: none;
`;

const LANGUAGE_OPTIONS: { code: Locale; label: string; shortCode: string }[] = [
  { code: 'en', label: 'English', shortCode: 'EN' },
  { code: 'hi', label: 'हिंदी', shortCode: 'HI' },
  { code: 'es', label: 'Español', shortCode: 'ES' },
  { code: 'fr', label: 'Français', shortCode: 'FR' },
  { code: 'de', label: 'Deutsch', shortCode: 'DE' },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const currentShortCode = LANGUAGE_OPTIONS.find((lang) => lang.code === locale)?.shortCode || 'EN';

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  const selectLanguage = (code: Locale) => {
    setLocale(code);
    closeDropdown();
    triggerRef.current?.focus();
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeDropdown]);

  // Keyboard navigation & accessibility
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen) {
      closeDropdown();
      triggerRef.current?.focus();
    } else if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && isOpen) {
      event.preventDefault();
      const currentIndex = LANGUAGE_OPTIONS.findIndex((lang) => lang.code === locale);
      let nextIndex = currentIndex;
      if (event.key === 'ArrowDown') {
        nextIndex = (currentIndex + 1) % LANGUAGE_OPTIONS.length;
      } else {
        nextIndex = (currentIndex - 1 + LANGUAGE_OPTIONS.length) % LANGUAGE_OPTIONS.length;
      }
      optionRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <SwitcherWrapper ref={wrapperRef} onKeyDown={handleKeyDown}>
      <TriggerButton
        ref={triggerRef}
        type="button"
        $isOpen={isOpen}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
        title="Select language"
      >
        <span>{currentShortCode}</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </TriggerButton>

      <MobileBackdrop $isOpen={isOpen} onClick={closeDropdown} aria-hidden="true" />

      <DropdownMenu $isOpen={isOpen} role="listbox" aria-label="Languages">
        <MobileHeader>
          <span>Select Language</span>
          <CloseButton type="button" onClick={closeDropdown} aria-label="Close language menu">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </CloseButton>
        </MobileHeader>

        {LANGUAGE_OPTIONS.map((lang, index) => {
          const isSelected = locale === lang.code;
          return (
            <OptionItem key={lang.code}>
              <OptionButton
                ref={(el) => {
                  optionRefs.current[index] = el;
                }}
                type="button"
                role="option"
                aria-selected={isSelected}
                $isSelected={isSelected}
                onClick={() => selectLanguage(lang.code)}
              >
                <span>{lang.label}</span>
                {isSelected && (
                  <CheckIcon viewBox="0 0 24 24" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </CheckIcon>
                )}
              </OptionButton>
            </OptionItem>
          );
        })}
      </DropdownMenu>
    </SwitcherWrapper>
  );
}
