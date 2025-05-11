"use client";

/**
 * ## Zustand cookie storage
 *
 * @description
 * A cookie storage lib for Zustand, used to persist the basket in cookies. \
 * Cookies are available on the server and client side.
 *
 * @example
 * import { create } from "zustand";
 * import { createJSONStorage, persist } from "zustand/middleware";
 * import { zustandCookieStorage } from "./zustandCookieStorage";
 *
 * export const useBasketStore = create<Store>()(
 *     persist(
 *         (set, get) => ({
 *             // State
 *             basket: {
 *                 orderId: "",
 *                 userId: "",
 *                 items: [],
 *             },
 *
 *             // Actions
 *             addToBasket: () => {},
 *             removeFromBasket: () => {},
 *             clearBothBasket: () => {},
 *         }),
 *         {
 *             // Cookie name
 *             name: "basket-cookie",
 *             // Persist the basket in cookies
 *             storage: createJSONStorage(() => zustandCookieStorage),
 *             // Persist only the basket state and not actions
 *             partialize: (state) => ({ basket: state.basket }),
 *         },
 *     ),
 * );
 */
export const zustandCookieStorage = {
    getItem: (name: string) => {
        const match = document.cookie.match(new RegExp("(^| )" + encodeURIComponent(name) + "=([^;]+)"));
        return match ? decodeURIComponent(match[2]) : null;
    },
    setItem: (name: string, value: string) => {
        const days = 30;
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/; Secure; SameSite=Strict`;
    },
    removeItem: (name: string) => {
        document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    },
};

/**
 * Update the expiration date of a cookie
 * @param name - The name of the cookie
 * @param expiration - The expiration date
 */
export const updateCookieExpiration = (name: string, expiration: Date) => {
    const expires = expiration.toUTCString();
    const value = zustandCookieStorage.getItem(name);
    if (!value) return;
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/; Secure; SameSite=Strict`;
};
