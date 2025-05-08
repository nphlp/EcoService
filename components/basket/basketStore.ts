import { DeleteOrder } from "@actions/OrderAction";
import {
    CreateManyQuantity,
    CreateQuantity,
    DeleteManyQuantity,
    DeleteQuantity,
    UpdateQuantity,
} from "@actions/QuantityAction";
import { GetBasket } from "@process/GetBasket";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Basket, BasketItem } from "./basketType";
import { zustandCookieStorage } from "./zustandCookieStorage";

type Store = {
    // State
    basket: Basket | null;

    // Actions
    isInBasket: (productId: BasketItem["productId"]) => boolean;
    addProductToBasket: (product: Omit<BasketItem, "quatityId" | "quantity">) => void;
    updateProductQuantity: (productId: BasketItem["productId"], quantity: number) => void;
    removeProductFromBasket: (productId: BasketItem["productId"]) => void;
    clearBasket: () => void;
    clearLocalBasket: () => void;
    compare: () => Promise<{
        serverBasket: Basket;
        localBasket: Basket;
    } | null>;
    syncLocalBasket: () => void;
    syncServerBasket: () => void;
};

/**
 * Basket store (synchronized with cookies)
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
                const serverBasket = await GetBasket();

                if (serverBasket) {
                    const { orderId } = serverBasket;
                    const { productId } = product;

                    // Create quantity
                    await CreateQuantity({
                        data: {
                            Product: { connect: { id: productId } },
                            Order: { connect: { id: orderId } },
                            quantity: 1,
                        },
                    });

                    // Update Zustand store
                    // get().syncLocalBasket();
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
                const serverBasket = await GetBasket();

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

                    // Update Zustand store
                    get().syncLocalBasket();
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
                const serverBasket = await GetBasket();

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

                    // Update Zustand store
                    // get().syncLocalBasket();
                }
            },

            clearBasket: async () => {
                const localBasket = get().basket;
                if (!localBasket) return;

                // Clear the Zustand store
                set({ basket: null });

                // Apply to DB
                const serverBasket = await GetBasket();

                if (serverBasket) {
                    // Delete order and linked quantities
                    await DeleteOrder({ where: { id: serverBasket.orderId } });
                }
            },

            clearLocalBasket: () => {
                set({ basket: null });
            },

            compare: async () => {
                const serverBasket = await GetBasket();
                const localBasket = get().basket;

                // Means no session or error during fetching
                if (!serverBasket) {
                    console.log("==> No server basket \n==> Do nothing");
                    return null;
                }

                // Means no local basket
                if (!localBasket) {
                    console.log("==> No local basket \n==> Sync local basket");
                    get().syncLocalBasket();
                    return null;
                }

                const serverQuantities = serverBasket.items.length;
                const localQuantities = localBasket.items.length;

                // Ask user to choose
                if (serverQuantities > 0 && localQuantities > 0) {
                    // Compare only essential basket data: products and quantities
                    const prepareForComparison = (basket: Basket | null) => {
                        if (!basket) return null;
                        return basket.items
                            .sort((a, b) => a.productId.localeCompare(b.productId))
                            .map(({ productId, quantity }) => [productId, quantity]);
                    };

                    const areTheSame =
                        JSON.stringify(prepareForComparison(serverBasket)) ===
                        JSON.stringify(prepareForComparison(localBasket));

                    if (areTheSame) {
                        console.log("==> Server and local basket are the same \n==> Do nothing");
                        return null;
                    } else {
                        console.log(
                            "==> Server and local basket are different \n==> Let user choose between:\n",
                            serverBasket,
                            localBasket,
                        );
                        return { serverBasket, localBasket };
                    }
                }

                // Sync local basket
                if (serverQuantities > 0 && localQuantities === 0) {
                    console.log("==> No local basket \n==> Sync local basket");
                    get().syncLocalBasket();
                }

                // Sync server basket
                if (serverQuantities === 0 && localQuantities > 0) {
                    console.log("==> No server basket \n==> Sync server basket");
                    get().syncServerBasket();
                }

                return null;
            },

            /**
             * Refresh local basket with server data (if it exists)
             */
            syncLocalBasket: async () => {
                const basket = await GetBasket();
                if (basket) set(() => ({ basket }));
            },

            /**
             * Refresh server basket with local data
             */
            syncServerBasket: async () => {
                const localBasket = get().basket;
                if (!localBasket) return;

                // Update server basket
                const serverBasket = await GetBasket();

                console.log("Server Basket ->", serverBasket);

                if (serverBasket) {
                    await DeleteManyQuantity({
                        where: {
                            id: {
                                in: serverBasket.items.map(({ quatityId }) => quatityId),
                            },
                        },
                    });

                    await CreateManyQuantity({
                        data: localBasket.items.map(({ productId, quantity }) => ({
                            quantity,
                            productId,
                            orderId: serverBasket.orderId,
                        })),
                        skipDuplicates: true,
                    });
                }
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
