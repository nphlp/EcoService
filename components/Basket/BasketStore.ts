import { ProductType } from "@actions/types/Product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
    // State
    basketProductList: ProductType[];

    // Actions
    addProductToBasket: (product: ProductType) => void;
    removeProductFromBasket: (product: ProductType) => void;
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
            addProductToBasket: (product: ProductType) =>
                set({ basketProductList: [...get().basketProductList, product] }),

            removeProductFromBasket: (product: ProductType) =>
                set({
                    basketProductList: get().basketProductList.filter((p) => p.id !== product.id),
                }),

            clearBasket: () => set({ basketProductList: [] }),
        }),
        // Persist the basket in localStorage
        { name: "basket-storage" },
    ),
);
