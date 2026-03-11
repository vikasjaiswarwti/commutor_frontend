import React from 'react';

import { Logger } from '../../lib/logging/logger';

export interface ErrorFallbackProps {
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
    logger?: Logger;
}