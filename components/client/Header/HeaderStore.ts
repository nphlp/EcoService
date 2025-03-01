import { create } from "zustand";

type Store = {
    categorieOpen: boolean;
    setCategorieOpen: (open: boolean) => void;
    searchOpen: boolean;
    setSearchOpen: (open: boolean) => void;
    accountOpen: boolean;
    setAccountOpen: (open: boolean) => void;
};

export const useHeaderStore = create<Store>()((set) => ({
    categorieOpen: false,
    setCategorieOpen: (open: boolean) => set({ categorieOpen: open }),
    searchOpen: false,
    setSearchOpen: (open: boolean) => set({ searchOpen: open }),
    accountOpen: false,
    setAccountOpen: (open: boolean) => set({ accountOpen: open }),
}));
