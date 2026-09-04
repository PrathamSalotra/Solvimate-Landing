'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';
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

  @media (max-width: 768px) {
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

  @media (max-width: 768px) {
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

  @media (max-width: 768px) {
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

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const DesktopOnlyWrapper = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
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

  @media (max-width: 768px) {
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

  @media (max-width: 768px) {
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

const MobileMenuDrawer = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    top: 72px;
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.surface};
    border-bottom: 1px solid ${({ theme }) => theme.border};
    padding: 1.5rem 1.25rem 2rem;
    flex-direction: column;
    gap: 1.25rem;
    z-index: 40;
    max-height: calc(100vh - 72px);
    overflow-y: auto;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
    transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(-12px)')};
    transition:
      transform 250ms cubic-bezier(0.16, 1, 0.3, 1),
      opacity 250ms ease,
      visibility 250ms;
    pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none !important;
  }
`;

const MobileNavLinks = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const MobileNavLink = styled(Link)<{ $active?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  font-weight: ${({ $active }) => ($active ? '600' : '500')};
  color: ${({ theme, $active }) => ($active ? theme.primaryText : theme.textSecondary)};
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.foreground};
  }

  &::after {
    content: '';
    display: ${({ $active }) => ($active ? 'block' : 'none')};
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.primary};
  }
`;

const MobileActionsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 0.5rem;
`;

const MobileCTAButton = styled(Link)`
  display: block;
  text-align: center;
  width: 100%;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.colors.ink};
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
  }
`;

const MobileBackdrop = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 72px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 39;
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
    transition:
      opacity 250ms ease,
      visibility 250ms;
    pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

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

      <MobileBackdrop $isOpen={isOpen} onClick={closeMenu} aria-hidden="true" />

      <MobileMenuDrawer
        id="mobile-nav"
        $isOpen={isOpen}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <MobileNavLinks>
          {mainNavItems.map((item) => (
            <li key={item.href}>
              <MobileNavLink
                href={item.href}
                $active={isActive(item.href)}
                aria-current={isActive(item.href) ? 'page' : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </MobileNavLink>
            </li>
          ))}

          <li>
            <MobileNavLink
              href="/verify-certificate"
              $active={isActive('/verify-certificate')}
              aria-current={isActive('/verify-certificate') ? 'page' : undefined}
              onClick={closeMenu}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--mint-color, #37FB89)', fontWeight: 700 }}>→</span>
                {t('nav.verifyCertificate')}
              </span>
            </MobileNavLink>
          </li>
        </MobileNavLinks>

        <MobileActionsRow>
          <LanguageSwitcher />
        </MobileActionsRow>

        <MobileCTAButton href="/contact" onClick={closeMenu}>
          {t('nav.getStarted')}
        </MobileCTAButton>
      </MobileMenuDrawer>
    </>
  );
}
