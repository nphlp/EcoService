import { zustandCookieStorage } from "@lib/zustandCookieStorage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Store = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

/**
 * Sidebar store (synchronized with cookies)
 */
export const useSidebarStore = create<Store>()(
    persist(
        (set, get) => ({
            // State
            isOpen: false,

            // Actions
            setIsOpen: (isOpen) => set({ isOpen }),
        }),
        {
            name: "sidebar-cookie",
            storage: createJSONStorage(() => zustandCookieStorage),
            partialize: (state) => ({ isOpen: state.isOpen }),
        },
    ),
);
