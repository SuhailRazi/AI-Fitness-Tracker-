import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { radii, spacing, useTheme } from '@/theme';

import { Icon, type IconName } from './icon';
import { Text } from './text';

interface EmptyStateProps {
  icon: IconName;
  title: string;
  description?: string;
  action?: ReactNode;
  testID?: string;
}

/** Shared empty, offline, and not-yet-available state. */
export function EmptyState({ icon, title, description, action, testID }: EmptyStateProps) {
  const { colors } = useTheme();
  return (
    <View style={styles.container} testID={testID} accessibilityRole="summary">
      <View style={[styles.iconWrap, { backgroundColor: colors.surfaceRaised }]}>
        <Icon name={icon} size={32} color={colors.textMuted} />
      </View>
      <Text variant="heading" align="center">
        {title}
      </Text>
      {description ? (
        <Text color="textMuted" align="center">
          {description}
        </Text>
      ) : null}
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
});
