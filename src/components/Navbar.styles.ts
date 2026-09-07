import Link from 'next/link';
import styled, { keyframes, css } from 'styled-components';

export const Header = styled.header<{ $isScrolled: boolean }>`
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

export const NavContainer = styled.nav`
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

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  text-decoration: none;
  flex-shrink: 0;
`;

export const LogoMarkImage = styled.img`
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

export const LogoWordmark = styled.span`
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

export const DesktopNavLinks = styled.ul`
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

export const NavLinkItem = styled.li`
  margin: 0;
  padding: 0;
`;

export const StyledNavLink = styled(Link)<{ $active?: boolean }>`
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

export const ActiveIndicator = styled.div<{ $left: number; $width: number; $ready: boolean }>`
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

export const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 1024px) {
    gap: 0.5rem;
  }
`;

export const DesktopOnlyWrapper = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const CTAButton = styled(Link)`
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

export const HamburgerButton = styled.button`
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

export const MoreContainer = styled.li`
  position: relative;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
`;

export const MoreTriggerButton = styled.button<{ $active?: boolean; $isOpen?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 13px;
  font-weight: ${({ $active, $isOpen }) => ($active || $isOpen ? '600' : '500')};
  letter-spacing: 0.02em;
  color: ${({ theme, $active, $isOpen }) =>
    $active || $isOpen ? (theme.isDark ? '#BEFE72' : theme.primaryText) : theme.textSecondary};
  background: transparent;
  border: none;
  padding: 0.5rem 0;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
  transition: color 0.2s ease;

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

export const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 14px);
  left: 50%;
  transform: translateX(-50%) ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(-8px)')};
  width: 290px;
  background: ${({ theme }) => theme.surface};
  border: 1px solid
    ${({ theme }) => (theme.isDark ? 'rgba(190, 254, 114, 0.3)' : 'rgba(190, 254, 114, 0.35)')};
  border-radius: 16px;
  padding: 0.75rem;
  box-shadow: ${({ theme }) =>
    theme.isDark
      ? '0 16px 36px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(190, 254, 114, 0.15)'
      : '0 12px 32px rgba(190, 254, 114, 0.15), 0 4px 16px rgba(0, 0, 0, 0.08)'};
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
      ${({ theme }) => (theme.isDark ? 'rgba(190, 254, 114, 0.3)' : 'rgba(190, 254, 114, 0.35)')};
    border-left: 1px solid
      ${({ theme }) => (theme.isDark ? 'rgba(190, 254, 114, 0.3)' : 'rgba(190, 254, 114, 0.35)')};
  }
`;

export const DropdownItemLink = styled(Link)`
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
      theme.isDark ? 'rgba(190, 254, 114, 0.12)' : 'rgba(190, 254, 114, 0.15)'};
  }

  &:hover .arrow-icon-svg {
    transform: translateX(3px);
  }
`;

export const DropdownIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
  color: ${({ theme }) => (theme.isDark ? '#BEFE72' : theme.accentText)};
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

export const DropdownTextCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const DropdownItemTitle = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.foreground};
  line-height: 1.2;
`;

export const DropdownItemDesc = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.35;
`;

export const DrawerBackdrop = styled.div<{ $isOpen: boolean }>`
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

export const DrawerPanel = styled.aside<{ $isOpen: boolean }>`
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

export const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

export const DrawerLogoTitle = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 700;
  font-size: 1.15rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.foreground};
`;

export const DrawerCloseButton = styled.button`
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

export const DrawerBody = styled.div`
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

export const DrawerSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const DrawerSectionTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.725rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 0.2rem;
`;

export const DrawerLinkItem = styled(Link)<{ $active?: boolean }>`
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
    $active
      ? theme.isDark
        ? 'rgba(55, 251, 137, 0.12)'
        : 'rgba(15, 122, 77, 0.08)'
      : 'transparent'};
  border: 1px solid
    ${({ theme, $active }) =>
      $active
        ? theme.isDark
          ? 'rgba(55, 251, 137, 0.25)'
          : 'rgba(15, 122, 77, 0.2)'
        : 'transparent'};
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

export const LanguageChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-top: 0.25rem;
`;

export const LanguageChip = styled.button<{ $active: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.4rem 0.85rem;
  border-radius: 9999px;
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? (theme.isDark ? '#BEFE72' : theme.accentText) : theme.border};
  background: ${({ theme, $active }) =>
    $active
      ? theme.isDark
        ? 'rgba(190, 254, 114, 0.18)'
        : 'rgba(190, 254, 114, 0.12)'
      : 'transparent'};
  color: ${({ theme, $active }) =>
    $active ? (theme.isDark ? '#BEFE72' : theme.accentText) : theme.textSecondary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => (theme.isDark ? '#BEFE72' : theme.foreground)};
    border-color: ${({ theme }) => (theme.isDark ? '#BEFE72' : theme.foreground)};
  }
`;

export const DrawerFooter = styled.div`
  padding: 1.25rem 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  background: ${({ theme }) => (theme.isDark ? '#001E2B' : theme.surface)};
`;

export const DrawerThemeToggleBtn = styled.button`
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

export const DrawerCTABtn = styled(Link)`
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

