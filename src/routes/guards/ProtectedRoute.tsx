import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { ROUTES } from '../../shared/constants/app.constants';
import { LoadingSpinner } from '../../shared/components/ui';
import { Navigate, useLocation, Outlet } from 'react-router-dom'; // Add Outlet

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

    const { isAuthenticated = false } = useSelector((state: RootState) => state.auth);

    const { flattenedMap = false, isLoading } = useSelector((state: RootState) => state.navigation);

    if (isLoading) return <LoadingSpinner fullScreen />;

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
    }

    if (requiredMenuId) {
        const menuItem = flattenedMap[requiredMenuId];
        if (!menuItem?.isAssigned) {
            return <Navigate to={fallbackPath} state={{ from: location }} replace />;
        }
    }

    // ARCHITECTURAL FIX: 
    // If children is passed (static wrapping), render children.
    // If not, render Outlet (for nested route config).

    return children ? <>{children}</> : <Outlet />;
};