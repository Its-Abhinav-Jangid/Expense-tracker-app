"use client";

import { useEffect } from "react";
import { useUserDataStore } from "@/stores/useUserDataStore";
import useLoadingStore from "@/stores/useIsLoadingStore";

import fetchUserData from "./lib/fetchUserData";
import CurrencyModal from "./components/CurrencyModal";
import { useRouter } from "next/navigation";

export default function ClientWrapper({ children }) {
  const setInitialData = useUserDataStore((state) => state.setInitialData);
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);
  const isLoading = useLoadingStore((state) => state.isLoading);
  const user = useUserDataStore((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    async function fetchData() {
      const initialData = await fetchUserData();

      setInitialData(initialData);
      setIsLoading(false);
    }
    fetchData();
  }, [setInitialData, setIsLoading]);
  if (!isLoading && !user.currencyCode) {
    return (
      <CurrencyModal onClose={() => router.push("/")} canDismiss={false} />
    );
  }
  return children;
}
