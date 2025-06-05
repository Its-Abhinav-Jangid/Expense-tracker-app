"use client";

import { useEffect, useState } from "react";
import { useUserDataStore } from "@/stores/useUserDataStore";
import Skeleton from "./loading";

export default function ClientWrapper({ initialData, children }) {
  const setInitialData = useUserDataStore((state) => state.setInitialData);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (initialData) {
      setInitialData(initialData);
    }
    setIsReady(true); // Tell the wrapper to render children after hydration
  }, [initialData, setInitialData]);

  if (!isReady) {
    return <Skeleton />;
  }

  return children;
}
