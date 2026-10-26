import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { spacing } from '@/theme';

import { Text } from './text';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  trailing?: ReactNode;
}

export function SectionHeader({ title, subtitle, trailing }: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <View style={styles.text}>
        <Text variant="heading" accessibilityRole="header">
          {title}
        </Text>
        {subtitle ? <Text color="textMuted">{subtitle}</Text> : null}
      </View>
      {trailing}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  text: { flex: 1, gap: spacing.xxs },
});
