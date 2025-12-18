// src/router.tsx
import {
  createBrowserRouter,
  isRouteErrorResponse,
  Navigate,
  useRouteError,
} from "react-router";
import { routes } from "./route-names";

import LoginPage from "@/pages/login.page";

import AccessoryOrdersPage from "@/pages/accessory-orders.page";
import AccessoryOrderDetailPage from "@/pages/accessory-order-detail.page";

import AdsBannersPage from "@/pages/ads-banners.page";
import AdsNotificationsPage from "@/pages/ads-notifications.page";

import CarsPage from "@/pages/cars.page";

import CustomersPage from "@/pages/customers.page";
import CustomerDetailPage from "@/pages/customer-detail.page";

import OrdersPage from "@/pages/orders.page";
import OrderDetailsPage from "@/pages/order-detail.page";

import ReviewsPage from "@/pages/reviews.page";

import ServicesPage from "@/pages/services.page";
import ServiceDetailsPage from "@/pages/service-detail.page";

import SettingsPage from "@/pages/settings.page";

import StationsPage from "@/pages/stations.page";
import AuthPageShell from "@/components/layout/auth-page-shell.layout";
import DashboardLayout from "@/components/layout/dashboard.layout";
import ControlPage from "@/pages/control.page";
import AccessoriesPage from "@/pages/accessories.page";
import ServiceTimesPage from "@/pages/service-times.page";
import PackagesPage from "@/pages/packages.page";
import ForgotPasswordPage from "@/pages/forgot-password.page";
import ErrorPage from "@/pages/error.page";
import LoadingPage from "@/pages/loading.page";
import GlobalNotFoundPage from "@/pages/not-found.page";

const RouterErrorBoundary = () => {
  const routeError = useRouteError();

  if (isRouteErrorResponse(routeError) && routeError.status === 404) {
    return <GlobalNotFoundPage />;
  }

  const error =
    routeError instanceof Error
      ? routeError
      : new Error("An unexpected error occurred.");

  return (
    <ErrorPage
      error={error}
      reset={() => {
        window.location.reload();
      }}
    />
  );
};

export const router = createBrowserRouter([
  {
    path: routes.login.path,
    HydrateFallback: LoadingPage,
    ErrorBoundary: RouterErrorBoundary,
    Component: AuthPageShell,
    children: [
      {
        index: true,
        Component: LoginPage,
      },
    ],
  },
  {
    path: routes.forgotPassword.path,
    HydrateFallback: LoadingPage,
    ErrorBoundary: RouterErrorBoundary,
    Component: AuthPageShell,
    children: [
      {
        index: true,
        Component: ForgotPasswordPage,
      },
    ],
  },

  {
    HydrateFallback: LoadingPage,
    ErrorBoundary: RouterErrorBoundary,
    Component: DashboardLayout,
    children: [
      {
        path: routes.home.path,
        Component: ControlPage,
      },

      // /accessory-orders و /accessory-orders/:id
      {
        path: routes.accessoryOrders.path,
        Component: AccessoryOrdersPage,
      },
      {
        path: routes.accessoryOrderDetail.path,
        Component: AccessoryOrderDetailPage,
      },
      {
        path: routes.accessories.path,
        Component: AccessoriesPage,
      },

      {
        path: routes.ads.path, // "/ads"
        Component: () => <Navigate to={routes.adsBanners.path} replace />,
      },
      {
        path: routes.adsBanners.path, // "/ads/banners"
        Component: AdsBannersPage,
      },
      {
        path: routes.adsNotifications.path, // "/ads/notifications"
        Component: AdsNotificationsPage,
      },

      // /cars
      {
        path: routes.cars.path,
        Component: CarsPage,
      },

      // /customers و /customers/:id
      {
        path: routes.customers.path,
        Component: CustomersPage,
      },
      {
        path: routes.customerDetail.path,
        Component: CustomerDetailPage,
      },

      // /orders و /orders/:id
      {
        path: routes.orders.path,
        Component: OrdersPage,
      },
      {
        path: routes.orderDetail.path,
        Component: OrderDetailsPage,
      },

      // /reviews
      {
        path: routes.reviews.path,
        Component: ReviewsPage,
      },
      {
        path: routes.serviceTimes.path,
        Component: ServiceTimesPage,
      },
      {
        path: routes.packages.path,
        Component: PackagesPage,
      },

      // /services و /services/:id
      {
        path: routes.services.path,
        Component: ServicesPage,
      },
      {
        path: routes.serviceDetail.path,
        Component: ServiceDetailsPage,
      },

      // /settings
      {
        path: routes.settings.path,
        Component: SettingsPage,
      },

      // /stations
      {
        path: routes.stations.path,
        Component: StationsPage,
      },
    ],
  },
  {
    path: "*",
    HydrateFallback: LoadingPage,
    ErrorBoundary: RouterErrorBoundary,
    Component: GlobalNotFoundPage,
  },
]);
