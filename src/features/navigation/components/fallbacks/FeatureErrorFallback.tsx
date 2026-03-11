// features/navigation/components/fallbacks/FeatureErrorFallback.tsx
import React from 'react';
import { ErrorFallbackProps } from '../../../../shared/components/ErrorBoundary/ErrorFallback';

import { Button } from '../../../../shared/components/ui/Button';
import { useLogger } from '../../../../shared/hooks/useLogger';

interface FeatureErrorFallbackProps extends ErrorFallbackProps {
    featureName: string;
    onRetry?: () => void;
}

export const FeatureErrorFallback: React.FC<FeatureErrorFallbackProps> = ({
    error,
    featureName,
    onRetry,
    logger: propLogger
}) => {
    const logger = propLogger || useLogger(`${featureName}ErrorFallback`);

    React.useEffect(() => {
        logger.error(`Error in ${featureName} feature`, { errorMessage: error?.message });
    }, [logger, error, featureName]);

    const handleRetry = () => {
        logger.debug(`User retried ${featureName} feature`);
        onRetry?.();
    };

    return (
        <div className="p-8 text-center">
            <div className="mb-4">
                <Icon name="warning" className="text-3xl text-amber-500 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Error in {featureName}</h3>
            <p className="text-gray-600 mb-4">This section failed to load</p>
            {onRetry && (
                <Button variant="primary" onClick={handleRetry}>
                    Retry
                </Button>
            )}
        </div>
    );
};