'use client';

import React, {
  createContext,
  useContext,
  ReactNode,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { tokens } from '@/lib/theme/tokens';

export type ThemeMode = 'dark' | 'light';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const THEME_STORAGE_KEY = 'solvimate-theme';
const THEME_CHANGE_EVENT = 'solvimate-theme-change';

function getSnapshot(): ThemeMode {
  if (typeof window === 'undefined') return 'dark';
  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
    const domTheme = document.documentElement.getAttribute('data-theme') as ThemeMode | null;
    if (domTheme === 'light' || domTheme === 'dark') {
      return domTheme;
    }
  } catch {
    // Ignore error
  }
  return 'dark';
}

function getServerSnapshot(): ThemeMode {
  return 'dark';
}

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
  };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    const currentTheme = getSnapshot();
    const nextTheme: ThemeMode = currentTheme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // Ignore error
    }
    document.documentElement.setAttribute('data-theme', nextTheme);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }, []);

  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <StyledThemeProvider theme={tokens[theme]}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
