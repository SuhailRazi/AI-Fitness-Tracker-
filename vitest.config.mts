import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

// Vitest covers pure TypeScript modules (*.test.ts) that do not import React Native.
// Component and router tests (*.test.tsx) run under jest-expo; see jest.config.js.
export default defineConfig({
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
