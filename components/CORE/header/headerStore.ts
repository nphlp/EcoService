import { create } from "zustand";

type Store = {
    // State
    searchOpen: boolean;
    basketOpen: boolean;

    // Actions
    setSearchOpen: (open: boolean) => void;
    setBasketOpen: (open: boolean) => void;
};

export const useHeaderStore = create<Store>()((set) => ({
    // State
    searchOpen: false,
    basketOpen: false,

    // Actions
    setSearchOpen: (open: boolean) => set({ searchOpen: open }),
    setBasketOpen: (open: boolean) => set({ basketOpen: open }),
}));
