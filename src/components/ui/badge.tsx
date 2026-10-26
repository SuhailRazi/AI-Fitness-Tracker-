import { StyleSheet, View } from 'react-native';

import { radii, spacing, useTheme, type ThemeColors } from '@/theme';

import { Text } from './text';

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'sample';

const toneColor: Record<Exclude<BadgeTone, 'neutral'>, keyof ThemeColors> = {
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'info',
  sample: 'sample',
};

interface BadgeProps {
  label: string;
  tone?: BadgeTone;
  testID?: string;
}

export function Badge({ label, tone = 'neutral', testID }: BadgeProps) {
  const { colors } = useTheme();
  const bg = tone === 'neutral' ? colors.surfaceRaised : colors[toneColor[tone]];
  const fg = tone === 'neutral' ? colors.textMuted : colors.onStatus;

  return (
    <View style={[styles.badge, { backgroundColor: bg }]} testID={testID}>
      <Text variant="overline" style={{ color: fg }}>
        {label.toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radii.sm,
  },
});
