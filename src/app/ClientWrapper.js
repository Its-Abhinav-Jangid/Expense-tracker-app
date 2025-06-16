"use client";

import { useEffect } from "react";
import { useUserDataStore } from "@/stores/useUserDataStore";
import useLoadingStore from "@/stores/useIsLoadingStore";

export default function ClientWrapper({ initialData, children }) {
  const setInitialData = useUserDataStore((state) => state.setInitialData);
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  useEffect(() => {
    if (initialData) {
      setInitialData(initialData);
      setIsLoading(false);
    }
  }, [initialData, setInitialData, setIsLoading]);

  return children;
}
