import type { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, View, type ViewStyle } from 'react-native';

import { radii, spacing, useTheme } from '@/theme';

interface CardProps extends PropsWithChildren {
  onPress?: () => void;
  accessibilityLabel?: string;
  style?: ViewStyle;
  testID?: string;
}

export function Card({ children, onPress, accessibilityLabel, style, testID }: CardProps) {
  const { colors } = useTheme();
  const base = [
    styles.card,
    { backgroundColor: colors.surface, borderColor: colors.border },
    style,
  ];

  if (!onPress) {
    return (
      <View style={base} testID={testID}>
        {children}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      testID={testID}
      style={({ pressed }) => [base, pressed && { backgroundColor: colors.surfacePressed }]}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.lg,
    borderWidth: StyleSheet.hairlineWidth,
    padding: spacing.lg,
    gap: spacing.sm,
  },
});
