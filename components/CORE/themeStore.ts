import { zustandCookieStorage } from "@lib/zustandCookieStorage";
import z, { ZodType } from "zod";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ThemeStore = {
    /**
     * The dark mode state
     * @example
     * - null -> system preferences (default)
     * - true -> dark mode
     * - false -> light mode
     */
    isDarkMode: boolean | null;
    setIsDarkMode: (isDarkMode: boolean | null) => void;
};

export const themeSchema: ZodType<ThemeStore["isDarkMode"]> = z.coerce.boolean().nullable();

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set) => ({
            isDarkMode: null,
            setIsDarkMode: (isDarkMode: boolean | null) => set({ isDarkMode }),
        }),
        {
            name: "theme-cookie",
            storage: createJSONStorage(() => zustandCookieStorage),
        },
    ),
);
