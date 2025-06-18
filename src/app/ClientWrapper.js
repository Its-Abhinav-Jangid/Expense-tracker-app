"use client";

import { useEffect } from "react";
import { useUserDataStore } from "@/stores/useUserDataStore";
import useLoadingStore from "@/stores/useIsLoadingStore";
import CurrencyModal from "./components/CurrencyModal";
import { useRouter } from "next/navigation";

export default function ClientWrapper({ initialData, children }) {
  const setInitialData = useUserDataStore((state) => state.setInitialData);
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);
  const isLoading = useLoadingStore((state) => state.isLoading);
  const user = useUserDataStore((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    async function setData() {
      if (initialData) {
        setInitialData(initialData);
        setIsLoading(false);
      }
    }
    setData();
  }, [setInitialData, setIsLoading, initialData]);

  return !isLoading && !user.currencyCode ? (
    <CurrencyModal onClose={() => router.push("/")} canDismiss={false} />
  ) : (
    children
  );
}
