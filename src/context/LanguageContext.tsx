'use client';

import React, {
  createContext,
  useContext,
  ReactNode,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from 'react';

import en from '@/locales/en.json';
import de from '@/locales/de.json';
import es from '@/locales/es.json';
import fr from '@/locales/fr.json';
import hi from '@/locales/hi.json';

export type Locale = 'en' | 'de' | 'es' | 'fr' | 'hi';

type Dictionary = Record<string, unknown>;

const DICTIONARIES: Record<Locale, Dictionary> = {
  en,
  de,
  es,
  fr,
  hi,
};

export interface LanguageContextType {
  locale: Locale;
  setLocale: (nextLocale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LOCALE_STORAGE_KEY = 'solvimate-locale';
const LOCALE_CHANGE_EVENT = 'solvimate-locale-change';

const SUPPORTED_LOCALES: Locale[] = ['en', 'de', 'es', 'fr', 'hi'];

function isLocale(val: string | null): val is Locale {
  return val !== null && SUPPORTED_LOCALES.includes(val as Locale);
}

function getSnapshot(): Locale {
  if (typeof window === 'undefined') return 'en';
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isLocale(stored)) {
      return stored;
    }
  } catch {
    // Ignore error
  }
  return 'en';
}

function getServerSnapshot(): Locale {
  return 'en';
}

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener(LOCALE_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(LOCALE_CHANGE_EVENT, callback);
  };
}

function lookupKey(dict: Dictionary, path: string): unknown {
  const parts = path.split('.');
  let current: unknown = dict;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return current;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLocale = useCallback((nextLocale: Locale) => {
    if (!SUPPORTED_LOCALES.includes(nextLocale)) return;
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
    } catch {
      // Ignore error
    }
    window.dispatchEvent(new Event(LOCALE_CHANGE_EVENT));
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const currentDict = DICTIONARIES[locale] || DICTIONARIES.en;
      let val = lookupKey(currentDict, key);

      // Fallback to English dictionary if translation key is missing in current locale
      if (typeof val !== 'string' && locale !== 'en') {
        val = lookupKey(DICTIONARIES.en, key);
      }

      if (typeof val !== 'string') {
        return key;
      }

      if (params) {
        return Object.entries(params).reduce((str, [paramKey, paramVal]) => {
          return str.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramVal));
        }, val);
      }

      return val;
    },
    [locale]
  );

  const contextValue = useMemo(
    () => ({
      locale,
      setLocale,
      t,
    }),
    [locale, setLocale, t]
  );

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
