import { describe, expect, it } from 'vitest';

import { contrastRatio, WCAG_AA_LARGE, WCAG_AA_TEXT } from './contrast';
import {
  DEFAULT_THEME_PREFERENCE,
  resolveThemeName,
  themes,
  type ThemeColors,
  type ThemeName,
} from './themes';

describe('resolveThemeName', () => {
  it('defaults the product to dark', () => {
    expect(DEFAULT_THEME_PREFERENCE).toBe('dark');
  });

  it('uses an explicit preference regardless of the OS scheme', () => {
    expect(resolveThemeName('dark', 'light')).toBe('dark');
    expect(resolveThemeName('light', 'dark')).toBe('light');
  });

  it('follows the OS scheme when set to system', () => {
    expect(resolveThemeName('system', 'light')).toBe('light');
    expect(resolveThemeName('system', 'dark')).toBe('dark');
  });

  it('falls back to dark when the OS scheme is unknown', () => {
    expect(resolveThemeName('system', null)).toBe('dark');
    expect(resolveThemeName('system', undefined)).toBe('dark');
  });
});

type Pair = [foreground: keyof ThemeColors, background: keyof ThemeColors];

const textPairs: Pair[] = [
  ['text', 'background'],
  ['text', 'surface'],
  ['text', 'surfaceRaised'],
  ['textMuted', 'background'],
  ['textMuted', 'surface'],
  ['textMuted', 'surfaceRaised'],
  ['textSubtle', 'background'],
  ['textSubtle', 'surface'],
  ['onPrimary', 'primary'],
  ['onAccent', 'accent'],
  ['onStatus', 'success'],
  ['onStatus', 'warning'],
  ['onStatus', 'danger'],
  ['onStatus', 'info'],
  ['onStatus', 'sample'],
];

const nonTextPairs: Pair[] = [
  ['primary', 'background'],
  ['primary', 'surface'],
  ['focusRing', 'background'],
  ['borderStrong', 'surface'],
];

describe.each(Object.keys(themes) as ThemeName[])('%s theme contrast', (name) => {
  const { colors } = themes[name];

  it.each(textPairs)(`%s on %s meets WCAG AA for text (${WCAG_AA_TEXT}:1)`, (fg, bg) => {
    expect(contrastRatio(colors[fg], colors[bg])).toBeGreaterThanOrEqual(WCAG_AA_TEXT);
  });

  it.each(nonTextPairs)(
    `%s on %s meets WCAG AA for UI components (${WCAG_AA_LARGE}:1)`,
    (fg, bg) => {
      expect(contrastRatio(colors[fg], colors[bg])).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
    },
  );
});
