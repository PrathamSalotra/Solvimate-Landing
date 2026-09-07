import Link from 'next/link';
import styled, { keyframes, css } from 'styled-components';

export const FooterWrapper = styled.footer`
  font-family: ${({ theme }) => theme.fonts.body};
  background: ${({ theme }) => theme.background};
  border-top: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.foreground};
  width: 100%;
  margin-top: auto;
  position: relative;
  z-index: 20;
`;

export const FooterContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 1.5rem 2rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 3rem 1rem 1.5rem;
  }
`;

export const FooterGrid = styled.div`
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

export const BrandColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  text-decoration: none;
  width: fit-content;
`;

export const LogoMarkImage = styled.img`
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

export const LogoWordmark = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 600;
  font-size: 1.35rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.foreground};
  line-height: 1;
`;

export const TaglineText = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.textSecondary};
  font-size: 13px;
  line-height: 1.6;
  max-width: 320px;
  margin: 0;
`;

export const ColumnHeading = styled.h3`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.foreground};
  margin: 0 0 1rem;
`;

export const LinkList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const StyledFooterLink = styled(Link)`
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
    color: ${({ theme }) => (theme.isDark ? theme.colors.lime : theme.accentText)};
    transform: translateX(3px);
  }
`;

export const SocialList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const SocialLink = styled.a`
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
    color: ${({ theme }) => (theme.isDark ? theme.colors.lime : theme.accentText)};
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

export const BottomBar = styled.div`
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

