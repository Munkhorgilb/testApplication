import { useCallback, useInsertionEffect, useRef } from 'react';

export function useNonReactiveCallback<T extends Function>(fn: T): T {
  const ref = useRef(fn);
  useInsertionEffect(() => {
    ref.current = fn;
  }, [fn]);
  return useCallback(
    (...args: any) => {
      const latestFn = ref.current;
      return latestFn(...args);
    },
    [ref],
  ) as unknown as T;
}
