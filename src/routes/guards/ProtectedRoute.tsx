// src/routes/guards/ProtectedRoute.tsx
// Authenticated users → render children (Outlet)
// Unauthenticated     → redirect to /login

import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
    selectIsAuthenticated,
    readPersistedToken,
} from '../../features/auth/slices/authSlice'

export const ProtectedRoute = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated)

    // Also check localStorage during bootstrap — avoids flash redirect to /login
    // before Redux has been hydrated from the persisted token
    const hasPersistedToken = !!readPersistedToken()

    if (!isAuthenticated && !hasPersistedToken) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}