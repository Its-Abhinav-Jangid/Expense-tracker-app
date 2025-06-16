import { create } from "zustand";

const useLoadingStore = create((set, get) => ({
  isLoading: true,
  setIsLoading: (value) => {
    set({ isLoading: value });
  },
}));

export default useLoadingStore;
