import { lazy, ComponentType } from 'react';
import { RouteObject } from 'react-router-dom';
import { MenuItem } from '@/shared/types/menu.types';

import { ProtectedRoute } from '../guards/ProtectedRoute';

/**
 * Generates dynamic routes from menu items
 */

export const generateDynamicRoutes = (
  menuItems: MenuItem[],
  featureModules: Record<string, () => Promise<{ default: ComponentType<any> }>>
): RouteObject[] => {
  const routes: RouteObject[] = [];

  const traverseMenu = (items: MenuItem[]) => {
    items.forEach((item) => {
      if (item.routeUrl && item.isAssigned) {
        // Extract feature name from route (e.g., '/dashboard' -> 'dashboard')
        const featureName = item.routeUrl.split('/')[1];
        
        // Get the lazy loading function for this feature
        const importFn = featureModules[featureName];
        
        if (importFn) {
          // Create lazy component
          const LazyComponent = lazy(importFn);
          
          // Create route with protection
          const route: RouteObject = {
            path: item.routeUrl,
            element: (
              <ProtectedRoute requiredMenuId={item.menuId}>
                <LazyComponent />
              </ProtectedRoute>
            ),
          };
          
          routes.push(route);
        }
      }
      
      // Recursively process children
      if (item.children?.length) {
        traverseMenu(item.children);
      }
    });
  };

  traverseMenu(menuItems);
  return routes;
};