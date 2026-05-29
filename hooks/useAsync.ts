import { useState, useCallback, useEffect } from "react";

export const useAsync = <T,>(
  asyncFunction: () => Promise<T>,
  immediate = true
) => {
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    setStatus("pending");
    setData(null);
    setError(null);

    try {
      const response = await asyncFunction();
      setData(response);
      setStatus("success");
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
      setStatus("error");
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, data, error };
};

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch {
      console.error("Error setting local storage");
    }
  };

  return [storedValue, setValue] as const;
};

export const useDebounce = <T,>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

export const usePreviousMobileSize = (value: boolean) => {
  const [previousValue, setPreviousValue] = useState(value);

  useEffect(() => {
    setPreviousValue(value);
  }, [value]);

  return previousValue;
};

export const useOAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const signInWithProvider = useCallback(async (provider: "google" | "github") => {
    setIsLoading(true);
    try {
      // This would integrate with your auth service
      console.log(`Signing in with ${provider}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, signInWithProvider };
};

