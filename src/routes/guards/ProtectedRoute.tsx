import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { ROUTES } from '@/shared/constants/app.constants';
import { LoadingSpinner } from '@/shared/components/ui/LoadingSpinner';

interface ProtectedRouteProps {
    requiredMenuId?: string;
    children: React.ReactNode;
    fallbackPath?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    requiredMenuId,
    children,
    fallbackPath = ROUTES.UNAUTHORIZED,
}) => {
    const location = useLocation();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { flattenedMap, isLoading } = useSelector((state: RootState) => state.navigation);

    // Show loading while menu is being fetched
    if (isLoading) {
        return <LoadingSpinner fullScreen />;
    }

    // Check authentication
    if (!isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
    }

    // Check permission if required
    if (requiredMenuId) {
        const menuItem = flattenedMap[requiredMenuId];
        if (!menuItem?.isAssigned) {
            return <Navigate to={fallbackPath} state={{ from: location }} replace />;
        }
    }

    return <>{children}</>;
};