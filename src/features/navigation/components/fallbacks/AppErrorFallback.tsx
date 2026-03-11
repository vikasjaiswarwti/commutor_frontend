// features/navigation/components/fallbacks/AppErrorFallback.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorFallbackProps } from '../../../../shared/components/ErrorBoundary/ErrorFallback';

import { Button } from '../../../../shared/components/ui/Button';
import { Icon } from '../../../../shared/components/ui/Icon';

import { useLogger } from '../../../../shared/hooks/useLogger';

export const AppErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  errorInfo,
  logger: propLogger
}) => {
  const navigate = useNavigate();
  const logger = propLogger || useLogger('AppErrorFallback');
  const isDevelopment = import.meta.env.MODE === 'development';

  React.useEffect(() => {
    logger.info('Error fallback displayed', {
      errorMessage: error?.message,
      hasComponentStack: !!errorInfo?.componentStack
    });
  }, [logger, error, errorInfo]);

  const handleReload = () => {
    logger.debug('User clicked reload');
    window.location.reload();
  };

  const handleGoHome = () => {
    logger.debug('User clicked go home');
    navigate('/');
  };

  const handleSupportClick = () => {
    logger.debug('User clicked support link');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        <div className="flex justify-center mb-6">
          <div className="bg-amber-100 rounded-full p-4">
            <Icon name="warning" className="text-4xl text-amber-500" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-3">
          Oops! Something went wrong
        </h2>

        <p className="text-gray-600 text-center mb-6 text-lg">
          We're sorry for the inconvenience. Our team has been notified.
        </p>

        {isDevelopment && error && (
          <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Error Details (Development):
            </p>
            <pre className="text-xs bg-white p-3 rounded-lg border border-gray-200 text-red-600 whitespace-pre-wrap break-words max-h-40 overflow-auto">
              {error.toString()}
            </pre>
            {errorInfo?.componentStack && (
              <pre className="text-xs bg-white p-3 rounded-lg border border-gray-200 text-gray-600 whitespace-pre-wrap break-words max-h-40 overflow-auto mt-2">
                {errorInfo.componentStack}
              </pre>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            icon={<Icon name="reload" />}
            onClick={handleReload}
            size="large"
          >
            Reload Page
          </Button>

          <Button
            variant="secondary"
            icon={<Icon name="home" />}
            onClick={handleGoHome}
            size="large"
          >
            Go to Homepage
          </Button>
        </div>

        <p className="text-sm text-gray-500 text-center mt-6">
          If the problem persists, please{' '}
          <a
            href="/support"
            onClick={handleSupportClick}
            className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
          >
            contact our support team
          </a>
        </p>
      </div>
    </div>
  );
};
