import { FeaturePlaceholder } from '@/components/feature-placeholder';

export default function ProgressScreen() {
  return (
    <FeaturePlaceholder
      testID="screen-progress"
      title="Progress"
      icon="stats-chart-outline"
      heading="Analytics and records"
      description="Personal records, volume, hold durations, and period comparisons calculated from your saved workouts."
      phase="Phase 5"
    />
  );
}
