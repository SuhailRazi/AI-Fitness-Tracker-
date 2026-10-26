import { fireEvent, render, screen } from '@testing-library/react-native';
import { Pressable, Text } from 'react-native';

import { AppThemeProvider, useThemeContext } from './theme-provider';

function Probe() {
  const { theme, preference, setPreference } = useThemeContext();
  return (
    <>
      <Text testID="theme">{`${preference}:${theme.name}`}</Text>
      <Pressable accessibilityRole="button" onPress={() => setPreference('light')}>
        <Text>Use light</Text>
      </Pressable>
    </>
  );
}

describe('AppThemeProvider', () => {
  it('defaults to the dark theme', async () => {
    await render(
      <AppThemeProvider>
        <Probe />
      </AppThemeProvider>,
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('dark:dark');
  });

  it('switches theme when the preference changes', async () => {
    await render(
      <AppThemeProvider>
        <Probe />
      </AppThemeProvider>,
    );

    await fireEvent.press(screen.getByRole('button', { name: 'Use light' }));

    expect(screen.getByTestId('theme')).toHaveTextContent('light:light');
  });

  it('throws a clear error when used outside the provider', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    await expect(render(<Probe />)).rejects.toThrow(/within <AppThemeProvider>/);
  });
});
