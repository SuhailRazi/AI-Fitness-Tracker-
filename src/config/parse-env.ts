/**
 * Public client configuration. Everything here ships inside the app bundle, so
 * it must never contain privileged credentials (service-role keys, AI provider keys).
 */
export interface AppEnv {
  supabase: { url: string; publishableKey: string } | null;
  aiAssistantEnabled: boolean;
}

export interface RawEnv {
  EXPO_PUBLIC_SUPABASE_URL?: string;
  EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY?: string;
  EXPO_PUBLIC_AI_ASSISTANT_ENABLED?: string;
}

export class EnvError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EnvError';
  }
}

function blankToUndefined(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function parseSupabaseUrl(value: string): string {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new EnvError('EXPO_PUBLIC_SUPABASE_URL is not a valid URL');
  }
  const isLocal = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
  if (url.protocol !== 'https:' && !(isLocal && url.protocol === 'http:')) {
    throw new EnvError(
      'EXPO_PUBLIC_SUPABASE_URL must use https (http is allowed only for localhost)',
    );
  }
  return url.origin;
}

function decodeJwtRole(token: string): string | undefined {
  const parts = token.split('.');
  const encodedPayload = parts[1];
  if (parts.length !== 3 || !encodedPayload) return undefined;
  try {
    const base64 = encodedPayload.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')));
    return typeof payload?.role === 'string' ? payload.role : undefined;
  } catch {
    return undefined;
  }
}

function assertPublicKey(key: string): string {
  if (key.startsWith('sb_secret_') || decodeJwtRole(key) === 'service_role') {
    throw new EnvError(
      'EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY is a privileged secret key. Use the publishable (anon) key; secret keys belong only in server-side functions.',
    );
  }
  return key;
}

function parseBoolean(name: string, value: string | undefined, fallback: boolean): boolean {
  if (value === undefined) return fallback;
  if (value === 'true' || value === '1') return true;
  if (value === 'false' || value === '0') return false;
  throw new EnvError(`${name} must be "true" or "false"`);
}

export function parseEnv(raw: RawEnv): AppEnv {
  const url = blankToUndefined(raw.EXPO_PUBLIC_SUPABASE_URL);
  const key = blankToUndefined(raw.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

  if ((url === undefined) !== (key === undefined)) {
    throw new EnvError(
      'EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY must be set together',
    );
  }

  return {
    supabase:
      url && key ? { url: parseSupabaseUrl(url), publishableKey: assertPublicKey(key) } : null,
    aiAssistantEnabled: parseBoolean(
      'EXPO_PUBLIC_AI_ASSISTANT_ENABLED',
      blankToUndefined(raw.EXPO_PUBLIC_AI_ASSISTANT_ENABLED),
      false,
    ),
  };
}
