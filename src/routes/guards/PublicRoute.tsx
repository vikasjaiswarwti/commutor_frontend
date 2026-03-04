// src/routes/guards/PublicRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PublicRoute: React.FC = () => {
    const { isAuthenticated } = useSelector((state: any) => state.auth);

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};