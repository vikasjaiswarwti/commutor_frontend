import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { PublicRoute } from '../guards/PublicRoute'
import { ROUTES } from '../../shared/constants/app.constants'
import { MainLayout } from '../../shared/components/layouts/MainLayout/MainLayout'

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
      {
        index: true,
        element: <Navigate to={ROUTES.LOGIN} replace />,
      },
    ],
  },
  {
    path: '/',
    element: <PublicRoute />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [] // Dynamic routes will be injected here
      }
    ]
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