import { Redirect } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  Badge,
  Button,
  Card,
  Chip,
  EmptyState,
  IconButton,
  NumberStepper,
  Screen,
  SectionHeader,
  SegmentedControl,
  Text,
} from '@/components/ui';
import { spacing, typography, type TypographyVariant } from '@/theme';

const bodyParts = ['Chest', 'Back', 'Shoulders', 'Arms', 'Core', 'Legs'] as const;
const ranges = [
  { value: '7d', label: '7D' },
  { value: '30d', label: '30D' },
  { value: '90d', label: '90D' },
] as const;

/** Development-only gallery for reviewing components. Not reachable in production builds. */
export default function DesignSystemScreen() {
  const [selectedParts, setSelectedParts] = useState<string[]>(['Back']);
  const [range, setRange] = useState<(typeof ranges)[number]['value']>('30d');
  const [reps, setReps] = useState(8);
  const [load, setLoad] = useState(20);

  if (!__DEV__) return <Redirect href="/" />;

  const togglePart = (part: string) =>
    setSelectedParts((current) =>
      current.includes(part) ? current.filter((p) => p !== part) : [...current, part],
    );

  return (
    <Screen edges={[]} testID="screen-design-system">
      <Badge label="Sample UI only · not your data" tone="sample" />

      <SectionHeader title="Typography" />
      <Card>
        {(Object.keys(typography) as TypographyVariant[]).map((variant) => (
          <Text key={variant} variant={variant}>
            {variant === 'metric' ? '102.5' : variant}
          </Text>
        ))}
      </Card>

      <SectionHeader title="Buttons" />
      <Card>
        <Button label="Primary" icon="play" size="lg" fullWidth />
        <Button label="Secondary" variant="secondary" fullWidth />
        <Button label="Ghost" variant="ghost" fullWidth />
        <Button label="Danger" variant="danger" fullWidth />
        <Button label="Loading" loading fullWidth />
        <Button label="Disabled" disabled fullWidth />
        <View style={styles.row}>
          <IconButton icon="timer-outline" accessibilityLabel="Rest timer" />
          <IconButton icon="checkmark" tone="primary" size="lg" accessibilityLabel="Complete" />
        </View>
      </Card>

      <SectionHeader title="Filters" />
      <View style={styles.wrap}>
        {bodyParts.map((part) => (
          <Chip
            key={part}
            label={part}
            selected={selectedParts.includes(part)}
            onPress={() => togglePart(part)}
          />
        ))}
      </View>
      <SegmentedControl
        accessibilityLabel="Date range"
        options={ranges}
        value={range}
        onChange={setRange}
      />

      <SectionHeader title="Steppers" />
      <Card>
        <NumberStepper label="Reps" value={reps} onChange={setReps} />
        <NumberStepper label="Added load" value={load} onChange={setLoad} step={2.5} unit="kg" />
      </Card>

      <SectionHeader title="Badges" />
      <View style={styles.wrap}>
        <Badge label="Neutral" />
        <Badge label="Synced" tone="success" />
        <Badge label="Pending sync" tone="warning" />
        <Badge label="Conflict" tone="danger" />
        <Badge label="Estimate" tone="info" />
        <Badge label="Sample" tone="sample" />
      </View>

      <SectionHeader title="States" />
      <Card>
        <EmptyState
          icon="cloud-offline-outline"
          title="You're offline"
          description="Changes are saved on this device."
        />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.md },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
