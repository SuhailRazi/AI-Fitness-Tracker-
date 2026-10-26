import { render, type RenderOptions } from '@testing-library/react-native';
import type { ReactElement } from 'react';

import { AppThemeProvider, type ThemePreference } from '@/theme';

interface ThemedRenderOptions extends RenderOptions {
  themePreference?: ThemePreference;
}

export function renderWithTheme(
  ui: ReactElement,
  { themePreference, ...options }: ThemedRenderOptions = {},
) {
  return render(
    <AppThemeProvider initialPreference={themePreference}>{ui}</AppThemeProvider>,
    options,
  );
}
