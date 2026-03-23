// src/routes/config/routeConfig.tsx

import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { PublicRoute } from '../guards/PublicRoute'
import { ProtectedRoute } from '../guards/ProtectedRoute'
import { ROUTES } from '../../shared/constants/app.constants'
import { MainLayout } from '../../shared/components/layouts/MainLayout/MainLayout'
import { Navigate } from 'react-router-dom'
import { UserListPage } from '../../features/user-management'

const LoginPage = lazy(() => import('../../features/auth/pages/LoginPage'))
const UnauthorizedPage = lazy(() => import('../../features/error/pages/UnauthorizedPage'))
const NotFoundPage = lazy(() => import('../../features/error/pages/NotFoundPage'))

export const staticRoutes: RouteObject[] = [
  // ── Public routes — authenticated users are bounced to /dashboard ─────────
  {
    element: <PublicRoute />,
    children: [
      {
        path: ROUTES.LOGIN,   // /login
        element: <LoginPage />,
      },
    ],
  },

  // ── Protected routes — unauthenticated users are sent to /login ───────────
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <Navigate to={ROUTES.DASHBOARD} replace />,
      },
      {
        path: '/dashboard',
        element: <MainLayout />,
        children: [], // dynamic routes injected here by RouteGenerator
      },
    ],
  },

  // ── Special routes — no auth guard needed ─────────────────────────────────
  {
    path: ROUTES.Test,
    element: <UserListPage />,
  },
  {
    path: ROUTES.UNAUTHORIZED,
    element: <UnauthorizedPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]