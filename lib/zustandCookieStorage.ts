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
        try {
            const cookieName = encodeURIComponent(name);
            const match = document.cookie.match(new RegExp("(^| )" + cookieName + "=([^;]+)"));
            return match ? decodeURIComponent(match[2]) : null;
        } catch (error) {
            throw new Error(`zustandCookieStorage -> getItem -> ${(error as Error).message}`);
        }
    },
    setItem: (name: string, value: string) => {
        try {
            const cookieName = encodeURIComponent(name);
            const cookieValue = encodeURIComponent(value);
            const cookieExpiration = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
            document.cookie = `${cookieName}=${cookieValue}; expires=${cookieExpiration}; path=/; Secure; SameSite=Strict`;
        } catch (error) {
            throw new Error(`zustandCookieStorage -> setItem -> ${(error as Error).message}`);
        }
    },
    removeItem: (name: string) => {
        try {
            const cookieName = encodeURIComponent(name);
            const cookieExpiration = new Date(0).toUTCString();
            document.cookie = `${cookieName}=; expires=${cookieExpiration}; path=/`;
        } catch (error) {
            throw new Error(`zustandCookieStorage -> removeItem -> ${(error as Error).message}`);
        }
    },
};

/**
 * Update the expiration date of a cookie
 * @param name - The name of the cookie
 * @param expiration - The expiration date
 */
export const updateCookieExpiration = (name: string, expiration: Date) => {
    const cookieName = encodeURIComponent(name);
    const cookieExpiration = expiration.toUTCString();

    // Get the current cookie value
    const cookieValue = zustandCookieStorage.getItem(name);

    if (!cookieValue) return;

    document.cookie = `${cookieName}=${cookieValue}; expires=${cookieExpiration}; path=/; Secure; SameSite=Strict`;
};
