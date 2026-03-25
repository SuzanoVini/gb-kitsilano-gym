# HANDOFF — GB Kitsilano Gym — 2026-03-25

> Paste this file into a new Claude Code session to resume instantly.

## 1. Project Overview

- **Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS 4, Supabase (PostgreSQL + RLS + auth)
- **Architecture**: Tab-based SPA. Zustand stores (useFilterStore, useUIStore, useSelectionStore, useSidebarStore). Biome linting (strict). No external component library.
- **Key dirs**: `app/components/tabs/` · `app/hooks/` · `app/lib/supabase/` · `supabase/migrations/`
- **Conventions**: No `Co-Authored-By` in commits. Tailwind v4 (`@theme` CSS vars). Working directory: `.worktrees/insights-overhaul` (branch: `feature/insights-overhaul`)

## 2. Current Status

- ✅ **Insights overhaul fully implemented and pushed** — all 13 tasks complete
- ✅ BF-1 through BF-4 bug fixes in `useInsights.ts` + `InsightsTab.tsx`
- ✅ 6 new insights NS-1–NS-6 added to `useInsights.ts`
- ✅ Full dismiss/snooze/done system: migration, Supabase lib, hook, InsightCard, InsightsTab refactor
- ✅ 10 e2e smoke tests written, reviewed, and fixed
- ✅ Branch pushed to `origin/feature/insights-overhaul` — PR not yet opened
- ⚠️ **Supabase project pausing** in production — keep-alive cron exists but `CRON_SECRET` env var is not set on Vercel (see Section 3)
- ❌ 3 pre-existing Jest failures unrelated to this feature (validations, import service, profile page)

## 3. Key Decisions

- **Dismiss system uses hash-based resurfacing**: `insightDataHash()` defined at module level (outside component) to satisfy Biome lint — see `InsightsTab.tsx:23`
- **`rawHolds` param**: `useInsights` accepts optional `rawHolds?: Hold[]` — NS-3 hold return rate uses this to bypass `created_at` date filtering in `useAnalyticsData`. `InsightsTab` passes `allData.holds` (unfiltered).
- **`useAnalyticsData` now exposes `allData`**: added to return value so InsightsTab can pass raw holds — see `useAnalyticsData.ts:128`
- **Optimistic updates in `useDismissedInsights`**: local state updates immediately, Supabase persists in background. On Supabase failure, re-fetches to resync.
- **`UPSERT` on conflict `(user_id, insight_id)`**: unique constraint is critical — see migration `supabase/migrations/20260325000000_dismissed_insights.sql`
- **e2e `admin.spec.ts`**: heading test skips unless `TEST_IS_ADMIN=1` env var set — protects against non-admin credentials

## 4. Next Steps

1. [ ] **Open PR**: `feature/insights-overhaul` → `development` on GitHub (URL shown after push)
2. [ ] **Fix Supabase keep-alive**: run `openssl rand -hex 32`, add result as `CRON_SECRET` in Vercel → Settings → Environment Variables. Cron is already wired in `vercel.json` (`0 12 * * *` daily).
3. [ ] **Apply dismissed_insights migration** in Supabase dashboard (SQL editor) before merging — file: `supabase/migrations/20260325000000_dismissed_insights.sql`
4. [ ] **Fix pre-existing Jest failures** (separate PR): `__tests__/lib/validations.test.ts`, `__tests__/lib/services/import.service.test.ts`, `app/profile/__tests__/page.test.tsx`

- **Watch out for**: NS-3 hold return rate matches by `hold.name` vs `signup.name` — fuzzy name matching, will miss nicknames/typos. A future migration adding `member_id` FK to holds would fix this properly.
- **Watch out for**: `intros.spec.ts` "Add Intro" button label confirmed correct (`IntrosTab.tsx:328`).

## 5. Context Notes

- `SUGGESTIONS.md` in the worktree root has the full e2e review findings and 10 follow-up suggestions
- GB brand: primary red `#dc2626` (`--gb-red`), dark `#1f2937`, navy `#1e3a8a` — all in `app/globals.css` under `@theme`
- `InsightCard.tsx` imports its own `InsightIcons` map (separate from the one in `InsightsTab.tsx`) — if adding new icon types, update both
- The `dismissed_insights` table uses `UPSERT` not INSERT — the unique constraint `(user_id, insight_id)` is what makes this work; do not remove it
- Jest now correctly excludes `e2e/` via `testPathIgnorePatterns: ['/node_modules/', '/e2e/']` in `jest.config.js`
