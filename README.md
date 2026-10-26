# Workout Tracker

An offline-first mobile app for tracking gym, calisthenics, cardio, and mobility training, with
progress analytics and an optional AI assistant grounded in your saved records.

**Status: Phase 1 (foundation).** Navigation, the design system, configuration, linting, and test
tooling are in place. The database, exercise catalog, authentication, workout logging, analytics, and
AI assistant are not built yet; the corresponding tabs say which phase delivers them.

## Stack

| Concern       | Choice                                                     |
| ------------- | ---------------------------------------------------------- |
| App framework | Expo SDK 58, React Native 0.88, React 19.3                 |
| Language      | TypeScript 6 (`strict`, `noUncheckedIndexedAccess`)        |
| Navigation    | Expo Router (file-based, typed routes), JavaScript tabs    |
| Unit tests    | Vitest — pure TypeScript modules (`*.test.ts`)             |
| UI tests      | jest-expo + React Native Testing Library 14 (`*.test.tsx`) |
| Lint/format   | ESLint 9 flat config (`eslint-config-expo`) + Prettier     |
| Planned       | Supabase (Auth, Postgres, Edge Functions), SQLite, Maestro |

## Getting started

Requires Node 20.19 or newer (developed on Node 24).

```sh
npm install
cp .env.example .env.local   # optional in Phase 1; the app runs without a backend
npm start                    # then press i / a / w, or scan the QR code with Expo Go
```

## Scripts

| Script                    | What it does                                        |
| ------------------------- | --------------------------------------------------- |
| `npm run typecheck`       | `tsc --noEmit`                                      |
| `npm run lint`            | ESLint via `expo lint` (includes Prettier rules)    |
| `npm run format`          | Prettier write                                      |
| `npm test`                | Vitest unit tests, then Jest component/router tests |
| `npm run test:unit`       | Vitest only                                         |
| `npm run test:components` | Jest only                                           |
| `npm run doctor`          | `expo-doctor` dependency and config checks          |
| `npm run check`           | Typecheck, lint, format check, and all tests        |

## Project structure

```
src/
  app/                 Routes only (Expo Router). No tests or shared code here.
    (tabs)/            Home, Workout, Exercises, Progress, Coach
    settings.tsx       Theme preference
    design-system.tsx  Dev-only component gallery (redirects home in production)
  components/
    ui/                Design-system primitives (Text, Button, Card, Chip, ...)
  config/              Typed, validated public environment config
  lib/                 Pure helpers (no React Native imports)
  theme/               Tokens, light/dark themes, provider, WCAG contrast helpers
  test-utils/          Shared render helpers for component tests
  __tests__/           Router integration tests
docs/                  Architecture and phase notes
```

Planned additions are described in [docs/architecture.md](docs/architecture.md).

## Testing conventions

- `*.test.ts` files run under **Vitest** and must not import `react-native`. Keep domain logic
  (calculations, validation, sync rules) in these pure modules.
- `*.test.tsx` files run under **Jest** with the `jest-expo` preset. Use `renderWithTheme` from
  `src/test-utils/render.tsx`, or `renderRouter` from `expo-router/testing-library` for navigation.
- Never place tests inside `src/app/`; every file there is treated as a route.

## Security notes

Every `EXPO_PUBLIC_*` variable is embedded in the app bundle. `src/config/parse-env.ts` refuses to
start if a Supabase secret or service-role key is supplied. AI provider keys must live only in
server-side Edge Function secrets.
