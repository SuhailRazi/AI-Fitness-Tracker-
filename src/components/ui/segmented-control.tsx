import { Pressable, StyleSheet, View } from 'react-native';

import { radii, spacing, touchTarget, useTheme } from '@/theme';

import { Text } from './text';

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  options: readonly SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  accessibilityLabel: string;
  testID?: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  accessibilityLabel,
  testID,
}: SegmentedControlProps<T>) {
  const { colors } = useTheme();
  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      style={[styles.track, { backgroundColor: colors.surfaceRaised, borderColor: colors.border }]}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="radio"
            aria-checked={selected}
            accessibilityLabel={option.label}
            onPress={() => onChange(option.value)}
            testID={testID ? `${testID}-${option.value}` : undefined}
            style={[styles.segment, selected && { backgroundColor: colors.primary }]}>
            <Text variant="bodyStrong" style={{ color: selected ? colors.onPrimary : colors.text }}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    borderRadius: radii.md,
    borderWidth: StyleSheet.hairlineWidth,
    padding: spacing.xxs,
  },
  segment: {
    flex: 1,
    minHeight: touchTarget.min - 4,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
