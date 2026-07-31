'use client';

import React, { useState, useEffect, useCallback } from 'react';
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

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ theme, $active }) => ($active ? theme.primary : 'transparent')};
    border-radius: 2px;
    transition:
      background-color 0.2s ease,
      transform 0.2s ease;
    transform: ${({ $active }) => ($active ? 'scaleX(1)' : 'scaleX(0)')};
    transform-origin: left;
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
  padding: 0.45rem 1.15rem;
  border-radius: 9999px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.colors.ink};
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
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
  border-radius: 8px;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.foreground};
  cursor: pointer;
  padding: 0;

  @media (max-width: 768px) {
    display: inline-flex;
  }

  svg {
    width: 22px;
    height: 22px;
    stroke: currentColor;
    stroke-width: 2;
    fill: none;
  }
`;

const MobileMenuDrawer = styled.div<{ $isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 72px;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.background};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding: 1.5rem 1.25rem;
  flex-direction: column;
  gap: 1.25rem;
  z-index: 40;
  max-height: calc(100vh - 72px);
  overflow-y: auto;

  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
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
  position: fixed;
  top: 72px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 39;

  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  }
`;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

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
  }, []);

  // Keyboard accessibility: Escape key closes the mobile menu
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeMenu]);

  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/services', label: t('nav.services') },
    { href: '/careers', label: t('nav.careers') },
    { href: '/contact', label: t('nav.contact') },
  ];

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

          <DesktopNavLinks>
            {navItems.map((item) => (
              <NavLinkItem key={item.href}>
                <StyledNavLink
                  href={item.href}
                  $active={isActive(item.href)}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </StyledNavLink>
              </NavLinkItem>
            ))}
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
          {navItems.map((item) => (
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
