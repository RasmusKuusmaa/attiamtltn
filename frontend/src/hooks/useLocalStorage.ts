import { useState, useEffect } from "react";

type Primitive = string | number | boolean | null;

function useLocalStorage<T extends Primitive>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored === null) return initialValue;

      if (typeof initialValue === "number") return Number(stored) as T;
      if (typeof initialValue === "boolean") return (stored === "true") as T;

      return stored as T;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, String(value));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}

export default useLocalStorage;
