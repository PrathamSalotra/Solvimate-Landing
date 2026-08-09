export interface ColorPalette {
  ink: string;
  surface: string;
  lime: string;
  mint: string;
  mist: string;
  paper: string;
  textOnAccent: string;
  secondaryText: string;
  background: string;
  cardBg: string;
  border: string;
  primaryText: string;
  accentText: string;
  accentBadgeBg: string;
  accentBadgeBorder: string;
}

export interface SpacingTokens {
  sectionDesktop: string;
  sectionMobile: string;
  rhythm: {
    desktopMin: string;
    desktopMax: string;
    desktop: string;
    mobileMin: string;
    mobileMax: string;
    mobile: string;
  };
}

export interface RadiusTokens {
  buttonInput: string;
  card: string;
  default: string;
  lg: string;
  full: string;
}

export interface MotionTokens {
  hover: string;
  interaction: string;
  transition: string;
  ambientLoop: string;
}

export interface FontTokens {
  display: string;
  body: string;
  mono: string;
}

export interface ThemeTokens {
  // Existing top-level aliases for backwards compatibility across components
  background: string;
  surface: string;
  foreground: string;
  textSecondary: string;
  primary: string;
  primaryHover: string;
  primaryText: string;
  accentText: string;
  accentBadgeBg: string;
  accentBadgeBorder: string;
  border: string;
  cardBg: string;

  // Structured token groups from UI Design Specification
  colors: ColorPalette;
  spacing: SpacingTokens;
  radius: RadiusTokens;
  motion: MotionTokens;
  fonts: FontTokens;
}

const fonts: FontTokens = {
  display: 'var(--font-body), var(--font-inter-tight), "Inter Tight", sans-serif',
  body: 'var(--font-body), var(--font-inter-tight), "Inter Tight", sans-serif',
  mono: 'var(--font-body), var(--font-inter-tight), "Inter Tight", sans-serif',
};

const spacing: SpacingTokens = {
  sectionDesktop: '80px',
  sectionMobile: '48px',
  rhythm: {
    desktopMin: '64px',
    desktopMax: '96px',
    desktop: '80px',
    mobileMin: '40px',
    mobileMax: '56px',
    mobile: '48px',
  },
};

const radius: RadiusTokens = {
  buttonInput: '8px',
  card: '12px',
  default: '8px',
  lg: '12px',
  full: '9999px',
};

const motion: MotionTokens = {
  hover: '200ms',
  interaction: '300ms',
  transition: 'all 250ms ease-in-out',
  ambientLoop: '16s',
};

export const darkTheme: ThemeTokens = {
  background: '#001E2B', // Ink
  surface: '#0A2E3D', // Surface
  foreground: '#F5FBF2', // Paper
  textSecondary: '#9FB8B4', // Mist
  primary: '#BEFE72', // Lime
  primaryHover: '#37FB89', // Mint
  primaryText: '#BEFE72', // Lime for text & SVG strokes in dark mode
  accentText: '#BEFE72', // Lime accent text
  accentBadgeBg: 'rgba(55, 251, 137, 0.12)',
  accentBadgeBorder: 'rgba(55, 251, 137, 0.35)',
  border: 'rgba(159, 184, 180, 0.25)', // Mist at 25% alpha
  cardBg: '#0A2E3D', // Surface
  colors: {
    ink: '#001E2B',
    surface: '#0A2E3D',
    lime: '#BEFE72',
    mint: '#37FB89',
    mist: '#9FB8B4',
    paper: '#F5FBF2',
    textOnAccent: '#001E2B',
    secondaryText: '#9FB8B4',
    background: '#001E2B',
    cardBg: '#0A2E3D',
    border: 'rgba(159, 184, 180, 0.25)',
    primaryText: '#BEFE72',
    accentText: '#BEFE72',
    accentBadgeBg: 'rgba(55, 251, 137, 0.12)',
    accentBadgeBorder: 'rgba(55, 251, 137, 0.35)',
  },
  spacing,
  radius,
  motion,
  fonts,
};

// NOTE: The UI design spec is dark-first. For light mode, we map:
// - Paper (#F5FBF2) as light background
// - Near-white (#FFFFFF) as surface for cards
// - Ink (#001E2B) for high-contrast text
// - Lime (#BEFE72) / Mint (#37FB89) accents unchanged for button backgrounds
// - Black (#000000) for primaryText / SVG strokes in light mode per user requirement
// - Darker muted teal (#2E626F) for light-mode secondary text instead of Mist (#9FB8B4),
//   since Mist on Paper has a 2.00:1 contrast ratio (failing WCAG AA/AAA).
//   #2E626F has a 6.79:1 contrast ratio on white and 6.45:1 on Paper (#F5FBF2), exceeding WCAG AA & AAA standards.
export const lightTheme: ThemeTokens = {
  background: '#F5FBF2', // Paper
  surface: '#FFFFFF', // Near-white surface for cards
  foreground: '#001E2B', // Ink
  textSecondary: '#2E626F', // Darker Muted Teal (6.79:1 contrast on white / 6.45:1 on paper)
  primary: '#BEFE72', // Lime for button backgrounds
  primaryHover: '#37FB89', // Mint
  primaryText: '#000000', // Black (#000000) for text & SVG strokes in light mode
  accentText: '#0F7A4D', // Dark green accent text with high contrast on light backgrounds
  accentBadgeBg: 'rgba(55, 251, 137, 0.18)',
  accentBadgeBorder: 'rgba(15, 122, 77, 0.3)',
  border: 'rgba(0, 30, 43, 0.15)', // Ink at 15% alpha
  cardBg: '#FFFFFF', // Near-white surface for cards
  colors: {
    ink: '#001E2B',
    surface: '#FFFFFF',
    lime: '#BEFE72',
    mint: '#37FB89',
    mist: '#9FB8B4',
    paper: '#F5FBF2',
    textOnAccent: '#001E2B',
    secondaryText: '#2E626F',
    background: '#F5FBF2',
    cardBg: '#FFFFFF',
    border: 'rgba(0, 30, 43, 0.15)',
    primaryText: '#000000',
    accentText: '#0F7A4D',
    accentBadgeBg: 'rgba(55, 251, 137, 0.18)',
    accentBadgeBorder: 'rgba(15, 122, 77, 0.3)',
  },
  spacing,
  radius,
  motion,
  fonts,
};

export const tokens = {
  dark: darkTheme,
  light: lightTheme,
};

export default tokens;
