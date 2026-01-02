# Prison Administration System

A modern, production-ready web application for managing prison administration built with **Vite + React + TypeScript**.

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Routing**: React Router v7
- **State Management**: TanStack Query (React Query) v5
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (custom implementation)
- **Icons**: Lucide React
- **Form Validation**: React Hook Form + Zod
- **Global State**: Zustand
- **Mock Server**: JSON Server

## Features

- Dashboard with statistics and overview
- Prisoner management (list, search, details)
- Cell management with occupancy tracking
- Staff directory
- Legal cases tracking
- Visit scheduling and history
- Incident reporting
- Health records management
- Document repository
- Responsive design with mobile sidebar
- Dark mode support (theme system configured)
- Loading and error states
- Type-safe API calls
- Mock authentication

## Project Structure

```
prison-administration/
├── mock/
│   ├── db.json           # Mock database
│   └── routes.json       # API route mappings
├── src/
│   ├── app/
│   │   ├── layout.tsx     # AppShell with sidebar/header
│   │   ├── providers.tsx  # React Query provider
│   │   └── router.tsx     # React Router configuration
│   ├── components/
│   │   └── ui/            # Reusable UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── table.tsx
│   │       ├── badge.tsx
│   │       └── sheet.tsx
│   ├── features/
│   │   ├── prisoners/
│   │   │   ├── api.ts              # API functions
│   │   │   ├── hooks.ts            # React Query hooks
│   │   │   ├── prisoner-details.tsx
│   │   │   └── prisoners-page.tsx
│   │   ├── cells/
│   │   ├── staff/
│   │   ├── cases/
│   │   ├── visits/
│   │   ├── incidents/
│   │   ├── health-records/
│   │   ├── documents/
│   │   ├── dashboard/
│   │   └── auth/
│   ├── lib/
│   │   ├── api-client.ts  # Axios instance with interceptors
│   │   └── utils.ts       # Utility functions
│   ├── types/
│   │   └── index.ts       # TypeScript type definitions
│   ├── main.tsx
│   └── index.css
├── .env                   # Environment variables
├── package.json
├── tailwind.config.js
├── tsconfig.app.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
cd prison-administration
```

2. Install dependencies
```bash
npm install
```

3. Start the development servers

Option 1: Run both frontend and mock server together
```bash
npm run dev:all
```

Option 2: Run separately in different terminals

Terminal 1 - Frontend (http://localhost:5173):
```bash
npm run dev
```

Terminal 2 - Mock API Server (http://localhost:3001):
```bash
npm run mock
```

4. Open your browser
- Frontend: http://localhost:5173
- Mock API: http://localhost:3001

### Login

The login page accepts any username and password for demonstration purposes.

## Available Scripts

- `npm run dev` - Start Vite development server
- `npm run mock` - Start JSON Server mock API
- `npm run dev:all` - Run both servers concurrently
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Endpoints

The mock server provides the following endpoints (via http://localhost:3001):

- `GET /api/prisoners` - Get all prisoners
- `GET /api/cells` - Get all cells
- `GET /api/staff` - Get all staff
- `GET /api/cases` - Get all cases
- `GET /api/visits` - Get all visits
- `GET /api/incidents` - Get all incidents
- `GET /api/health-records` - Get all health records
- `GET /api/documents` - Get all documents

JSON Server also supports:
- `GET /api/prisoners/:id` - Get prisoner by ID
- `POST /api/prisoners` - Create new prisoner
- `PUT /api/prisoners/:id` - Update prisoner
- `PATCH /api/prisoners/:id` - Partial update
- `DELETE /api/prisoners/:id` - Delete prisoner

## Adding a New Feature/Page

Follow this pattern to add a new feature (e.g., "Programs"):

### 1. Create Type Definition

In `src/types/index.ts`:
```typescript
export interface Program {
  id: number;
  programId: number;
  programName: string;
  description: string;
  // ... other fields
}
```

### 2. Add Mock Data

In `mock/db.json`:
```json
{
  "programs": [
    {
      "id": 1,
      "programId": 1,
      "programName": "Education Program",
      "description": "Basic education courses"
    }
  ]
}
```

In `mock/routes.json`:
```json
{
  "/api/programs": "/programs"
}
```

### 3. Create Feature Folder

Create `src/features/programs/` with:

**api.ts**:
```typescript
import apiClient from '@/lib/api-client';
import { Program } from '@/types';

export const programsApi = {
  getAll: async (): Promise<Program[]> => {
    const response = await apiClient.get<Program[]>('/api/programs');
    return response.data;
  },
  // ... other CRUD operations
};
```

**hooks.ts**:
```typescript
import { useQuery } from '@tanstack/react-query';
import { programsApi } from './api';

export const usePrograms = () => {
  return useQuery({
    queryKey: ['programs'],
    queryFn: programsApi.getAll,
  });
};
```

**programs-page.tsx**:
```typescript
import { usePrograms } from './hooks';
// ... implement list page similar to prisoners-page.tsx
```

### 4. Add Route

In `src/app/router.tsx`:
```typescript
import { ProgramsPage } from '@/features/programs/programs-page';

// Add to routes array:
{
  path: 'programs',
  element: <ProgramsPage />,
}
```

### 5. Add Navigation Link

In `src/app/layout.tsx`:
```typescript
import { BookOpen } from 'lucide-react';

const navigation = [
  // ... existing items
  { name: 'Programs', href: '/programs', icon: BookOpen },
];
```

## Best Practices

### Type Safety
- Always define TypeScript types for your data
- Use the typed API client for all HTTP requests
- Leverage type inference in React Query hooks

### State Management
- Use TanStack Query for server state
- Use React Query's built-in caching
- Invalidate queries after mutations

### Component Structure
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use the shadcn/ui components for consistency

### Error Handling
- Always handle loading and error states
- Show meaningful error messages to users
- Use the `AlertCircle` component for errors

### Styling
- Use Tailwind CSS utility classes
- Follow the existing color scheme (primary, secondary, etc.)
- Maintain responsive design with mobile-first approach

## Environment Variables

Configure in `.env`:
```env
VITE_API_BASE_URL=http://localhost:3001
```

For production, update to your actual API URL.

## Building for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## Key Features Demonstrated

1. **Clean Architecture**: Feature-based folder structure
2. **Type Safety**: Full TypeScript coverage
3. **API Layer**: Centralized Axios configuration with interceptors
4. **State Management**: TanStack Query for server state
5. **Routing**: Nested routes with React Router
6. **UI Components**: Reusable shadcn/ui components
7. **Responsive Design**: Mobile-friendly sidebar and layout
8. **Search & Filter**: Client-side filtering in list pages
9. **Details View**: Slide-out sheet for item details
10. **Loading States**: Spinner indicators during data fetch
11. **Error Boundaries**: Graceful error handling
12. **Mock Server**: Full REST API simulation

## License

This project is for demonstration purposes.

## Support

For issues or questions, please refer to the documentation or create an issue in the repository.
