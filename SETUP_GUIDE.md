# Complete Setup Guide - Prison Administration System

## Step-by-Step Setup from Scratch

### 1. Initialize Vite React TypeScript Project

```bash
npm create vite@latest prison-administration -- --template react-ts
cd prison-administration
```

### 2. Install All Required Packages

```bash
# Base dependencies
npm install

# Core dependencies
npm install react-router-dom @tanstack/react-query @tanstack/react-query-devtools axios zustand zod react-hook-form @hookform/resolvers date-fns clsx tailwind-merge lucide-react

# Dev dependencies
npm install -D tailwindcss postcss autoprefixer @types/node json-server concurrently
```

### 3. Configure Tailwind CSS

**tailwind.config.js**:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // ... (see file for complete theme)
      }
    }
  },
  plugins: [],
}
```

**postcss.config.js**:
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**src/index.css**:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    /* ... theme variables ... */
  }
  .dark {
    /* ... dark theme ... */
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### 4. Configure TypeScript Path Aliases

**tsconfig.app.json**:
```json
{
  "compilerOptions": {
    // ... existing config
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**vite.config.ts**:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### 5. Update package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "mock": "json-server --watch mock/db.json --routes mock/routes.json --port 3001",
    "dev:all": "concurrently \"npm run dev\" \"npm run mock\""
  }
}
```

### 6. Create Environment File

**.env**:
```env
VITE_API_BASE_URL=http://localhost:3001
```

### 7. Key Code Files

#### Utility Functions (src/lib/utils.ts)
```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
```

#### API Client (src/lib/api-client.ts)
```typescript
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

#### TanStack Query Provider (src/app/providers.tsx)
```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
```

#### Router Configuration (src/app/router.tsx)
```typescript
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from './layout';
import { LoginPage } from '@/features/auth/login-page';
import { DashboardPage } from '@/features/dashboard/dashboard-page';
import { PrisonersPage } from '@/features/prisoners/prisoners-page';
// ... other imports

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'prisoners',
        element: <PrisonersPage />,
      },
      // ... other routes
    ],
  },
]);
```

#### Main Entry (src/main.tsx)
```typescript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Providers } from './app/providers';
import { router } from './app/router';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>
);
```

### 8. Example Feature Implementation (Prisoners)

#### API Layer (src/features/prisoners/api.ts)
```typescript
import apiClient from '@/lib/api-client';
import { Prisoner } from '@/types';

export const prisonersApi = {
  getAll: async (): Promise<Prisoner[]> => {
    const response = await apiClient.get<Prisoner[]>('/api/prisoners');
    return response.data;
  },

  getById: async (id: number): Promise<Prisoner> => {
    const response = await apiClient.get<Prisoner>(`/api/prisoners/${id}`);
    return response.data;
  },

  create: async (prisoner: Omit<Prisoner, 'id'>): Promise<Prisoner> => {
    const response = await apiClient.post<Prisoner>('/api/prisoners', prisoner);
    return response.data;
  },

  update: async (id: number, prisoner: Partial<Prisoner>): Promise<Prisoner> => {
    const response = await apiClient.patch<Prisoner>(`/api/prisoners/${id}`, prisoner);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/prisoners/${id}`);
  },
};
```

#### React Query Hooks (src/features/prisoners/hooks.ts)
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { prisonersApi } from './api';
import { Prisoner } from '@/types';

export const usePrisoners = () => {
  return useQuery({
    queryKey: ['prisoners'],
    queryFn: prisonersApi.getAll,
  });
};

export const usePrisoner = (id: number) => {
  return useQuery({
    queryKey: ['prisoners', id],
    queryFn: () => prisonersApi.getById(id),
    enabled: !!id,
  });
};

export const useCreatePrisoner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: prisonersApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prisoners'] });
    },
  });
};
```

#### Page Component Pattern (src/features/prisoners/prisoners-page.tsx)
```typescript
import { useState, useMemo } from 'react';
import { usePrisoners } from './hooks';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Search, AlertCircle } from 'lucide-react';

export function PrisonersPage() {
  const { data: prisoners, isLoading, error } = usePrisoners();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrisoners = useMemo(() => {
    if (!prisoners) return [];
    if (!searchQuery) return prisoners;
    const query = searchQuery.toLowerCase();
    return prisoners.filter(p =>
      p.fullName.toLowerCase().includes(query) ||
      p.nationalId.toLowerCase().includes(query)
    );
  }, [prisoners, searchQuery]);

  if (error) return <div>Error loading prisoners</div>;
  if (isLoading) return <Loader2 className="h-8 w-8 animate-spin" />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Prisoners</h1>
      <Input
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Table>
        {/* Table implementation */}
      </Table>
    </div>
  );
}
```

## Running the Application

```bash
# Terminal 1: Start frontend (http://localhost:5173)
npm run dev

# Terminal 2: Start mock API (http://localhost:3001)
npm run mock

# Or run both together:
npm run dev:all
```

## Folder Structure Created

```
src/
├── app/
│   ├── layout.tsx
│   ├── providers.tsx
│   └── router.tsx
├── components/
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── table.tsx
│       ├── badge.tsx
│       └── sheet.tsx
├── features/
│   ├── auth/
│   │   └── login-page.tsx
│   ├── dashboard/
│   │   └── dashboard-page.tsx
│   ├── prisoners/
│   │   ├── api.ts
│   │   ├── hooks.ts
│   │   ├── prisoner-details.tsx
│   │   └── prisoners-page.tsx
│   ├── cells/
│   │   └── cells-page.tsx
│   ├── staff/
│   │   └── staff-page.tsx
│   ├── cases/
│   │   └── cases-page.tsx
│   ├── visits/
│   │   └── visits-page.tsx
│   ├── incidents/
│   │   └── incidents-page.tsx
│   ├── health-records/
│   │   └── health-records-page.tsx
│   └── documents/
│       └── documents-page.tsx
├── lib/
│   ├── api-client.ts
│   └── utils.ts
├── types/
│   └── index.ts
├── main.tsx
└── index.css
```

## Key Features Implemented

1. ✅ Vite + React + TypeScript setup
2. ✅ Tailwind CSS v4 with custom theme
3. ✅ shadcn/ui components (Button, Card, Table, Input, Badge, Sheet)
4. ✅ TanStack Query for data fetching
5. ✅ Axios with interceptors
6. ✅ React Router v7 with nested routes
7. ✅ AppShell layout (responsive sidebar + header)
8. ✅ All feature pages (Prisoners, Cells, Staff, Cases, Visits, Incidents, Health, Documents)
9. ✅ Dashboard with statistics
10. ✅ Login page
11. ✅ Search/filter functionality
12. ✅ Loading/error states
13. ✅ Type-safe API calls
14. ✅ JSON Server mock backend

## Next Steps

After setup, you can:
- Add CRUD operations for each entity
- Implement real authentication
- Add form validation with Zod + React Hook Form
- Create detail edit modals
- Add pagination
- Implement advanced filters
- Connect to real backend API

Everything is ready to run with `npm run dev:all`!
