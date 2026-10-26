import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';
import { useColorScheme } from 'react-native';

import {
  DEFAULT_THEME_PREFERENCE,
  resolveThemeName,
  themes,
  type Theme,
  type ThemePreference,
} from './themes';

interface ThemeContextValue {
  theme: Theme;
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface AppThemeProviderProps extends PropsWithChildren {
  initialPreference?: ThemePreference;
}

export function AppThemeProvider({
  children,
  initialPreference = DEFAULT_THEME_PREFERENCE,
}: AppThemeProviderProps) {
  const systemScheme = useColorScheme();
  const [preference, setPreference] = useState<ThemePreference>(initialPreference);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme: themes[resolveThemeName(preference, systemScheme)],
      preference,
      setPreference,
    }),
    [preference, systemScheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within <AppThemeProvider>');
  }
  return context;
}

export function useTheme(): Theme {
  return useThemeContext().theme;
}
