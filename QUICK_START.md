# Quick Start Guide

## Installation & Running

```bash
# Install dependencies
npm install

# Run both frontend and backend
npm run dev:all
```

Then open:
- **Frontend**: http://localhost:5173
- **Mock API**: http://localhost:3001

## Login
Use any username/password to login (it's a demo).

## Package Scripts

```json
{
  "dev": "vite",                    // Frontend only
  "mock": "json-server ...",        // Mock API only
  "dev:all": "concurrently ...",    // Both servers
  "build": "tsc -b && vite build"   // Production build
}
```

## File Organization

```
src/
├── app/              # App setup (router, providers, layout)
├── features/         # Feature modules (prisoners, cells, etc.)
│   └── prisoners/
│       ├── api.ts              # API calls
│       ├── hooks.ts            # React Query hooks
│       └── prisoners-page.tsx  # UI component
├── components/ui/    # Shared UI components
├── lib/              # Utils and API client
└── types/            # TypeScript types
```

## Key Files

1. **src/lib/api-client.ts** - Axios instance with baseURL and interceptors
2. **src/app/providers.tsx** - TanStack Query setup
3. **src/app/router.tsx** - All routes
4. **src/app/layout.tsx** - AppShell (sidebar + header)
5. **src/types/index.ts** - All TypeScript interfaces

## Environment Variables

```env
VITE_API_BASE_URL=http://localhost:3001
```

## Adding a New Page (Example: Programs)

### 1. Add Type
```typescript
// src/types/index.ts
export interface Program {
  id: number;
  name: string;
}
```

### 2. Add Mock Data
```json
// mock/db.json
{
  "programs": [...]
}

// mock/routes.json
{
  "/api/programs": "/programs"
}
```

### 3. Create Feature Files
```
src/features/programs/
├── api.ts              # programsApi.getAll()
├── hooks.ts            # usePrograms()
└── programs-page.tsx   # List component
```

### 4. Add Route
```typescript
// src/app/router.tsx
{
  path: 'programs',
  element: <ProgramsPage />,
}
```

### 5. Add Navigation
```typescript
// src/app/layout.tsx
{ name: 'Programs', href: '/programs', icon: BookOpen }
```

## Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + TypeScript |
| Build | Vite 7 |
| Routing | React Router v7 |
| State | TanStack Query v5 |
| HTTP | Axios |
| Styling | Tailwind CSS v4 |
| UI | shadcn/ui (custom) |
| Icons | Lucide React |
| Forms | React Hook Form + Zod |
| Mock API | JSON Server |

## Example API Calls

```typescript
// Using the API module
import { prisonersApi } from '@/features/prisoners/api';
const prisoners = await prisonersApi.getAll();

// Using React Query hook
import { usePrisoners } from '@/features/prisoners/hooks';
const { data, isLoading, error } = usePrisoners();
```

## Implemented Features

✅ Dashboard with statistics
✅ Prisoners (with details drawer)
✅ Cells
✅ Staff
✅ Cases
✅ Visits
✅ Incidents
✅ Health Records
✅ Documents
✅ Login page
✅ Responsive sidebar
✅ Search/filter
✅ Loading/error states

## Next Steps

1. Add CRUD operations (create/edit/delete)
2. Implement real authentication
3. Add form validation with Zod
4. Connect to real backend API
5. Add pagination for large datasets
6. Implement advanced filters
7. Add data export functionality
8. Create print-friendly views
