import { parseEnv } from './parse-env';

// Expo only inlines EXPO_PUBLIC_* variables accessed with static property syntax,
// so each variable must be referenced explicitly rather than by spreading process.env.
export const env = parseEnv({
  EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
  EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  EXPO_PUBLIC_AI_ASSISTANT_ENABLED: process.env.EXPO_PUBLIC_AI_ASSISTANT_ENABLED,
});
