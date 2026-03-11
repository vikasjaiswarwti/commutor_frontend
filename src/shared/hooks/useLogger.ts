// shared/hooks/useLogger.ts
import { useMemo } from "react";

import { ConsoleLogger, Logger } from "../lib/logging/logger";

export const useLogger = (context: string): Logger => {
  return useMemo(() => new ConsoleLogger(context), [context]);
};
