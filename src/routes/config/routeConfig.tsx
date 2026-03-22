import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { PublicRoute } from '../guards/PublicRoute'
import { ROUTES } from '../../shared/constants/app.constants'
import { MainLayout } from '../../shared/components/layouts/MainLayout/MainLayout'
import { Navigate } from 'react-router-dom'
import { UserListPage } from '../../features/user-management'

const LoginPage = lazy(() => import('../../features/auth/pages/LoginPage'))

const UnauthorizedPage = lazy(() => import('../../features/error/pages/UnauthorizedPage'))
const NotFoundPage = lazy(() => import('../../features/error/pages/NotFoundPage'))

export const staticRoutes: RouteObject[] = [
  {
    path: '/login',
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
    element: <PublicRoute />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.DASHBOARD} replace />,
      },
      {
        path: '/dashboard',
        element: <MainLayout />,
        children: [] // Dynamic routes will be injected here
      }
    ]
  },
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