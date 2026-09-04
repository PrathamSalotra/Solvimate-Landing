'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import { useLanguage, Locale } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeToggle from '@/components/ThemeToggle';

const Header = styled.header<{ $isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 72px;
  background: ${({ theme, $isScrolled }) =>
    $isScrolled ? `${theme.surface}f2` : `${theme.background}d9`};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid
    ${({ theme, $isScrolled }) => ($isScrolled ? theme.border : 'transparent')};
  z-index: 50;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: ${({ $isScrolled }) => ($isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.15)' : 'none')};
`;

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 0 1rem;
  }
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  text-decoration: none;
  flex-shrink: 0;
`;

const LogoMarkImage = styled.img`
  width: 36px;
  height: 36px;
  object-fit: contain;
  border-radius: 8px;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    width: 32px;
    height: 32px;
  }
`;

const LogoWordmark = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 600;
  font-size: 1.35rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.foreground};
  line-height: 1;

  @media (max-width: 480px) {
    display: none;
  }
`;

const DesktopNavLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: 1.75rem;
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const NavLinkItem = styled.li`
  margin: 0;
  padding: 0;
`;

const StyledNavLink = styled(Link)<{ $active?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 13px;
  font-weight: ${({ $active }) => ($active ? '600' : '500')};
  letter-spacing: 0.02em;
  color: ${({ theme, $active }) => ($active ? theme.primaryText : theme.textSecondary)};
  text-decoration: none;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.foreground};
  }
`;

const ActiveIndicator = styled.div<{ $left: number; $width: number; $ready: boolean }>`
  position: absolute;
  bottom: -4px;
  left: 0;
  height: 2px;
  width: ${({ $width }) => $width}px;
  transform: translateX(${({ $left }) => $left}px);
  background: ${({ theme }) => theme.primary};
  border-radius: 2px;
  box-shadow: 0 0 8px ${({ theme }) => theme.primary};
  pointer-events: none;
  opacity: ${({ $ready, $width }) => ($ready && $width > 0 ? 1 : 0)};
  transition: ${({ $ready }) =>
    $ready
      ? 'transform 250ms cubic-bezier(0.16, 1, 0.3, 1), width 250ms cubic-bezier(0.16, 1, 0.3, 1), opacity 150ms ease'
      : 'none'};

  @media (prefers-reduced-motion: reduce) {
    transition: none !important;
  }
`;

const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 1024px) {
    gap: 0.5rem;
  }
`;

const DesktopOnlyWrapper = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const CTAButton = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.body};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  box-sizing: border-box;
  padding: 0 1.25rem;
  border-radius: 9999px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.colors.ink};
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  flex-shrink: 0;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
    transform: translateY(-1px);
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  width: 38px;
  height: 38px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.foreground};
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    display: inline-flex;
  }

  svg {
    width: 20px;
    height: 20px;
    stroke: currentColor;
    stroke-width: 2;
    fill: none;
  }
`;

const MoreContainer = styled.li`
  position: relative;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
`;

const MoreTriggerButton = styled.button<{ $active?: boolean; $isOpen?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 13px;
  font-weight: ${({ $active, $isOpen }) => ($active || $isOpen ? '600' : '500')};
  letter-spacing: 0.02em;
  color: ${({ theme, $active, $isOpen }) =>
    $active || $isOpen ? theme.primaryText : theme.textSecondary};
  background: transparent;
  border: none;
  padding: 0.5rem 0;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.foreground};
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

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 14px);
  left: 50%;
  transform: translateX(-50%) ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(-8px)')};
  width: 290px;
  background: ${({ theme }) => theme.surface};
  border: 1px solid
    ${({ theme }) => (theme.isDark ? 'rgba(55, 251, 137, 0.25)' : theme.border)};
  border-radius: 16px;
  padding: 0.75rem;
  box-shadow: ${({ theme }) =>
    theme.isDark
      ? '0 16px 36px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(55, 251, 137, 0.12)'
      : '0 12px 32px rgba(0, 0, 0, 0.12)'};
  z-index: 100;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition:
    transform 200ms cubic-bezier(0.16, 1, 0.3, 1),
    opacity 200ms ease,
    visibility 200ms;
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};

  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 10px;
    height: 10px;
    background: ${({ theme }) => theme.surface};
    border-top: 1px solid
      ${({ theme }) => (theme.isDark ? 'rgba(55, 251, 137, 0.25)' : theme.border)};
    border-left: 1px solid
      ${({ theme }) => (theme.isDark ? 'rgba(55, 251, 137, 0.25)' : theme.border)};
  }
