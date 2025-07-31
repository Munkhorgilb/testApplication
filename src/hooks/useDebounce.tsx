import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const debouncedFn = debounce(() => {
      setDebouncedValue(value);
    }, delay);

    debouncedFn();

    return () => {
      debouncedFn.cancel();
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
