// src/routes/config/routeConfig.ts
import { lazy } from 'react';
import { ROUTES } from '@/shared/constants/app.constants';

// Lazy load feature components
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));
const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage'));
const UserManagementPage = lazy(() => import('@/features/user-management/pages/UserManagementPage'));
const SettingsPage = lazy(() => import('@/features/settings/pages/SettingsPage'));
const UnauthorizedPage = lazy(() => import('@/features/error/pages/UnauthorizedPage'));
const NotFoundPage = lazy(() => import('@/features/error/pages/NotFoundPage'));

export const routeConfig = [
  {
    path: '/',
    element: <PublicRoute />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: <DashboardPage />,
      },
      {
        path: '/users',
        element: <UserManagementPage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: ROUTES.UNAUTHORIZED,
    element: <UnauthorizedPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];