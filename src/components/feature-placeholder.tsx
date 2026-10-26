import type { ReactNode } from 'react';

import { Badge, EmptyState, Screen, Text, type IconName } from '@/components/ui';

interface FeaturePlaceholderProps {
  title: string;
  icon: IconName;
  heading: string;
  description: string;
  phase: string;
  testID: string;
  children?: ReactNode;
}

/** Honest "not built yet" screen for features scheduled in later phases. */
export function FeaturePlaceholder({
  title,
  icon,
  heading,
  description,
  phase,
  testID,
  children,
}: FeaturePlaceholderProps) {
  return (
    <Screen testID={testID}>
      <Text variant="display" accessibilityRole="header">
        {title}
      </Text>
      <Badge label={`Planned · ${phase}`} tone="info" />
      <EmptyState icon={icon} title={heading} description={description} />
      {children}
    </Screen>
  );
}
