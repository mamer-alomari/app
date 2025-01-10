import { useState, useCallback } from 'react';
import { errorHandler } from '../utils/errorHandler';

interface UseAsyncActionOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
}

export function useAsyncAction<T extends (...args: any[]) => Promise<any>>(
  action: T,
  options: UseAsyncActionOptions = {}
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (...args: Parameters<T>) => {
      try {
        setLoading(true);
        setError(null);
        const result = await action(...args);
        
        if (options.successMessage) {
          toast.success(options.successMessage);
        }
        
        options.onSuccess?.(result);
        return result;
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
        errorHandler.handle(err);
        options.onError?.(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [action, options]
  );

  return {
    execute,
    loading,
    error,
    reset: () => setError(null)
  };
}