import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { EmptyState, IconButton, Screen, Text } from '@/components/ui';
import { spacing } from '@/theme';

export default function HomeScreen() {
  return (
    <Screen testID="screen-home">
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text variant="overline" color="textSubtle">
            WORKOUT TRACKER
          </Text>
          <Text variant="display" accessibilityRole="header">
            Today
          </Text>
        </View>
        <IconButton
          icon="settings-outline"
          accessibilityLabel="Open settings"
          onPress={() => router.push('/settings')}
          testID="open-settings"
        />
      </View>
      <EmptyState
        icon="calendar-outline"
        title="No workouts yet"
        description="Your training summary will appear here once workout logging is available."
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  headerText: { flex: 1 },
});