`;

const DropdownItemLink = styled(Link)`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.85rem;
  border-radius: 12px;
  text-decoration: none;
  background: transparent;
  transition:
    background-color 0.2s ease,
    transform 0.15s ease;

  &:hover {
    background: ${({ theme }) =>
      theme.isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)'};
  }

  &:hover .arrow-icon-svg {
    transform: translateX(3px);
  }
`;

const DropdownIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
  color: ${({ theme }) => (theme.isDark ? theme.colors.mint : theme.accentText)};
  flex-shrink: 0;

  .arrow-icon-svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
    stroke-width: 2.5;
    fill: none;
    transition: transform 0.2s ease;
  }
`;

const DropdownTextCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const DropdownItemTitle = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.foreground};
  line-height: 1.2;
`;

const DropdownItemDesc = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.35;
`;

// Slide-Over Right Drawer Components
const DrawerBackdrop = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: 1024px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    z-index: 99;
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
    transition:
      opacity 300ms ease,
      visibility 300ms;
    pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  }
`;

const DrawerPanel = styled.aside<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: 1024px) {
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 340px;
    max-width: 85vw;
    background: ${({ theme }) => (theme.isDark ? '#001E2B' : theme.surface)};
    border-left: 1px solid ${({ theme }) => theme.border};
    z-index: 100;
    flex-direction: column;
    box-shadow: -10px 0 40px rgba(0, 0, 0, 0.4);
    transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(100%)')};
    visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
    transition:
      transform 300ms cubic-bezier(0.16, 1, 0.3, 1),
      visibility 300ms;
    pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none !important;
  }
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const DrawerLogoTitle = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 700;
  font-size: 1.15rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.foreground};
`;

const DrawerCloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.textSecondary};
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.foreground};
  }

  svg {
    width: 20px;
    height: 20px;
    stroke: currentColor;
    stroke-width: 2;
    fill: none;
  }
`;

const DrawerBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.border};
    border-radius: 4px;
  }
`;

const DrawerSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DrawerSectionTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.725rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 0.2rem;
`;

const DrawerLinkItem = styled(Link)<{ $active?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.95rem;
  font-weight: ${({ $active }) => ($active ? '600' : '500')};
  color: ${({ theme, $active }) => ($active ? theme.foreground : theme.textSecondary)};
  text-decoration: none;
  padding: 0.55rem 0.75rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: ${({ theme, $active }) =>
    $active ? (theme.isDark ? 'rgba(55, 251, 137, 0.12)' : 'rgba(15, 122, 77, 0.08)') : 'transparent'};
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? (theme.isDark ? 'rgba(55, 251, 137, 0.25)' : 'rgba(15, 122, 77, 0.2)') : 'transparent'};
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.foreground};
    background: ${({ theme, $active }) =>
      $active
        ? theme.isDark
          ? 'rgba(55, 251, 137, 0.16)'
          : 'rgba(15, 122, 77, 0.12)'
        : theme.isDark
        ? 'rgba(255, 255, 255, 0.04)'
        : 'rgba(0, 0, 0, 0.03)'};
  }

  .bullet-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => (theme.isDark ? theme.colors.mint : theme.accentText)};
    flex-shrink: 0;
  }
`;

const LanguageChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-top: 0.25rem;
`;

const LanguageChip = styled.button<{ $active: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.4rem 0.85rem;
  border-radius: 9999px;
  border: 1px solid
    ${({ theme, $active }) =>
      $active
        ? theme.isDark
          ? theme.colors.mint
          : theme.accentText
        : theme.border};
  background: ${({ theme, $active }) =>
    $active
      ? theme.isDark
        ? 'rgba(55, 251, 137, 0.15)'
        : 'rgba(15, 122, 77, 0.1)'
      : 'transparent'};
  color: ${({ theme, $active }) =>
    $active
      ? theme.isDark
        ? theme.colors.mint
        : theme.accentText
      : theme.textSecondary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.foreground};
    border-color: ${({ theme }) => theme.foreground};
  }
`;

const DrawerFooter = styled.div`
  padding: 1.25rem 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  background: ${({ theme }) => (theme.isDark ? '#001E2B' : theme.surface)};
`;

const DrawerThemeToggleBtn = styled.button`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.textSecondary};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.foreground};
    border-color: ${({ theme }) => theme.foreground};
  }

  svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
    fill: none;
    stroke-width: 2;
  }
`;

