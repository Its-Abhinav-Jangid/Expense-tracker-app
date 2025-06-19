"use client";

import { useEffect } from "react";
import { useUserDataStore } from "@/stores/useUserDataStore";
import useLoadingStore from "@/stores/useIsLoadingStore";
import CurrencyModal from "./components/CurrencyModal";
import { useRouter } from "next/navigation";
import fetchUserData from "./lib/fetchUserData";

export default function ClientWrapper({ children }) {
  const setInitialData = useUserDataStore((state) => state.setInitialData);
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);
  const isLoading = useLoadingStore((state) => state.isLoading);
  const user = useUserDataStore((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    async function setData() {
      const initialData = await fetchUserData();
      setInitialData(initialData);
      setIsLoading(false);
    }
    setData();
  }, [setInitialData, setIsLoading]);

  return !isLoading && !user.currencyCode ? (
    <CurrencyModal onClose={() => router.push("/")} canDismiss={false} />
  ) : (
    children
  );
}
