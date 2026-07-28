'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastItemData {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const ToastContainerWrapper = styled.div`
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

const ToastCard = styled.div<{ $type: ToastType }>`
  width: 100%;
  pointer-events: auto;
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  padding: 1rem 1.15rem;
  border-radius: 14px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.18), 0 2px 8px rgba(0, 0, 0, 0.08);
  background: ${({ theme }) => theme.cardBg};
  backdrop-filter: blur(12px);
  border: 1px solid
    ${({ $type, theme }) => {
      if ($type === 'success') return 'rgba(16, 185, 129, 0.45)';
      if ($type === 'error') return 'rgba(239, 68, 68, 0.45)';
      return theme.border;
    }};
  color: ${({ theme }) => theme.foreground};
  animation: ${slideDown} 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  transition: transform 0.2s ease, opacity 0.2s ease;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const IconWrapper = styled.div<{ $type: ToastType }>`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background: ${({ $type }) => {
    if ($type === 'success') return '#10b981';
    if ($type === 'error') return '#ef4444';
    return '#3b82f6';
  }};
  margin-top: 0.1rem;

  svg {
    width: 14px;
    height: 14px;
  }
`;

const MessageText = styled.div`
  flex: 1;
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.5;
  color: ${({ theme }) => theme.foreground};
  word-break: break-word;
`;

const DismissButton = styled.button`
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
  transition: color 0.15s ease, background 0.15s ease;

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

const getIcon = (type: ToastType) => {
  if (type === 'success') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );
  }
  if (type === 'error') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
};

interface ToastItemProps {
  toast: ToastItemData;
  onDismiss: (id: string) => void;
}

export function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const duration = toast.duration ?? 4500;

  const startTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onDismiss(toast.id);
    }, duration);
  }, [duration, onDismiss, toast.id]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    startTimer();
    return () => clearTimer();
  }, [startTimer, clearTimer]);

  return (
    <ToastCard
      $type={toast.type}
      role={toast.type === 'error' ? 'alert' : 'status'}
      onMouseEnter={clearTimer}
      onMouseLeave={startTimer}
    >
      <IconWrapper $type={toast.type}>{getIcon(toast.type)}</IconWrapper>
      <MessageText>{toast.message}</MessageText>
      <DismissButton
        type="button"
        aria-label="Close notification"
        onClick={() => onDismiss(toast.id)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </DismissButton>
    </ToastCard>
  );
}

interface ToastContainerProps {
  toasts: ToastItemData[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <ToastContainerWrapper aria-live="polite" aria-atomic="true" role="status">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </ToastContainerWrapper>
  );
}
