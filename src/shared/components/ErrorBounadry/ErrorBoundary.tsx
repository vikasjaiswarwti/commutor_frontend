import React from 'react';
import { ErrorInfo as ReactErrorInfo } from 'react';

import { Logger, ConsoleLogger } from '../../lib/logging/logger';
import { ErrorFallbackProps } from './ErrorFallback';

interface ErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: React.ComponentType<ErrorFallbackProps>;
    onError?: (error: Error, errorInfo: ReactErrorInfo) => void;
    logger?: Logger;
    context?: string;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: ReactErrorInfo | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    private logger: Logger;

    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };

        // Use provided logger or create one with context
        this.logger = props.logger || new ConsoleLogger(props.context || 'ErrorBoundary');
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error, errorInfo: null };
    }

    componentDidCatch(error: Error, errorInfo: ReactErrorInfo) {
        const { onError } = this.props;

        this.setState({ errorInfo });

        // Call custom error handler if provided
        onError?.(error, errorInfo);

        // Log error using the logger
        this.logger.error('Error caught by boundary', {
            error: {
                name: error.name,
                message: error.message,
                stack: error.stack
            },
            componentStack: errorInfo.componentStack
        });
    }

    render() {
        const { hasError, error, errorInfo } = this.state;
        const { children, fallback: FallbackComponent } = this.props;

        if (hasError && FallbackComponent) {
            return <FallbackComponent error={error} errorInfo={errorInfo} logger={this.logger} />;
        }

        if (hasError) {
            // Default minimal fallback if none provided
            return <DefaultErrorFallback error={error} errorInfo={errorInfo} logger={this.logger} />;
        }

        return children;
    }
}

// Default fallback (minimal, no business logic)
const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({ logger }) => {
    React.useEffect(() => {
        logger?.debug('Default error fallback rendered');
    }, [logger]);

    return (
        <div role="alert" className="p-4 text-center">
            <p>Something went wrong</p>
        </div>
    );
};