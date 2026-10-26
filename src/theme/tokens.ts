/**
 * Raw palette. Components must not reference these directly; use the semantic
 * colors from `ThemeColors` instead so light and dark themes stay consistent.
 */
export const palette = {
  white: '#FFFFFF',
  black: '#000000',

  neutral50: '#F6F7F9',
  neutral100: '#ECEEF2',
  neutral200: '#DADDE4',
  neutral300: '#B8BDC8',
  neutral400: '#8C93A1',
  neutral500: '#636B7A',
  neutral600: '#474E5C',
  neutral700: '#2E3440',
  neutral800: '#1C2029',
  neutral850: '#151820',
  neutral900: '#0E1015',
  neutral950: '#08090C',

  lime300: '#D4F779',
  lime400: '#C2F24A',
  lime500: '#A6D92E',
  lime700: '#4D6B0B',

  blue300: '#8DB8FF',
  blue400: '#5B9BFF',
  blue600: '#1F5FD1',

  amber300: '#FFD27A',
  amber400: '#FFB938',
  amber700: '#8A5600',

  red300: '#FF9B9B',
  red400: '#FF6B6B',
  red700: '#B42323',

  green300: '#7BE3A8',
  green400: '#3DD07F',
  green700: '#11713D',

  violet300: '#C3B2FF',
  violet400: '#A48BFF',
  violet700: '#5233C7',
} as const;

/** 4-point spacing scale. */
export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radii = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

/**
 * Minimum interactive size. Apple HIG recommends 44pt and Material recommends
 * 48dp; the larger value is used so controls stay reachable mid-set.
 */
export const touchTarget = {
  min: 48,
  large: 56,
} as const;

export const typography = {
  display: { fontSize: 34, lineHeight: 40, fontWeight: '800' },
  title: { fontSize: 26, lineHeight: 32, fontWeight: '700' },
  heading: { fontSize: 20, lineHeight: 26, fontWeight: '700' },
  subheading: { fontSize: 17, lineHeight: 22, fontWeight: '600' },
  body: { fontSize: 16, lineHeight: 22, fontWeight: '400' },
  bodyStrong: { fontSize: 16, lineHeight: 22, fontWeight: '600' },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: '500' },
  overline: { fontSize: 12, lineHeight: 16, fontWeight: '700', letterSpacing: 0.8 },
  /** Large tabular figures for reps, load, and timers on the active workout screen. */
  metric: { fontSize: 32, lineHeight: 38, fontWeight: '700', fontVariant: ['tabular-nums'] },
} as const;

export type TypographyVariant = keyof typeof typography;

export const durations = {
  fast: 120,
  normal: 200,
  slow: 320,
} as const;
