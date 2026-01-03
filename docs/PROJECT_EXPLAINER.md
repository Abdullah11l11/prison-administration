# Project Overview

- **Project name:** Prison Administration System
- **One-paragraph summary:** A Vite-powered React 19 + TypeScript single-page application that delivers prison administration workflows (dashboard, prisoners, cells, staff, cases, visits, incidents, health records, documents) backed by a configurable, token-aware Axios client for API calls and authentication error handling (`src/main.tsx`, `src/app/router.tsx`, `src/lib/api-client.ts`, `package.json`).
- **Key capabilities:**
  - Auth-gated app shell with responsive sidebar and header framing feature pages (`src/app/layout.tsx`, `src/features/auth/route-guard.tsx`).
  - Feature pages for prisoners, cells, staff, cases, visits, incidents, health records, and documents with list/search, detail views, and CRUD dialogs using React Query mutations (`src/features/*/*-page.tsx`, `src/features/prisoners/prisoner-form-dialog.tsx`, `src/hooks/use-*-form.ts`).
  - Dashboard aggregations (occupancy, active staff, incident counts) derived from API data (`src/features/dashboard/dashboard-page.tsx`).
  - Form validation via Zod + React Hook Form schemas (`src/schema/*.ts`, `src/hooks/use-*-form.ts`).
  - Configurable API base URL and token-aware Axios client with 401 handling and redirect to login (`src/lib/api-client.ts`, `.env.example`).

# What the Project Does

- Provides an authenticated shell; unauthenticated users are redirected to `/login`, and credentials result in a token stored in local storage for the app session flow (`src/features/auth/login-page.tsx`, `src/features/auth/storage.ts`).
- After login, users navigate feature routes (dashboard, prisoners, cells, staff, cases, visits, incidents, health, documents) defined in the router; each page fetches its dataset via React Query and renders searchable tables, badges, and detail sheets (`src/app/router.tsx`, `src/features/prisoners/prisoners-page.tsx`, `src/features/documents/documents-page.tsx`).
- CRUD-style interactions are provided through dialogs driven by shared form hooks and Zod schemas (e.g., prisoner creation/edit with cell capacity checks) that call feature-specific React Query mutations (`src/hooks/use-prisoner-form.ts`, `src/features/prisoners/hooks.ts`, `src/schema/prisoner-schema.ts`).
- The UI uses Tailwind CSS utilities and shadcn-inspired primitives for consistent styling, tables, dialogs, and sheets (`src/components/ui/*.tsx`, `src/index.css`).

# Problem This Project Solves

- **Problem statement:** Not explicitly documented; inferred aim is to centralize prison facility administration (prisoners, cells, staff, cases, visits, incidents, health, documents) into a single web UI (inferred from `README.md` and `src/features/*`). Marked as **Unknown** for authoritative wording.
- **Who is impacted:** Prison operations/admin staff managing inmates, capacity, staff rosters, and related records (inferred from feature names; no explicit stakeholder document).
- **Why existing solutions were insufficient:** Unknown; the repository does not include rationale or comparisons.
- **How this project addresses it:** Unifies key datasets behind a consistent UI with search/filter, detail overlays, and CRUD dialogs, backed by a typed API layer and caching to reduce repeated fetches (`src/features/prisoners/prisoners-page.tsx`, `src/features/dashboard/dashboard-page.tsx`, `src/features/*/api.ts`, `src/features/*/hooks.ts`).

# Architecture & Design Pattern Analysis

## Observed Structure (Evidence)

- Entry point composes global providers (React Query) and router over the root DOM node (`src/main.tsx`, `src/app/providers.tsx`, `src/app/router.tsx`).
- Feature-first folders containing API wrappers, React Query hooks, pages, and supporting components (`src/features/prisoners/api.ts`, `src/features/prisoners/hooks.ts`, `src/features/prisoners/prisoners-page.tsx`, analogous patterns across `src/features/*`).
- Shared infrastructure: token-aware Axios client (`src/lib/api-client.ts`), utility helpers (`src/lib/utils.ts`), and shared TypeScript models (`src/types/index.ts`).
- Validation schemas live in a dedicated layer reused by form hooks (`src/schema/*.ts`, `src/hooks/use-*-form.ts`).
- UI primitives and shared form fields are centralized for consistency (`src/components/ui/*.tsx`, `src/components/shared/*.tsx`).

