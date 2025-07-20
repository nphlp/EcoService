import { create } from "zustand";

type Store = {
    // State
    searchOpen: boolean;
    basketOpen: boolean;
    isDarkMode: boolean;

    // Actions
    setSearchOpen: (open: boolean) => void;
    setBasketOpen: (open: boolean) => void;
    setIsDarkMode: (isDarkMode: boolean) => void;
};

export const useHeaderStore = create<Store>()((set) => ({
    // State
    searchOpen: false,
    basketOpen: false,
    isDarkMode: false,

    // Actions
    setSearchOpen: (open: boolean) => set({ searchOpen: open }),
    setBasketOpen: (open: boolean) => set({ basketOpen: open }),
    setIsDarkMode: (isDarkMode: boolean) => set({ isDarkMode: isDarkMode }),
}));
