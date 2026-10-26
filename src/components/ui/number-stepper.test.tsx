import { fireEvent, screen } from '@testing-library/react-native';
import { useState } from 'react';

import { renderWithTheme } from '@/test-utils/render';

import { NumberStepper } from './number-stepper';

function Harness({ initial, max }: { initial: number; max?: number }) {
  const [value, setValue] = useState(initial);
  return (
    <NumberStepper
      label="Load"
      value={value}
      onChange={setValue}
      step={2.5}
      max={max}
      unit="kg"
      testID="load"
    />
  );
}

describe('<NumberStepper />', () => {
  it('steps the value up and down with accessible controls', async () => {
    await renderWithTheme(<Harness initial={20} />);

    await fireEvent.press(screen.getByRole('button', { name: 'Increase Load' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Increase Load' }));
    expect(screen.getByTestId('load-value')).toHaveTextContent('25 kg');

    await fireEvent.press(screen.getByRole('button', { name: 'Decrease Load' }));
    expect(screen.getByTestId('load-value')).toHaveTextContent('22.5 kg');
  });

  it('disables decrement at the minimum', async () => {
    await renderWithTheme(<Harness initial={0} />);

    expect(screen.getByRole('button', { name: 'Decrease Load' })).toBeDisabled();
  });

  it('disables increment at the maximum', async () => {
    await renderWithTheme(<Harness initial={100} max={100} />);

    expect(screen.getByRole('button', { name: 'Increase Load' })).toBeDisabled();
  });
});
