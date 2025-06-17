"use client";

import { useEffect } from "react";
import { useUserDataStore } from "@/stores/useUserDataStore";
import useLoadingStore from "@/stores/useIsLoadingStore";

import fetchUserData from "./lib/fetchUserData";

export default function ClientWrapper({ children }) {
  const setInitialData = useUserDataStore((state) => state.setInitialData);
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  useEffect(() => {
    async function fetchData() {
      const initialData = await fetchUserData();
      setInitialData(initialData);
      setIsLoading(false);
    }
    fetchData();
  }, [setInitialData, setIsLoading]);

  return children;
}
