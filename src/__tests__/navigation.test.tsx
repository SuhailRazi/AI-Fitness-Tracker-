import { fireEvent, renderRouter, screen, testRouter } from 'expo-router/testing-library';

describe('app navigation', () => {
  it('opens on the home tab', async () => {
    await renderRouter('./src/app');

    expect(screen).toHavePathname('/');
    expect(screen.getByTestId('screen-home')).toBeOnTheScreen();
  });

  it.each([
    ['/workout', 'screen-workout'],
    ['/exercises', 'screen-exercises'],
    ['/progress', 'screen-progress'],
    ['/coach', 'screen-coach'],
  ])('routes %s to its tab screen', async (path, testID) => {
    await renderRouter('./src/app');
    await testRouter.navigate(path);

    expect(screen).toHavePathname(path);
    expect(screen.getByTestId(testID)).toBeOnTheScreen();
  });

  it('opens settings from home and changes the theme', async () => {
    await renderRouter('./src/app');

    await fireEvent.press(screen.getByRole('button', { name: 'Open settings' }));
    expect(screen).toHavePathname('/settings');

    expect(screen.getByRole('radio', { name: 'Dark' })).toBeChecked();
    const light = screen.getByRole('radio', { name: 'Light' });
    expect(light).not.toBeChecked();
    await fireEvent.press(light);
    expect(light).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Dark' })).not.toBeChecked();
  });

  it('reports the AI assistant as off unless explicitly enabled', async () => {
    await renderRouter('./src/app', { initialUrl: '/coach' });

    expect(screen.getByTestId('ai-status')).toHaveTextContent(/turned off/);
  });

  it('shows the not-found screen for unknown links', async () => {
    await renderRouter('./src/app', { initialUrl: '/does-not-exist' });

    expect(screen.getByTestId('screen-not-found')).toBeOnTheScreen();
  });
});
