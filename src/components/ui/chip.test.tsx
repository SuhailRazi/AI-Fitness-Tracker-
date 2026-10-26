import { fireEvent, screen } from '@testing-library/react-native';

import { renderWithTheme } from '@/test-utils/render';

import { Chip } from './chip';

describe('<Chip />', () => {
  it('reports its selected state to assistive technology', async () => {
    const onPress = jest.fn();
    await renderWithTheme(<Chip label="Back" selected onPress={onPress} />);

    const chip = screen.getByRole('checkbox', { name: 'Back' });
    expect(chip).toBeChecked();

    await fireEvent.press(chip);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('is unchecked by default', async () => {
    await renderWithTheme(<Chip label="Legs" />);

    expect(screen.getByRole('checkbox', { name: 'Legs' })).not.toBeChecked();
  });
});
