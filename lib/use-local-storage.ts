import { useState, useEffect, useRef } from "react";
import { z } from "zod";

/**
 * Custom hook to manage state with localStorage persistence
 * Handles SSR/hydration issues by only accessing localStorage on client side
 * Optionally validates data with a Zod schema and removes invalid data
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  loadingValue: T,
  schema: z.ZodSchema<T>
): [T, (value: T | ((val: T) => T)) => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(loadingValue);

  // Use ref to store initialValue to avoid dependency issues
  const initialValueRef = useRef(initialValue);

  // Initialize from localStorage on client side only
  useEffect(() => {
    console.log("starging");
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsedValue = JSON.parse(item);

        const result = schema.safeParse(parsedValue);
        if (result.success) {
          console.log("result.data", result.data);
          setStoredValue(result.data);
        } else {
          // Invalid data - remove from localStorage and use initial value
          console.warn(
            `Invalid data in localStorage for key "${key}", removing:`,
            result.error
          );
          window.localStorage.removeItem(key);
          setStoredValue(initialValueRef.current);
        }
      } else {
        setStoredValue(initialValueRef.current);
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      // On any error, try to remove the potentially corrupted data
      try {
        window.localStorage.removeItem(key);
      } catch (removeError) {
        console.warn(
          `Error removing corrupted localStorage key "${key}":`,
          removeError
        );
      }
      setStoredValue(initialValueRef.current);
    }
  }, [key, schema]);

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Save state
      setStoredValue(valueToStore);

      // Save to localStorage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
