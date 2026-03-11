// features/navigation/components/FeatureErrorBoundary.tsx
import React from 'react';

import { ErrorBoundary } from '../../../shared/components/ErrorBoundary/ErrorBoundary';

import { FeatureErrorFallback } from './fallbacks/FeatureErrorFallback';
import { useLogger } from '../../../shared/hooks/useLogger';

interface FeatureErrorBoundaryProps {
    children: React.ReactNode;
    featureName: string;
    onRetry?: () => void;
}

export const FeatureErrorBoundary: React.FC<FeatureErrorBoundaryProps> = ({
    children,
    featureName,
    onRetry
}) => {
    const logger = useLogger(`${featureName}Boundary`);

    const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
        logger.error(`Error in ${featureName} feature`, {
            error: {
                name: error.name,
                message: error.message,
                stack: error.stack
            },
            componentStack: errorInfo.componentStack
        });
    };

    return (
        <ErrorBoundary
            fallback={(props) => (
                <FeatureErrorFallback
                    {...props}
                    featureName={featureName}
                    onRetry={onRetry}
                />
            )}
            onError={handleError}
            logger={logger}
            context={`${featureName}Boundary`}
        >
            {children}
        </ErrorBoundary>
    );
};