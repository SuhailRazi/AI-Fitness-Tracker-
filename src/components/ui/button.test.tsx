import { fireEvent, screen } from '@testing-library/react-native';

import { renderWithTheme } from '@/test-utils/render';

import { Button } from './button';

describe('<Button />', () => {
  it('exposes an accessible button and handles presses', async () => {
    const onPress = jest.fn();
    await renderWithTheme(<Button label="Start workout" onPress={onPress} />);

    await fireEvent.press(screen.getByRole('button', { name: 'Start workout' }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not fire when disabled and reports the disabled state', async () => {
    const onPress = jest.fn();
    await renderWithTheme(<Button label="Save" onPress={onPress} disabled />);

    const button = screen.getByRole('button', { name: 'Save' });
    await fireEvent.press(button);

    expect(onPress).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it('marks itself busy and blocks presses while loading', async () => {
    const onPress = jest.fn();
    await renderWithTheme(<Button label="Syncing" onPress={onPress} loading />);

    const button = screen.getByRole('button', { name: 'Syncing' });
    await fireEvent.press(button);

    expect(onPress).not.toHaveBeenCalled();
    expect(button).toBeBusy();
  });
});
