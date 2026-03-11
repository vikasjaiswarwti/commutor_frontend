// features/navigation/components/AppErrorBoundary.tsx
import React from 'react';

import { ErrorBoundary } from '../../../shared/components/ErrorBoundary/ErrorBoundary';

import { AppErrorFallback } from './fallbacks/AppErrorFallback';
import { useLogger } from '../../../shared/hooks/useLogger';
import { useNavigate } from 'react-router-dom';

interface AppErrorBoundaryProps {
    children: React.ReactNode;
}

export const AppErrorBoundary: React.FC<AppErrorBoundaryProps> = ({ children }) => {
    
    const navigate = useNavigate();
    const logger = useLogger('AppErrorBoundary');

    const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
        // You can add feature-specific error handling here
        logger.error('Application error', {
            error: {
                name: error.name,
                message: error.message,
                stack: error.stack
            },
            componentStack: errorInfo.componentStack
        });

        // You could also dispatch to analytics, etc.
        // analyticsService.trackError(error, errorInfo);
    };

    return (
        <ErrorBoundary
            fallback={AppErrorFallback}
            onError={handleError}
            logger={logger}
            context="AppErrorBoundary"
        >
            {children}
        </ErrorBoundary>
    );
};