import { create } from "zustand";

type Store = {
    // State
    categorieOpen: boolean;
    searchOpen: boolean;
    accountOpen: boolean;
    basketOpen: boolean;

    // Actions
    setCategorieOpen: (open: boolean) => void;
    setSearchOpen: (open: boolean) => void;
    setAccountOpen: (open: boolean) => void;
    setBasketOpen: (open: boolean) => void;
};

export const useHeaderStore = create<Store>()((set) => ({
    // State
    categorieOpen: false,
    searchOpen: false,
    accountOpen: false,
    basketOpen: false,

    // Actions
    setCategorieOpen: (open: boolean) => set({ categorieOpen: open }),
    setSearchOpen: (open: boolean) => set({ searchOpen: open }),
    setAccountOpen: (open: boolean) => set({ accountOpen: open }),
    setBasketOpen: (open: boolean) => set({ basketOpen: open }),
}));
