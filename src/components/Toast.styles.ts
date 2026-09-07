import type { ToastType } from './Toast';
import styled, { keyframes, css } from 'styled-components';

export const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-20px) scale(0.96); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

export const ToastContainerWrapper = styled.div`
  position: fixed;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99999;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  width: min(460px, 92vw);
  pointer-events: none;
`;

export const ToastCard = styled.div<{ $type: ToastType }>`
  width: 100%;
  pointer-events: auto;
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  padding: 1rem 1.15rem;
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow:
    0 12px 36px rgba(0, 0, 0, 0.18),
    0 2px 8px rgba(0, 0, 0, 0.08);
  background: ${({ theme }) => theme.cardBg};
  backdrop-filter: blur(12px);
  border: 1px solid
    ${({ $type, theme }) => {
      if ($type === 'success') return 'rgba(55, 251, 137, 0.55)';
      if ($type === 'error') return 'rgba(239, 68, 68, 0.55)';
      return theme.border;
    }};
  color: ${({ theme }) => theme.foreground};
  animation: ${slideDown} 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const IconWrapper = styled.div<{ $type: ToastType }>`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, $type }) => ($type === 'error' ? theme.colors.paper : theme.colors.ink)};
  background: ${({ theme, $type }) => {
    if ($type === 'success') return theme.primaryHover;
    if ($type === 'error') return theme.error;
    return theme.primary;
  }};
  margin-top: 0.1rem;

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const MessageText = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  flex: 1;
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.5;
  color: ${({ theme }) => theme.foreground};
  word-break: break-word;
`;

export const DismissButton = styled.button`
  flex-shrink: 0;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.textSecondary};
  cursor: pointer;
  padding: 0.25rem;
  margin: -0.25rem -0.25rem -0.25rem 0;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    color 0.15s ease,
    background 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.foreground};
    background: rgba(255, 255, 255, 0.08);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 2px;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;