## Public Design Pattern Name

- **Pattern name:** Feature-based modular React SPA with layered data access (feature-sliced / clean-inspired).
- **Short definition:** Organizes the codebase by business features, each owning its UI and data access, while cross-cutting infrastructure (routing, API client, providers, UI primitives, schemas) lives in shared layers. Data fetching is abstracted behind hooks to decouple presentation from transport.

## How This Project Applies the Pattern

- Routing maps URL paths to feature pages and wraps them in an auth guard and shared shell (`src/app/router.tsx`, `src/app/layout.tsx`, `src/features/auth/route-guard.tsx`).
- Each feature’s presentation layer renders tables, detail sheets, and dialogs; pages call feature-specific hooks instead of raw HTTP (`src/features/prisoners/prisoners-page.tsx`, `src/features/cases/cases-page.tsx`, `src/features/documents/documents-page.tsx`).
- Data layer provides typed API wrappers and React Query hooks that encapsulate endpoints, cache keys, and invalidation logic (`src/features/*/api.ts`, `src/features/*/hooks.ts`).
- Domain/validation layer defines TypeScript models and Zod schemas reused across forms for consistent types and validation (`src/types/index.ts`, `src/schema/*.ts`, `src/hooks/use-*-form.ts`).
- Infrastructure layer offers a shared Axios client with token injection and 401 handling, plus utility helpers (`src/lib/api-client.ts`, `src/lib/utils.ts`).
- Request/data flow: Router renders page → page calls `useFeature` hook → hook executes Axios via `apiClient` with auth header → React Query caches results → UI renders; mutations invalidate relevant caches to refresh lists (`src/features/prisoners/hooks.ts`, `src/lib/api-client.ts`).

## Benefits and Tradeoffs (In This Repo)

- **Benefits:**
  - Clear per-feature ownership; easier maintenance and extension.
  - Reusable data layer with standardized cache keys and invalidation.
  - Consistent form handling and validation.
  - Swap-ready API client configuration.
- **Tradeoffs/risks:**
  - Some duplication of list/table logic across features.
  - Client-side token storage will require careful security/authorization design with a real backend.
  - Unused dependencies (e.g., Zustand) increase maintenance surface.

# Libraries and Dependencies

## Runtime / Production Dependencies

- **Framework/core:** React `^19.2.0`, React DOM `^19.2.0`
- **Routing:** React Router DOM `^7.11.0`
- **Data fetching/cache:** `@tanstack/react-query` `^5.90.16`, devtools `^5.91.2`
- **HTTP:** Axios `^1.13.2`
- **Forms/validation:** React Hook Form `^7.69.0`, `@hookform/resolvers` `^5.2.2`, Zod `^4.3.4`
- **UI/Styling helpers:** `@radix-ui/react-dialog` `^1.1.15`, class-variance-authority `^0.7.1`, tailwind-merge `^3.4.0`, clsx `^2.1.1`
- **Icons/date:** lucide-react `^0.562.0`, date-fns `^4.1.0`
- **State management:** Zustand `^5.0.9` (declared but not referenced in source as of this review)

## Development / Tooling / Test Dependencies

- **Build/tooling:** Vite `^7.2.4`, TypeScript `~5.9.3`, `@vitejs/plugin-react` `^5.1.1`
- **Linting:** ESLint `^9.39.1`, `@eslint/js` `^9.39.1`, `eslint-plugin-react-hooks` `^7.0.1`, `eslint-plugin-react-refresh` `^0.4.24`, `typescript-eslint` `^8.46.4`
- **Styling pipeline:** Tailwind CSS `^4.1.18`, PostCSS `^8.5.6`, Autoprefixer `^10.4.23`, `@tailwindcss/postcss` `^4.1.18`, `tw-animate-css` `^1.4.0`
- **Dev utilities:** concurrently `^9.2.1`, `@types/node` `^24.10.4`, `@types/react` `^19.2.5`, `@types/react-dom` `^19.2.3`

## How the list was derived (Evidence)

- Parsed from `package.json` dependency and devDependency sections and corroborated by lockfile versions (`package.json`, `package-lock.json`).
