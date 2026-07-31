'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';

const FooterWrapper = styled.footer`
  font-family: ${({ theme }) => theme.fonts.body};
  background: ${({ theme }) => theme.background};
  border-top: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.foreground};
  width: 100%;
  margin-top: auto;
`;

const FooterContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 1.5rem 2rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 3rem 1rem 1.5rem;
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.25fr;
  gap: 2.5rem;
  margin-bottom: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const BrandColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  text-decoration: none;
  width: fit-content;
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
`;

const TaglineText = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.textSecondary};
  font-size: 13px;
  line-height: 1.6;
  max-width: 320px;
  margin: 0;
`;

const ColumnHeading = styled.h3`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.foreground};
  margin: 0 0 1rem;
`;

const LinkList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const StyledFooterLink = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.textSecondary};
  font-size: 13px;
  text-decoration: none;
  display: inline-block;
  transition:
    color 0.2s ease,
    transform 0.2s ease;

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.primaryText};
    transform: translateX(3px);
  }
`;

const SocialList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SocialLink = styled.a`
  font-family: ${({ theme }) => theme.fonts.body};
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 13px;
  text-decoration: none;
  transition:
    color 0.2s ease,
    transform 0.2s ease;

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.primaryText};
    transform: translateX(3px);
  }

  svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
    flex-shrink: 0;
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;

const BottomBar = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  border-top: 1px solid ${({ theme }) => theme.border};
  padding-top: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 13px;
  color: ${({ theme }) => theme.textSecondary};
`;

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterGrid>
          <BrandColumn>
            <LogoLink href="/" aria-label="Solvimate Home">
              <LogoMarkImage
                src="/logo_solvimate.webp"
                alt="Solvimate logo mark"
                width={36}
                height={36}
              />
              <LogoWordmark>SOLVIMATE</LogoWordmark>
            </LogoLink>
            <TaglineText>{t('footer.tagline')}</TaglineText>
          </BrandColumn>

          <div>
            <ColumnHeading>{t('footer.quickLinks')}</ColumnHeading>
            <LinkList>
              <li>
                <StyledFooterLink href="/">{t('nav.home')}</StyledFooterLink>
              </li>
              <li>
                <StyledFooterLink href="/about">{t('nav.about')}</StyledFooterLink>
              </li>
              <li>
                <StyledFooterLink href="/services">{t('nav.services')}</StyledFooterLink>
              </li>
              <li>
                <StyledFooterLink href="/careers">{t('nav.careers')}</StyledFooterLink>
              </li>
              <li>
                <StyledFooterLink href="/internships">{t('nav.internships')}</StyledFooterLink>
              </li>
              <li>
                <StyledFooterLink href="/programs">{t('nav.programs')}</StyledFooterLink>
              </li>
              <li>
                <StyledFooterLink href="/news">{t('nav.news')}</StyledFooterLink>
              </li>
              <li>
                <StyledFooterLink href="/contact">{t('nav.contact')}</StyledFooterLink>
              </li>
            </LinkList>
          </div>

          <div>
            <ColumnHeading>{t('footer.legal')}</ColumnHeading>
            <LinkList>
              <li>
                <StyledFooterLink href="/sitemap">{t('footer.sitemap')}</StyledFooterLink>
              </li>
              <li>
                <StyledFooterLink href="/privacy">{t('footer.privacyPolicy')}</StyledFooterLink>
              </li>
              <li>
                <StyledFooterLink href="/terms">{t('footer.termsOfService')}</StyledFooterLink>
              </li>
            </LinkList>
          </div>

          <div>
            <ColumnHeading>{t('footer.social')}</ColumnHeading>
            <SocialList>
              <SocialLink
                href="https://www.linkedin.com/company/solvimate"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
                </svg>
                <span>LinkedIn</span>
              </SocialLink>

              <SocialLink
                href="https://x.com/solvimate"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>X / Twitter</span>
              </SocialLink>

              <SocialLink
                href="https://www.instagram.com/solvimate"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3Z" />
                </svg>
                <span>Instagram</span>
              </SocialLink>
            </SocialList>
          </div>
        </FooterGrid>

        <BottomBar>
          <span>{t('footer.copyright', { year: currentYear })}</span>
          <span>Solvimate - Global Dubbing & Language Solutions</span>
        </BottomBar>
      </FooterContainer>
    </FooterWrapper>
  );
}
