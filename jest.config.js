/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-expo',
  // Pure *.test.ts modules run under Vitest; Jest only handles React Native component tests.
  testMatch: ['<rootDir>/src/**/*.test.tsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.tsx'],
};
