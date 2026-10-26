import type { PropsWithChildren, ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { spacing, useTheme } from '@/theme';

interface ScreenProps extends PropsWithChildren {
  /** Wrap content in a ScrollView. Disable for screens that manage their own lists. */
  scroll?: boolean;
  /** Content pinned below the scrollable area, e.g. a primary action. */
  footer?: ReactNode;
  edges?: Edge[];
  testID?: string;
}

const MAX_CONTENT_WIDTH = 720;

export function Screen({ children, scroll = true, footer, edges = ['top'], testID }: ScreenProps) {
  const { colors } = useTheme();

  const content = scroll ? (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      contentInsetAdjustmentBehavior="automatic">
      <View style={styles.inner}>{children}</View>
    </ScrollView>
  ) : (
    <View style={[styles.inner, styles.fill]}>{children}</View>
  );

  return (
    <SafeAreaView
      edges={edges}
      style={[styles.fill, { backgroundColor: colors.background }]}
      testID={testID}>
      {content}
      {footer ? (
        <View style={[styles.footer, { borderTopColor: colors.border }]}>{footer}</View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: spacing.xxl },
  inner: {
    width: '100%',
    maxWidth: MAX_CONTENT_WIDTH,
    alignSelf: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    gap: spacing.lg,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
