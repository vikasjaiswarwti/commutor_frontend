import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import type { MenuItem } from '../../shared/types/menu.types'
import { ProtectedRoute } from '../guards/ProtectedRoute'

export const generateDynamicRoutes = (
  menuItems: MenuItem[],
  featureModules: Record<string, any>
): RouteObject[] => {

  const routes: RouteObject[] = []

  const traverse = (items: MenuItem[]) => {
    items.forEach((item) => {

      if (item.routeUrl && item.isAssigned) {

        const featureName = item.routeUrl.split('/')[1]

        const importFn = featureModules[featureName]

        if (!importFn) return

        const LazyComponent = lazy(importFn)

        routes.push({
          path: item.routeUrl,
          element: (
            <ProtectedRoute requiredMenuId={item.menuId.toString()}>
              <LazyComponent />
            </ProtectedRoute>
          )
        })
      }

      if (item.children?.length) {
        traverse(item.children)
      }
    })
  }

  traverse(menuItems)

  return routes
}