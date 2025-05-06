import { CreateOrder, DeleteOrder } from "@actions/OrderAction";
import { CreateQuantity, DeleteQuantity, UpdateQuantity } from "@actions/QuantityAction";
import { getBasket } from "@lib/getBasket";
import { OrderModel, ProductModel, QuantityModel, UserModel } from "@services/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandCookieStorage } from "./zustandCookieStorage";

export type BasketItem = {
    // Product
    productId: ProductModel["id"];
    name: ProductModel["name"];
    description: ProductModel["description"];
    price: ProductModel["price"];
    image: ProductModel["image"];
    // Quantity
    quatityId: QuantityModel["id"];
    quantity: number;
};

/**
 * Basket is a Quantity that represent a relation between a Product and an Order
 */
export type Basket = {
    userId: UserModel["id"];
    orderId: OrderModel["id"];
    items: BasketItem[];
};

type Store = {
    // State
    basket: Basket | null;

    // Actions
    isInBasket: (productId: BasketItem["productId"]) => boolean;
    addProductToBasket: (product: Omit<BasketItem, "quatityId" | "quantity">) => void;
    updateProductQuantity: (productId: BasketItem["productId"], quantity: number) => void;
    removeProductFromBasket: (productId: BasketItem["productId"]) => void;
    clearBasket: () => void;
    syncBasket: () => void;
};

/**
 * Basket store (synchronized with localStorage)
 */
export const useBasketStore = create<Store>()(
    persist(
        (set, get) => ({
            // State
            basket: null,

            // Actions
            isInBasket: (productId) => {
                return get().basket?.items.some(({ productId: id }) => id === productId) ?? false;
            },

            addProductToBasket: async (product) => {
                const localBasket = get().basket;

                if (!localBasket) {
                    // Initialize basket store
                    set({
                        basket: {
                            userId: "",
                            orderId: "",
                            items: [{ ...product, quatityId: "", quantity: 1 }],
                        },
                    });
                } else {
                    // Update Zustand store
                    set({
                        basket: {
                            ...localBasket,
                            items: [...localBasket.items, { ...product, quatityId: "", quantity: 1 }],
                        },
                    });
                }

                // Apply to DB
                const serverBasket = await getBasket();

                if (serverBasket) {
                    const { userId, orderId } = serverBasket;
                    const { productId } = product;

                    if (!orderId) {
                        // Create order and the single quantity
                        await CreateOrder({
                            data: {
                                User: { connect: { id: userId } },
                                Quantity: { create: { productId, quantity: 1 } },
                            },
                        });
                    } else {
                        // Create all quantity
                        await CreateQuantity({
                            data: {
                                Product: { connect: { id: productId } },
                                Order: { connect: { id: orderId } },
                                quantity: 1,
                            },
                        });
                    }
                }
            },

            updateProductQuantity: async (productId, quantity) => {
                const localBasket = get().basket;
                if (!localBasket) return;

                // Update the Zustand store
                set({
                    basket: {
                        ...localBasket,
                        items: localBasket.items.map((product) =>
                            product.productId === productId ? { ...product, quantity } : product,
                        ),
                    },
                });

                // Apply to DB
                const serverBasket = await getBasket();

                if (serverBasket) {
                    const quantityId = serverBasket.items.find(({ productId: id }) => id === productId)?.quatityId;

                    // Update quantity
                    if (quantity > 0 && quantityId) {
                        await UpdateQuantity({
                            where: { id: quantityId },
                            data: { quantity },
                        });
                    }

                    // It was the last product ? Clear basket
                    if (quantity === 0 && serverBasket.items.length === 1) {
                        await DeleteOrder({ where: { id: serverBasket.orderId } });
                    }
                }
            },

            removeProductFromBasket: async (productId) => {
                const localBasket = get().basket;
                if (!localBasket) return;

                // Remove from Zustand store
                set({
                    basket: {
                        ...localBasket,
                        items: localBasket.items.filter(({ productId: id }) => id !== productId),
                    },
                });

                // Apply to DB
                const serverBasket = await getBasket();

                if (serverBasket) {
                    const quantityId = serverBasket.items.find(({ productId: id }) => id === productId)?.quatityId;

                    // Delete quantity
                    if (quantityId) {
                        await DeleteQuantity({
                            where: {
                                id: quantityId,
                            },
                        });
                    }

                    // It was the last product ? Clear basket
                    if (serverBasket.items.length === 1) {
                        await DeleteOrder({
                            where: {
                                id: serverBasket.orderId,
                            },
                        });
                    }
                }
            },

            clearBasket: async () => {
                const localBasket = get().basket;
                if (!localBasket) return;

                // Clear the Zustand store
                set({ basket: null });

                // Apply to DB
                const serverBasket = await getBasket();

                if (serverBasket) {
                    // Delete order and linked quantities
                    await DeleteOrder({ where: { id: serverBasket.orderId } });
                }
            },

            /**
             * Refresh local basket with server data (if it exists)
             */
            syncBasket: async () => {
                const basket = await getBasket();
                if (basket) set({ basket });
            },
        }),
        // Persist the basket in cookies
        {
            name: "basket-cookie",
            storage: createJSONStorage(() => zustandCookieStorage),
            partialize: (state) => ({ basket: state.basket }),
        },
    ),
);
