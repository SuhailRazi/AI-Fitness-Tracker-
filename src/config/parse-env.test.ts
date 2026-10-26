import { describe, expect, it } from 'vitest';

import { EnvError, parseEnv } from './parse-env';

function fakeJwt(payload: Record<string, unknown>): string {
  const encode = (value: object) =>
    btoa(JSON.stringify(value)).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
  return `${encode({ alg: 'HS256', typ: 'JWT' })}.${encode(payload)}.signature`;
}

describe('parseEnv', () => {
  it('allows running without a backend configured', () => {
    expect(parseEnv({})).toEqual({ supabase: null, aiAssistantEnabled: false });
  });

  it('treats blank values as unset', () => {
    expect(
      parseEnv({ EXPO_PUBLIC_SUPABASE_URL: '  ', EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY: '' }),
    ).toEqual({ supabase: null, aiAssistantEnabled: false });
  });

  it('parses a valid Supabase configuration', () => {
    const env = parseEnv({
      EXPO_PUBLIC_SUPABASE_URL: 'https://abc.supabase.co/',
      EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_123',
    });
    expect(env.supabase).toEqual({
      url: 'https://abc.supabase.co',
      publishableKey: 'sb_publishable_123',
    });
  });

  it('requires the URL and key to be set together', () => {
    expect(() => parseEnv({ EXPO_PUBLIC_SUPABASE_URL: 'https://abc.supabase.co' })).toThrow(
      EnvError,
    );
    expect(() => parseEnv({ EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_1' })).toThrow(
      EnvError,
    );
  });

  it('rejects insecure or malformed URLs', () => {
    const key = 'sb_publishable_1';
    expect(() =>
      parseEnv({
        EXPO_PUBLIC_SUPABASE_URL: 'http://abc.supabase.co',
        EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY: key,
      }),
    ).toThrow(/https/);
    expect(() =>
      parseEnv({
        EXPO_PUBLIC_SUPABASE_URL: 'not a url',
        EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY: key,
      }),
    ).toThrow(/valid URL/);
  });

  it('allows http for a local Supabase instance', () => {
    const env = parseEnv({
      EXPO_PUBLIC_SUPABASE_URL: 'http://127.0.0.1:54321',
      EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY: fakeJwt({ role: 'anon' }),
    });
    expect(env.supabase?.url).toBe('http://127.0.0.1:54321');
  });

  it('refuses privileged keys in the client bundle', () => {
    const url = 'https://abc.supabase.co';
    expect(() =>
      parseEnv({
        EXPO_PUBLIC_SUPABASE_URL: url,
        EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY: 'sb_secret_abc',
      }),
    ).toThrow(/privileged/);
    expect(() =>
      parseEnv({
        EXPO_PUBLIC_SUPABASE_URL: url,
        EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY: fakeJwt({ role: 'service_role' }),
      }),
    ).toThrow(/privileged/);
  });

  it('parses the AI assistant flag strictly', () => {
    expect(parseEnv({ EXPO_PUBLIC_AI_ASSISTANT_ENABLED: 'true' }).aiAssistantEnabled).toBe(true);
    expect(parseEnv({ EXPO_PUBLIC_AI_ASSISTANT_ENABLED: '0' }).aiAssistantEnabled).toBe(false);
    expect(() => parseEnv({ EXPO_PUBLIC_AI_ASSISTANT_ENABLED: 'yes' })).toThrow(EnvError);
  });
});
