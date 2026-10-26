import { FeaturePlaceholder } from '@/components/feature-placeholder';
import { Text } from '@/components/ui';
import { env } from '@/config/env';

export default function CoachScreen() {
  return (
    <FeaturePlaceholder
      testID="screen-coach"
      title="Coach"
      icon="chatbubbles-outline"
      heading="AI fitness assistant"
      description="Ask questions about your training. Answers will be grounded in metrics calculated from your saved records."
      phase="Phase 6">
      <Text variant="caption" color="textSubtle" align="center" testID="ai-status">
        {env.aiAssistantEnabled
          ? 'AI assistant is enabled for this build.'
          : 'AI features are optional and currently turned off.'}
      </Text>
    </FeaturePlaceholder>
  );
}