const DrawerCTABtn = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.95rem;
  font-weight: 700;
  color: #001e2b;
  background: #befe72;
  border-radius: 9999px;
  padding: 0.85rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;
  box-shadow: 0 8px 20px -4px rgba(190, 254, 114, 0.35);
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: #37fb89;
    transform: translateY(-1px);
  }

  svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
    fill: none;
    stroke-width: 2.5;
  }
`;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { t, locale, setLocale } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const navContainerRef = React.useRef<HTMLUListElement | null>(null);
  const navLinksRef = React.useRef<Map<string, HTMLAnchorElement | null>>(new Map());
  const moreContainerRef = React.useRef<HTMLLIElement | null>(null);

  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = useCallback(
    (href: string) => {
      if (href === '/') return pathname === '/';
      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname]
  );

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setIsMoreOpen(false);
  }, []);

  const mainNavItems = useMemo(
    () => [
      { href: '/', label: t('nav.home') },
      { href: '/about', label: t('nav.about') },
      { href: '/services', label: t('nav.services') },
      { href: '/careers', label: t('nav.careers') },
      { href: '/contact', label: t('nav.contact') },
    ],
    [t]
  );

  const allNavItems = useMemo(
    () => [...mainNavItems, { href: '/verify-certificate', label: t('nav.more') }],
    [mainNavItems, t]
  );

  const updateIndicator = useCallback(() => {
    if (!navContainerRef.current) return;
    const containerRect = navContainerRef.current.getBoundingClientRect();

    const activeItem = allNavItems.find((item) => isActive(item.href));
    const activeHref = activeItem ? activeItem.href : '/';
    const activeEl = navLinksRef.current.get(activeHref);

    if (activeEl) {
      const activeRect = activeEl.getBoundingClientRect();
      const left = activeRect.left - containerRect.left;
      const width = activeRect.width;

      setIndicatorStyle({ left, width });
      setIsReady(true);
    }
  }, [isActive, allNavItems]);

  useEffect(() => {
    updateIndicator();
    const handleResize = () => updateIndicator();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pathname, updateIndicator]);

  useEffect(() => {
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(() => {
        updateIndicator();
      });
    }
  }, [updateIndicator]);

  // Click outside to close More dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreContainerRef.current && !moreContainerRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard accessibility: Escape key closes menus
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isMoreOpen) setIsMoreOpen(false);
        if (isOpen) closeMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isMoreOpen, closeMenu]);

  return (
    <>
      <Header $isScrolled={isScrolled}>
        <NavContainer aria-label="Main navigation">
          <LogoLink href="/" onClick={closeMenu} aria-label="Solvimate Home">
            <LogoMarkImage
              src="/logo_solvimate.webp"
              alt="Solvimate logo mark"
              width={36}
              height={36}
            />
            <LogoWordmark>SOLVIMATE</LogoWordmark>
          </LogoLink>

          <DesktopNavLinks ref={navContainerRef}>
            {mainNavItems.map((item) => (
              <NavLinkItem key={item.href}>
                <StyledNavLink
                  ref={(el) => {
                    if (el) {
                      navLinksRef.current.set(item.href, el);
                    }
                  }}
                  href={item.href}
                  $active={isActive(item.href)}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </StyledNavLink>
              </NavLinkItem>
            ))}

            <MoreContainer ref={moreContainerRef}>
              <MoreTriggerButton
                ref={(el) => {
                  if (el) {
                    navLinksRef.current.set('/verify-certificate', el as unknown as HTMLAnchorElement);
                  }
                }}
                type="button"
                onClick={() => setIsMoreOpen((prev) => !prev)}
                $active={isActive('/verify-certificate')}
                $isOpen={isMoreOpen}
                aria-expanded={isMoreOpen}
                aria-haspopup="true"
              >
                {t('nav.more')}
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </MoreTriggerButton>

              <DropdownMenu $isOpen={isMoreOpen} role="menu" aria-label="More options">
                <DropdownItemLink
                  href="/verify-certificate"
                  role="menuitem"
                  onClick={() => setIsMoreOpen(false)}
                >
                  <DropdownIconWrapper>
                    <svg className="arrow-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </DropdownIconWrapper>
                  <DropdownTextCol>
                    <DropdownItemTitle>{t('nav.verifyCertificate')}</DropdownItemTitle>
                    <DropdownItemDesc>{t('nav.verifyCertificateDesc')}</DropdownItemDesc>
                  </DropdownTextCol>
                </DropdownItemLink>
              </DropdownMenu>
            </MoreContainer>

            <ActiveIndicator
              $left={indicatorStyle.left}
              $width={indicatorStyle.width}
              $ready={isReady}
              aria-hidden="true"
            />
          </DesktopNavLinks>

          <RightActions>
            <DesktopOnlyWrapper>
              <LanguageSwitcher />
            </DesktopOnlyWrapper>
            <ThemeToggle />
            <CTAButton href="/contact">{t('nav.getStarted')}</CTAButton>

            <HamburgerButton
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
            >
              {isOpen ? (
                // Close icon ('X')
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                // Hamburger icon (3 lines)
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </HamburgerButton>
          </RightActions>
        </NavContainer>
      </Header>

      <DrawerBackdrop $isOpen={isOpen} onClick={closeMenu} aria-hidden="true" />

      <DrawerPanel id="mobile-nav" $isOpen={isOpen} role="navigation" aria-label="Side navigation">
        <DrawerHeader>
          <DrawerLogoTitle>SOLVIMATE</DrawerLogoTitle>
          <DrawerCloseButton onClick={closeMenu} aria-label="Close navigation">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </DrawerCloseButton>
        </DrawerHeader>

        <DrawerBody>
          <DrawerSection>
            <DrawerSectionTitle>{t('nav.pages')}</DrawerSectionTitle>
            <DrawerLinkItem href="/" $active={isActive('/')} onClick={closeMenu}>
              {t('nav.home')}
            </DrawerLinkItem>
            <DrawerLinkItem href="/about" $active={isActive('/about')} onClick={closeMenu}>
              {t('nav.about')}
            </DrawerLinkItem>
            <DrawerLinkItem href="/programs" $active={isActive('/programs')} onClick={closeMenu}>
              {t('nav.programs')}
            </DrawerLinkItem>
            <DrawerLinkItem href="/contact" $active={isActive('/contact')} onClick={closeMenu}>
              {t('nav.contact')}
            </DrawerLinkItem>
          </DrawerSection>

          <DrawerSection>
            <DrawerSectionTitle>{t('nav.opportunities')}</DrawerSectionTitle>
            <DrawerLinkItem href="/internships" $active={isActive('/internships')} onClick={closeMenu}>
              {isActive('/internships') && <span className="bullet-dot" />}
              {t('nav.internships')}
            </DrawerLinkItem>
            <DrawerLinkItem href="/careers" $active={isActive('/careers')} onClick={closeMenu}>
              {t('nav.jobs')}
            </DrawerLinkItem>
            <DrawerLinkItem
              href="/customer-support?subject=Candidate%20Application"
              $active={pathname.includes('Candidate')}
              onClick={closeMenu}
            >
              {t('nav.candidateForm')}
            </DrawerLinkItem>
          </DrawerSection>

          <DrawerSection>
            <DrawerSectionTitle>{t('nav.servicesGroup')}</DrawerSectionTitle>
            <DrawerLinkItem href="/services" $active={isActive('/services')} onClick={closeMenu}>
              {t('nav.ourServices')}
            </DrawerLinkItem>
            <DrawerLinkItem
              href="/customer-support?subject=Vendor%20Application"
              $active={pathname.includes('Vendor')}
              onClick={closeMenu}
            >
              {t('nav.vendorForm')}
            </DrawerLinkItem>
          </DrawerSection>

          <DrawerSection>
            <DrawerSectionTitle>{t('nav.more')}</DrawerSectionTitle>
            <DrawerLinkItem
              href="/verify-certificate"
              $active={isActive('/verify-certificate')}
              onClick={closeMenu}
            >
              {t('nav.verifyCertificate')}
            </DrawerLinkItem>
          </DrawerSection>

          <DrawerSection>
            <DrawerSectionTitle>{t('common.language')}</DrawerSectionTitle>
            <LanguageChipRow>
              {(['en', 'hi', 'es', 'fr', 'de'] as Locale[]).map((lang) => (
                <LanguageChip
                  key={lang}
                  $active={locale === lang}
                  onClick={() => setLocale(lang)}
                >
                  {lang.toUpperCase()}
                </LanguageChip>
              ))}
            </LanguageChipRow>
          </DrawerSection>
        </DrawerBody>

        <DrawerFooter>
          <DrawerThemeToggleBtn onClick={toggleTheme}>
            {theme === 'dark' ? (
              <>
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
                {t('nav.lightMode')}
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
                {t('nav.darkMode')}
              </>
            )}
          </DrawerThemeToggleBtn>

          <DrawerCTABtn href="/verify-certificate" onClick={closeMenu}>
            {t('nav.verifyCertificate')}
            <svg viewBox="0 0 24 24">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </DrawerCTABtn>
        </DrawerFooter>
      </DrawerPanel>
    </>
  );
}
