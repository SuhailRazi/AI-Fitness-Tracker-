# Architecture

This document records the target architecture and what each phase delivers. Sections marked
**Planned** describe intent, not existing code.

## Layers

```
Routes (src/app)            Thin screens: read state, call hooks, render components
  └─ Features (src/features)    Planned. Per-module hooks, screens, and view models
       └─ Domain (src/domain)       Planned. Pure TypeScript: types, calculations, validation
       └─ Data (src/data)           Planned. Repositories over SQLite and Supabase, sync queue
Design system (src/components/ui, src/theme)
Config (src/config)
```

Rules:

- **Domain modules are pure.** No React, React Native, or I/O imports, so they run under Vitest
  and can be shared with Supabase Edge Functions. Metrics such as volume, e1RM, and personal
  records are calculated here, deterministically, before anything reaches the AI layer.
- **Screens never talk to storage directly.** They go through repositories so the offline
  store stays the source of truth during a workout.
- **Components use semantic theme colors**, never raw palette values.

## Navigation (implemented)

| Route            | Purpose                      | Delivered in |
| ---------------- | ---------------------------- | ------------ |
| `/` (Home)       | Today summary                | Phase 3/5    |
| `/workout`       | Routines and active workout  | Phase 3      |
| `/exercises`     | Exercise library and filters | Phase 2/4    |
| `/progress`      | Analytics, PRs, comparisons  | Phase 5      |
| `/coach`         | AI assistant (optional)      | Phase 6      |
| `/settings`      | Preferences, privacy, export | Phase 1+     |
| `/design-system` | Dev-only component gallery   | Phase 1      |

Planned additions include an `(auth)` group guarded with Expo Router protected routes and a modal
route for the active workout so it can be reopened from any tab.

## Design system (implemented)

- `src/theme/tokens.ts`: palette, 4-point spacing, radii, typography (including tabular `metric`
  figures for reps, load, and timers), and a 48 pt minimum touch target.
- `src/theme/themes.ts`: dark (default) and light semantic colors. A dedicated `sample` color
  labels demo data so it can't be mistaken for real records.
- `src/theme/themes.test.ts`: checks every text and UI color pair against WCAG AA contrast.
- Primitives: `Text`, `Button`, `IconButton`, `Card`, `Chip`, `Badge`, `SegmentedControl`,
  `NumberStepper`, `EmptyState`, `SectionHeader`, `Screen`, `Icon`.

## Planned data architecture

- **Local:** `expo-sqlite` holds active sessions, history, and a sync outbox. Every write gets a
  client-generated UUID and an `updated_at`, so retries are idempotent.
- **Cloud:** Supabase Postgres with migrations, foreign keys, check constraints, and Row Level
  Security scoped to `auth.uid()`. The global catalog can be modified only by an admin role.
- **Sync:** an outbox processed with exponential backoff. Edits that conflict with a newer server
  copy are kept as conflicts for the user to resolve, never silently overwritten.
- **AI:** a Supabase Edge Function authenticates the user, rate-limits requests, loads
  pre-computed metrics for the question, strips identifying data, and calls the provider. The
  provider key exists only in Edge Function secrets.

## Phase checklist

- [x] Phase 1: Expo/TypeScript foundation, navigation, design system, lint, test tooling
- [ ] Phase 2: Schema, RLS, taxonomy, reviewed exercise catalog and seed/import scripts
- [ ] Phase 3: Auth, profile, templates, active workout, set logging, history
- [ ] Phase 4: Calisthenics tracking modes, progressions, holds, weighted/assisted load
- [ ] Phase 5: Analytics, PRs, e1RM, period comparisons, charts
- [ ] Phase 6: Secure AI assistant with grounded, evidence-based answers
- [ ] Phase 7: Offline sync hardening, Maestro E2E, accessibility, privacy, release prep
