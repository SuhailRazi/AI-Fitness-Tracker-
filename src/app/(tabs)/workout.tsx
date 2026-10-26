import { FeaturePlaceholder } from '@/components/feature-placeholder';

export default function WorkoutScreen() {
  return (
    <FeaturePlaceholder
      testID="screen-workout"
      title="Workout"
      icon="barbell-outline"
      heading="Routines and live logging"
      description="Create routines, start a session, and log sets, holds, and cardio here."
      phase="Phase 3"
    />
  );
}
