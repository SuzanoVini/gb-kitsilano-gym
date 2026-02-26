# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 gym management system for Gracie Barra Kitsilano built with React 19, TypeScript, Tailwind CSS 4, and Supabase. The application manages intros, signups, cancellations, and membership holds with a tab-based interface.

## Development Commands

```bash
# Development server (uses Turbopack)
npm run dev

# Build production
npm build

# Production server
npm start

# Linting and formatting (uses Biome)
npm run lint              # Check code quality
npm run format            # Format code

# Testing
npm test                  # Run all tests
npm run test:watch        # Run tests in watch mode
npm run test:coverage     # Generate coverage report

# Type checking
npm run typecheck

# All quality checks (lint + typecheck + test)
npm run quality
```

## Environment Setup

Copy `.env.example` to `.env.local` and configure:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Architecture

### Authentication & Authorization
- **Middleware**: `middleware.ts` handles route protection using Supabase auth
  - Protected routes: `/` (home/dashboard)
  - Auth routes: `/login`
  - Redirects unauthenticated users to login
- **Auth Provider**: `app/components/providers/AuthProvider.tsx` manages auth state globally
- **Protected Route**: `app/components/providers/ProtectedRoute.tsx` wraps protected pages
- All database operations require authenticated users (enforced via RLS policies)

### Database Architecture (Supabase)

**Main Tables:**
- `intros`: Trial class bookings with status tracking (Active/Cancelled/Completed)
- `intro_class_history`: Multiple class attendance records per intro
- `follow_up_notes`: Follow-up communication tracking for intros
- `signups`: New member signups with membership types (Integrity/Legacy/Special/ASP)
- `cancellations`: Membership cancellations with reasons and age categories
- `holds`: Membership holds with start/end dates and fees
- `user_profiles`: User profile information (full_name, avatar_url)
- `settings`: Application settings storage

**Key Relationships:**
- `intros` → `intro_class_history` (one-to-many): Track multiple class attendances
- `intros` → `follow_up_notes` (one-to-many): Track follow-up conversations
- `user_profiles` → `auth.users` (one-to-one): User profile data linked to Supabase auth

**Database Functions & Triggers:**
- Auto-sets `created_by` field on INSERT using `set_created_by()` trigger
- Auto-updates `updated_at` field on UPDATE using `set_updated_at()` trigger
- Row Level Security (RLS) enabled on all tables - see `supabase/migrations/enable_rls.sql`

**Type Safety:**
- Database schema defined in `app/lib/supabase/types.ts` as `Database` interface
- Typed Supabase client created in `app/lib/supabase/client.ts`
- Always use the typed client for type-safe queries

### State Management

**Zustand Stores** (located in `app/store/`):
- `useFilterStore`: Global filters (month, staff, class, status, search terms)
- `useSelectionStore`: Multi-select state for bulk operations
- `useUIStore`: UI state (modals, dialogs, loading states)

All stores use devtools middleware for debugging.

### Data Layer Pattern

Each table has a dedicated data access module in `app/lib/supabase/`:
- `intros.ts`: CRUD operations, class history, follow-up notes, real-time subscriptions
- `signups.ts`: Signup CRUD operations
- `cancellations.ts`: Cancellation CRUD operations
- `holds.ts`: Hold CRUD operations
- `profiles.ts`: User profile management, avatar upload/delete, password updates, account deletion
- `settings.ts`: Settings management

**Pagination Pattern:**
- Large datasets use range-based pagination (see `fetchIntros()` example)
- Default page size: 1000 records
- Loop until `data.length < pageSize`

**Real-time Subscriptions:**
- Use Supabase channels for live updates (see `subscribeToIntros()`, `subscribeToFollowUpNotes()`)
- Subscribe in components, unsubscribe on cleanup

### Component Architecture

**Page Structure:**
- `app/page.tsx`: Main dashboard with tab navigation
- `app/layout.tsx`: Root layout with ErrorBoundary, AuthProvider, and Portal
- `app/login/page.tsx`: Login page
- `app/profile/page.tsx`: User profile management page (edit profile, change password, delete account)
- `app/reset-password/page.tsx`: Password reset page

**Tab Components** (`app/components/tabs/`):
- Each tab is a self-contained feature module (OverviewTab, IntrosTab, SignupsTab, etc.)
- Tabs manage their own data fetching, filtering, and display logic

**Form Components** (`app/components/tabs/forms/`):
- Reusable form components for each entity (IntroForm, SignupForm, etc.)
- Forms handle validation and submission

**Modal Components** (`app/components/tabs/modals/`):
- Modal dialogs for detailed views and editing

**Layout Components** (`app/components/layout/`):
- `Header.tsx`: Application header with logo and settings
- `Navigation.tsx`: Sidebar navigation menu
- `ProfileSection.tsx`: User profile widget in sidebar (shows avatar, name, email)
- `Sidebar.tsx`: Main sidebar container with navigation and profile section

