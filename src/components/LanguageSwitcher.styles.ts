import styled, { keyframes, css } from 'styled-components';

export const SwitcherWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  position: relative;
`;

export const TriggerButton = styled.button<{ $isOpen: boolean }>`
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

export const MobileBackdrop = styled.div<{ $isOpen: boolean }>`
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

export const DropdownMenu = styled.ul<{ $isOpen: boolean }>`
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

export const MobileHeader = styled.div`
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

export const CloseButton = styled.button`
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

export const OptionItem = styled.li`
  margin: 0;
  padding: 0;
`;

export const OptionButton = styled.button<{ $isSelected: boolean }>`
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

export const CheckIcon = styled.svg`
  width: 16px;
  height: 16px;
  stroke: ${({ theme }) => (theme.isDark ? '#BEFE72' : theme.accentText)};
  stroke-width: 2.5;
  fill: none;
`;
