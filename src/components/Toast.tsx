'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  ToastContainerWrapper,
  ToastCard,
  IconWrapper,
  MessageText,
  DismissButton,
} from './Toast.styles';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastItemData {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}


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
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden="true"
        >
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
