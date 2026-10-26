import { router } from 'expo-router';

import {
  Card,
  SectionHeader,
  SegmentedControl,
  Screen,
  Text,
  type SegmentOption,
} from '@/components/ui';
import { useThemeContext, type ThemePreference } from '@/theme';

const themeOptions: readonly SegmentOption<ThemePreference>[] = [
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
  { value: 'system', label: 'System' },
];

export default function SettingsScreen() {
  const { preference, setPreference } = useThemeContext();

  return (
    <Screen edges={[]} testID="screen-settings">
      <SectionHeader title="Appearance" />
      <Card>
        <Text variant="bodyStrong">Theme</Text>
        <SegmentedControl
          accessibilityLabel="Theme"
          options={themeOptions}
          value={preference}
          onChange={setPreference}
          testID="theme-control"
        />
        <Text variant="caption" color="textSubtle">
          Your choice applies for this session. Saving it across restarts arrives with local
          storage.
        </Text>
      </Card>

      {__DEV__ ? (
        <>
          <SectionHeader title="Developer" />
          <Card
            accessibilityLabel="Open design system gallery"
            onPress={() => router.push('/design-system')}
            testID="open-design-system">
            <Text variant="bodyStrong">Design system gallery</Text>
            <Text color="textMuted">Preview UI components in both themes.</Text>
          </Card>
        </>
      ) : null}
    </Screen>
  );
}
