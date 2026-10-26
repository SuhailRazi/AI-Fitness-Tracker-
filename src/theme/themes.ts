import { palette } from './tokens';

export type ThemeName = 'dark' | 'light';

/** Theme preference chosen by the user. `system` follows the OS appearance. */
export type ThemePreference = ThemeName | 'system';

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceRaised: string;
  surfacePressed: string;
  border: string;
  borderStrong: string;

  text: string;
  textMuted: string;
  textSubtle: string;
  textInverse: string;

  primary: string;
  primaryPressed: string;
  onPrimary: string;

  accent: string;
  onAccent: string;

  success: string;
  warning: string;
  danger: string;
  info: string;
  onStatus: string;

  /** Used for clearly labelled sample/demo data so it is never mistaken for real records. */
  sample: string;

  focusRing: string;
  overlay: string;
}

export interface Theme {
  name: ThemeName;
  colors: ThemeColors;
}

export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    background: palette.neutral950,
    surface: palette.neutral900,
    surfaceRaised: palette.neutral800,
    surfacePressed: palette.neutral700,
    border: palette.neutral800,
    borderStrong: palette.neutral500,

    text: palette.neutral50,
    textMuted: palette.neutral300,
    textSubtle: palette.neutral400,
    textInverse: palette.neutral950,

    primary: palette.lime400,
    primaryPressed: palette.lime500,
    onPrimary: palette.neutral950,

    accent: palette.blue400,
    onAccent: palette.neutral950,

    success: palette.green400,
    warning: palette.amber400,
    danger: palette.red400,
    info: palette.blue400,
    onStatus: palette.neutral950,

    sample: palette.violet400,

    focusRing: palette.blue300,
    overlay: 'rgba(0, 0, 0, 0.6)',
  },
};

export const lightTheme: Theme = {
  name: 'light',
  colors: {
    background: palette.neutral50,
    surface: palette.white,
    surfaceRaised: palette.neutral100,
    surfacePressed: palette.neutral200,
    border: palette.neutral200,
    borderStrong: palette.neutral400,

    text: palette.neutral900,
    textMuted: palette.neutral600,
    textSubtle: palette.neutral500,
    textInverse: palette.neutral50,

    primary: palette.lime700,
    primaryPressed: palette.neutral800,
    onPrimary: palette.white,

    accent: palette.blue600,
    onAccent: palette.white,

    success: palette.green700,
    warning: palette.amber700,
    danger: palette.red700,
    info: palette.blue600,
    onStatus: palette.white,

    sample: palette.violet700,

    focusRing: palette.blue600,
    overlay: 'rgba(14, 16, 21, 0.4)',
  },
};

export const themes: Record<ThemeName, Theme> = {
  dark: darkTheme,
  light: lightTheme,
};

export const DEFAULT_THEME_PREFERENCE: ThemePreference = 'dark';

/**
 * Resolves a stored preference to a concrete theme. Falls back to dark when the
 * OS appearance is unknown, because dark is the product default.
 */
export function resolveThemeName(
  preference: ThemePreference,
  systemScheme: string | null | undefined,
): ThemeName {
  if (preference !== 'system') return preference;
  return systemScheme === 'light' ? 'light' : 'dark';
}