**UI Components** (`app/components/ui/`):
- Reusable UI primitives
- `portal.tsx`: Renders modals outside component hierarchy

### Profile Management

**Profile Features:**
- User profile page at `/profile` with comprehensive account management
- Profile information (full name, email, avatar)
- Avatar upload to Supabase Storage (avatars bucket)
- Password change with strength validation
- Account deletion with two-step confirmation

**Data Access Layer** (`app/lib/supabase/profiles.ts`):
- `fetchUserProfile(userId)`: Get user profile by ID
- `updateUserProfile(userId, updates)`: Update profile fields (full_name, avatar_url)
- `createUserProfile(profileData)`: Create new user profile
- `uploadProfileAvatar(userId, file)`: Upload avatar to storage and update profile
- `deleteProfileAvatar(userId)`: Remove avatar from storage and database
- `updateUserPassword(newPassword)`: Update user password with validation
- `deleteUserAccount(userId)`: Delete user profile, avatar, and auth account
- `subscribeToProfile(userId, callback)`: Real-time profile updates

**Avatar Management:**
- Stored in Supabase Storage `avatars` bucket
- File validation: max 5MB, types: JPEG, PNG, WebP, GIF
- Auto-deletes old avatar when uploading new one
- File naming: `{userId}_{timestamp}.{ext}`

**Password Validation:**
- Minimum 8 characters
- Must contain uppercase, lowercase, and number
- Strength indicator in UI (Very Weak → Strong)

**Account Deletion:**
- Two-step confirmation process
- Requires typing "DELETE" to confirm
- Deletes avatar, profile, and auth account
- Cannot be undone

**Profile Components:**
- `ProfileSection.tsx`: Sidebar widget showing avatar and user info
- `ProfilePage`: Full profile management page at `/profile`

### CSV Import Functionality

Location: `app/lib/csv.ts`

**CSV Parsing:**
- Uses PapaParse library for CSV parsing
- Auto-detects delimiters (`,`, `\t`, `|`, `;`)
- Handles multiple date formats (MM/DD/YYYY, etc.)
- Normalizes dates to YYYY-MM-DD for database storage
- Filters out rows with empty names or aggregate rows (e.g., "total", "avg")
- Maps various column name formats (case-insensitive, flexible naming)

**Usage Pattern:**
```typescript
parseCSV(file, (parsedData) => {
  // parsedData is normalized and ready for database insertion
});
```

### Error Handling

- `app/lib/errorHandler.ts`: Centralized error handling utilities
- `app/components/ErrorBoundary.tsx`: React error boundary for catching render errors
- `app/lib/logger.ts`: Logging utilities

### Validation

- `app/lib/validations.ts`: Zod schemas for form validation
- All forms validate using Zod before submission

### Code Style

**Biome Configuration** (`biome.json`):
- **Formatter**: 2 spaces, 100 char line width, single quotes (JS), double quotes (JSX)
- **Linting**: Strict rules enabled for complexity, correctness, security, style, suspicious patterns
- **Auto-organize imports** on save
- **Test globals** configured: `describe`, `it`, `expect`, `jest`, etc.

**TypeScript Configuration**:
- Strict mode enabled
- Path alias: `@/*` maps to `./app/*`
- No implicit any, returns, or this
- Unused locals/parameters flagged
- Exact optional property types enforced

### Testing

**Jest Configuration** (`jest.config.js`):
- Test environment: jsdom (for React components)
- Setup file: `jest.setup.js`
- Path mapping: `@/*` → `<rootDir>/`
- Coverage thresholds: 70% across branches, functions, lines, statements
- Excludes: layout.tsx, loading.tsx, not-found.tsx, type definitions

**Running Tests:**
- Single test: `npm test -- path/to/test.test.ts`
- Watch mode: `npm run test:watch`
- Coverage: `npm run test:coverage`

### Pre-commit Hooks

**Husky + lint-staged** configured:
- Auto-formats and lints staged files before commit
- Runs: `biome format --write` → `biome check --apply`

## Important Notes

1. **Always use typed Supabase client** from `app/lib/supabase/client.ts` for type safety
2. **CSV imports** may have flexible column naming - check `app/lib/csv.ts` for mappings
3. **RLS policies** require authenticated users - all data access goes through Supabase auth
4. **Database triggers** auto-set `created_by` and `updated_at` fields - don't manually set these
5. **Real-time updates** available via Supabase subscriptions - use for live data sync
6. **Zustand stores** are the single source of truth for filters and UI state
7. **Path alias**: Use `@/` instead of relative paths (e.g., `@/lib/utils` not `../../lib/utils`)
8. **Turbopack**: Development and build use Turbopack for faster builds
