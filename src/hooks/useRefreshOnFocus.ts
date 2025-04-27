import { useRef, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

/**
 * Custom Hook for refetching data in a component when that components screen gains focus
 */
export function useRefreshOnFocus<T>(refetch: () => Promise<T>) {
  const firstTimeRef = useRef(true);

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      refetch();
    }, [refetch]),
  );
}
