export interface ThemeTokens {
  background: string;
  surface: string;
  foreground: string;
  textSecondary: string;
  primary: string;
  primaryHover: string;
  border: string;
  cardBg: string;
  fonts: {
    display: string;
    body: string;
    mono: string;
  };
}

const fonts = {
  display: 'var(--font-display), var(--font-space-grotesk), "Space Grotesk", sans-serif',
  body: 'var(--font-body), var(--font-manrope), "Manrope", sans-serif',
  mono: 'var(--font-mono), var(--font-ibm-plex-mono), "IBM Plex Mono", monospace',
};

export const darkTheme: ThemeTokens = {
  background: '#0a0a0a',
  surface: '#121212',
  foreground: '#ededed',
  textSecondary: '#a1a1aa',
  primary: '#10b981',
  primaryHover: '#059669',
  border: 'rgba(255, 255, 255, 0.1)',
  cardBg: 'rgba(255, 255, 255, 0.05)',
  fonts,
};

export const lightTheme: ThemeTokens = {
  background: '#ffffff',
  surface: '#f4f4f5',
  foreground: '#171717',
  textSecondary: '#52525b',
  primary: '#10b981',
  primaryHover: '#059669',
  border: 'rgba(0, 0, 0, 0.1)',
  cardBg: 'rgba(0, 0, 0, 0.03)',
  fonts,
};

export const tokens = {
  dark: darkTheme,
  light: lightTheme,
};
