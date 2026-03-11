// shared/types/error.types.ts
export interface ErrorInfo {
  error: Error;
  errorInfo: React.ErrorInfo | null;
  timestamp: number;
}

export interface ErrorLoggingService {
  logError(errorInfo: ErrorInfo): void;
}
