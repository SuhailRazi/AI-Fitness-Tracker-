import { StyleSheet, View } from 'react-native';

import { applyStep } from '@/lib/stepper';
import { spacing } from '@/theme';

import { IconButton } from './icon-button';
import { Text } from './text';

interface NumberStepperProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  min?: number;
  max?: number;
  /** Unit shown after the value, e.g. "kg" or "s". */
  unit?: string;
  testID?: string;
}

/** Large +/- control for one-handed entry of reps, load, or seconds. */
export function NumberStepper({
  label,
  value,
  onChange,
  step = 1,
  min = 0,
  max,
  unit,
  testID,
}: NumberStepperProps) {
  const bounds = { step, min, max };
  const display = unit ? `${value} ${unit}` : String(value);

  return (
    <View style={styles.container} testID={testID}>
      <Text variant="caption" color="textMuted">
        {label}
      </Text>
      <View style={styles.row}>
        <IconButton
          icon="remove"
          size="lg"
          accessibilityLabel={`Decrease ${label}`}
          disabled={value <= min}
          onPress={() => onChange(applyStep(value, -1, bounds))}
          testID={testID ? `${testID}-decrement` : undefined}
        />
        <Text
          variant="metric"
          align="center"
          style={styles.value}
          accessibilityLiveRegion="polite"
          accessibilityLabel={`${label}: ${display}`}
          testID={testID ? `${testID}-value` : undefined}>
          {display}
        </Text>
        <IconButton
          icon="add"
          size="lg"
          tone="primary"
          accessibilityLabel={`Increase ${label}`}
          disabled={max !== undefined && value >= max}
          onPress={() => onChange(applyStep(value, 1, bounds))}
          testID={testID ? `${testID}-increment` : undefined}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.xs },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  value: { flex: 1 },
});
