import { DarkTheme, DefaultTheme } from 'expo-router';

import type { Theme } from './themes';

type NavigationTheme = typeof DarkTheme;

/** Maps app theme colors onto the React Navigation theme used by Expo Router. */
export function toNavigationTheme(theme: Theme): NavigationTheme {
  const base = theme.name === 'dark' ? DarkTheme : DefaultTheme;
  return {
    ...base,
    dark: theme.name === 'dark',
    colors: {
      ...base.colors,
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.text,
      border: theme.colors.border,
      notification: theme.colors.danger,
    },
  };
}
