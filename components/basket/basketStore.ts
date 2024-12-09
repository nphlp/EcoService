import { ProductModel } from "@services/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
    // State
    basketProductList: ProductModel["id"][];

    // Actions
    addProductToBasket: (product: ProductModel["id"]) => void;
    removeProductFromBasket: (product: ProductModel["id"]) => void;
    clearBasket: () => void;
};

/**
 * Basket store (synchronized with localStorage)
 */
export const useBasketStore = create<Store>()(
    persist(
        (set, get) => ({
            // State
            basketProductList: [],

            // Actions
            addProductToBasket: (product: ProductModel["id"]) =>
                set({ basketProductList: [...get().basketProductList, product] }),

            removeProductFromBasket: (currentId: ProductModel["id"]) =>
                set({
                    basketProductList: get().basketProductList.filter((newId) => newId !== currentId),
                }),

            clearBasket: () => set({ basketProductList: [] }),
        }),
        // Persist the basket in localStorage
        { name: "basket-storage" },
    ),
);
