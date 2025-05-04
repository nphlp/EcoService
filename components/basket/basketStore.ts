import { ProductModel } from "@services/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type BasketProduct = {
    id: ProductModel["id"];
    name: ProductModel["name"];
    description: ProductModel["description"];
    price: ProductModel["price"];
    image: ProductModel["image"];
    quantity: number;
};

type Store = {
    // State
    basketProductList: BasketProduct[];

    // Actions
    addProductToBasket: (product: BasketProduct) => void;
    updateProductQuantity: (productId: BasketProduct["id"], quantity: number) => void;
    removeProductFromBasket: (productId: BasketProduct["id"]) => void;
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
            addProductToBasket: (product: BasketProduct) =>
                set({ basketProductList: [...get().basketProductList, product] }),

            updateProductQuantity: (productId: BasketProduct["id"], quantity: number) =>
                set({
                    basketProductList: get().basketProductList.map((product) =>
                        product.id === productId ? { ...product, quantity } : product,
                    ),
                }),

            removeProductFromBasket: (currentId: BasketProduct["id"]) =>
                set({
                    basketProductList: get().basketProductList.filter((product) => product.id !== currentId),
                }),

            clearBasket: () => set({ basketProductList: [] }),
        }),
        // Persist the basket in localStorage
        { name: "basket-storage" },
    ),
);
