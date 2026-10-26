import { Pressable, StyleSheet } from 'react-native';

import { radii, spacing, touchTarget, useTheme } from '@/theme';

import { Text } from './text';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  testID?: string;
}

/** Toggleable filter chip, e.g. for body-part and equipment filters. */
export function Chip({ label, selected = false, onPress, testID }: ChipProps) {
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="checkbox"
      aria-checked={selected}
      accessibilityLabel={label}
      onPress={onPress}
      hitSlop={{ top: 6, bottom: 6 }}
      testID={testID}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: selected
            ? colors.primary
            : pressed
              ? colors.surfacePressed
              : colors.surfaceRaised,
          borderColor: selected ? colors.primary : colors.border,
        },
      ]}>
      <Text variant="caption" style={{ color: selected ? colors.onPrimary : colors.text }}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: touchTarget.min - 12,
    paddingHorizontal: spacing.md,
    borderRadius: radii.pill,
    borderWidth: 1,
    justifyContent: 'center',
  },
});
