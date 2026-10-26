import { router } from 'expo-router';

import { Button, EmptyState, Screen } from '@/components/ui';

export default function NotFoundScreen() {
  return (
    <Screen edges={[]} testID="screen-not-found">
      <EmptyState
        icon="compass-outline"
        title="Screen not found"
        description="This link doesn't match any screen in the app."
        action={<Button label="Go home" onPress={() => router.replace('/')} />}
      />
    </Screen>
  );
}
