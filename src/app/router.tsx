import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppShell } from "./layout";
import { LoginPage } from "@/features/auth/login-page";
import { RequireAuth } from "@/features/auth/route-guard";
import { DashboardPage } from "@/features/dashboard/dashboard-page";
import { PrisonersPage } from "@/features/prisoners/prisoners-page";
import { CellsPage } from "@/features/cells/cells-page";
import { StaffPage } from "@/features/staff/staff-page";
import { CasesPage } from "@/features/cases/cases-page";
import { VisitsPage } from "@/features/visits/visits-page";
import { IncidentsPage } from "@/features/incidents/incidents-page";
import { HealthRecordsPage } from "@/features/health-records/health-records-page";
import { DocumentsPage } from "@/features/documents/documents-page";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <RequireAuth>
        <AppShell />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "prisoners",
        element: <PrisonersPage />,
      },
      {
        path: "cells",
        element: <CellsPage />,
      },
      {
        path: "staff",
        element: <StaffPage />,
      },
      {
        path: "cases",
        element: <CasesPage />,
      },
      {
        path: "visits",
        element: <VisitsPage />,
      },
      {
        path: "incidents",
        element: <IncidentsPage />,
      },
      {
        path: "health",
        element: <HealthRecordsPage />,
      },
      {
        path: "documents",
        element: <DocumentsPage />,
      },
    ],
  },
]);
