import React, { Suspense, lazy, ComponentType } from 'react';
import { useRoutes, RouteObject } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { routeConfig } from './config/routeConfig';
import { generateDynamicRoutes } from './utils/routeUtils';
import { LoadingSpinner } from '@/shared/components/ui/LoadingSpinner';
import { MenuItem } from '@/shared/types/menu.types';
import { RootState } from '@/app/store';

// Feature module registry for dynamic imports
const featureModules: Record<string, () => Promise<{ default: ComponentType<any> }>> = {
    dashboard: () => import('@/features/dashboard/pages/DashboardPage'),
    users: () => import('@/features/user-management/pages/UserManagementPage'),
    roles: () => import('@/features/role-management/pages/RoleManagementPage'),
    permissions: () => import('@/features/permissions/pages/PermissionsPage'),
    settings: () => import('@/features/settings/pages/SettingsPage'),
    // Add more as needed
};

export const RouteGenerator: React.FC = () => {
    const { items: menuItems } = useSelector((state: RootState) => state.navigation);

    // Generate dynamic routes from menu items
    const dynamicRoutes = generateDynamicRoutes(menuItems, featureModules);

    // Combine static and dynamic routes
    const allRoutes: RouteObject[] = [...routeConfig, ...dynamicRoutes];

    const element = useRoutes(allRoutes);

    if (!element) {
        return <LoadingSpinner fullScreen />;
    }

    return (
        <Suspense fallback={<LoadingSpinner fullScreen />}>
            {element}
        </Suspense>
    );
};