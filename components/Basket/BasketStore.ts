import { ProductModel } from "@class/ProductClass";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
    // State
    basketProductList: ProductModel[];

    // Actions
    addProductToBasket: (product: ProductModel) => void;
    removeProductFromBasket: (product: ProductModel) => void;
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
            addProductToBasket: (product: ProductModel) =>
                set({ basketProductList: [...get().basketProductList, product] }),

            removeProductFromBasket: (product: ProductModel) =>
                set({
                    basketProductList: get().basketProductList.filter((p) => p.id !== product.id),
                }),

            clearBasket: () => set({ basketProductList: [] }),
        }),
        // Persist the basket in localStorage
        { name: "basket-storage" },
    ),
);
