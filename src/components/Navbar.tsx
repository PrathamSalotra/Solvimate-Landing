'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage, Locale } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeToggle from '@/components/ThemeToggle';
import {
  Header,
  NavContainer,
  LogoLink,
  LogoMarkImage,
  LogoWordmark,
  DesktopNavLinks,
  NavLinkItem,
  StyledNavLink,
  ActiveIndicator,
  RightActions,
  DesktopOnlyWrapper,
  CTAButton,
  HamburgerButton,
  MoreContainer,
  MoreTriggerButton,
  DropdownMenu,
  DropdownItemLink,
  DropdownIconWrapper,
  DropdownTextCol,
  DropdownItemTitle,
  DropdownItemDesc,
  DrawerBackdrop,
  DrawerPanel,
  DrawerHeader,
  DrawerLogoTitle,
  DrawerCloseButton,
  DrawerBody,
  DrawerSection,
  DrawerSectionTitle,
  DrawerLinkItem,
  LanguageChipRow,
  LanguageChip,
  DrawerFooter,
  DrawerThemeToggleBtn,
  DrawerCTABtn,
} from './Navbar.styles';

// Slide-Over Right Drawer Components

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
    () => [
      ...mainNavItems,
      { href: '/verify-certificate', label: t('nav.more') },
      { href: '/admin', label: t('nav.more') },
    ],
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
                    navLinksRef.current.set(
                      '/verify-certificate',
                      el as unknown as HTMLAnchorElement
                    );
                    navLinksRef.current.set(
                      '/admin',
                      el as unknown as HTMLAnchorElement
                    );
                  }
                }}
                type="button"
                onClick={() => setIsMoreOpen((prev) => !prev)}
                $active={isActive('/verify-certificate') || isActive('/admin')}
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

                <DropdownItemLink
                  href="/admin"
                  role="menuitem"
                  onClick={() => setIsMoreOpen(false)}
                >
                  <DropdownIconWrapper>
                    <svg className="arrow-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </DropdownIconWrapper>
                  <DropdownTextCol>
                    <DropdownItemTitle>{t('nav.admin')}</DropdownItemTitle>
                    <DropdownItemDesc>{t('nav.adminDesc')}</DropdownItemDesc>
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
            <DrawerLinkItem
              href="/internships"
              $active={isActive('/internships')}
              onClick={closeMenu}
            >
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
            <DrawerLinkItem
              href="/admin"
              $active={isActive('/admin')}
              onClick={closeMenu}
            >
              {t('nav.admin')}
            </DrawerLinkItem>
          </DrawerSection>

          <DrawerSection>
            <DrawerSectionTitle>{t('common.language')}</DrawerSectionTitle>
            <LanguageChipRow>
              {(['en', 'hi', 'es', 'fr', 'de'] as Locale[]).map((lang) => (
                <LanguageChip key={lang} $active={locale === lang} onClick={() => setLocale(lang)}>
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
