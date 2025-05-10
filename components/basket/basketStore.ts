import { AddProductToServerBasket } from "@process/basket/AddProductToServerBasket";
import { ClearServerBasket } from "@process/basket/ClearServerBasket";
import { CreateServerBasket } from "@process/basket/CreateServerBasket";
import { FindBasket } from "@process/basket/FindBasket";
import { GetServerBasket } from "@process/basket/GetServerBasket";
import { SyncServerBasket } from "@process/basket/SyncServerBasket";
import { UpdateProductOnServerBasket } from "@process/basket/UpdateProductOnServerBasket";
import { OrderModel } from "@services/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { BasketProduct, LocalBasket, LocalBasketItem, ServerBasket } from "./basketType";
import { zustandCookieStorage } from "./zustandCookieStorage";
import { RemoveProductFromServerBasket } from "@process/basket/RemoveProductFromServerBasket";

type Store = {
    // State
    basket: LocalBasket | null;

    // Actions
    isInBasket: (productId: LocalBasketItem["productId"]) => boolean;

    addProductToBasket: (product: BasketProduct) => void;
    updateProductInBasket: (productId: BasketProduct["productId"], quantity: number) => void;
    removeProductFromBasket: (productId: BasketProduct["productId"]) => void;

    clearBothBasket: () => void;
    clearLocalBasket: () => void;

    compareAndSyncBasket: () => Promise<{
        serverBasket: ServerBasket;
        localBasket: LocalBasket;
    } | null>;

    syncLocalBasket: (orderId: OrderModel["id"]) => void;
    syncServerBasket: (orderId: OrderModel["id"]) => void;
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

            /**
             * Add product to basket
             * - Create local basket (if needed)
             * - Add product to local basket
             * - Create server basket (if needed)
             * - Add product to server basket
             * - Overwrite local basket with server basket
             */
            addProductToBasket: async (product) => {
                const localBasket = get().basket;

                console.log("==> Add product to basket", product, "\n", localBasket);

                // Create local basket, add quantity
                if (!localBasket) {
                    set({ basket: { items: [{ ...product, quantity: 1 }] } });
                }
                // Use local basket, add quantity
                else {
                    set({
                        basket: {
                            ...localBasket,
                            items: [...localBasket.items, { ...product, quantity: 1 }],
                        },
                    });
                }

                console.log("==> Local basket, after local add\n", get().basket);

                // Create server basket, add quantity, then overwrite local basket
                if (!localBasket?.orderId) {
                    const orderId = await CreateServerBasket({
                        item: { ...product, quantity: 1 },
                    });
                    if (orderId) get().syncLocalBasket(orderId);
                }
                // Get server basket, add quantity, then overwrite local basket
                else {
                    const orderId = await AddProductToServerBasket({
                        orderId: localBasket.orderId,
                        item: { ...product, quantity: 1 },
                    });
                    if (orderId) get().syncLocalBasket(orderId);
                }

                console.log("==> Local basket, after server add\n", get().basket);
            },

            /**
             * Update product in basket
             * - Update local basket
             * - Get server basket
             * - Update server basket
             * - Overwrite local basket with server basket
             */
            updateProductInBasket: async (productId, quantity) => {
                const localBasket = get().basket;

                console.log("==> Update product in basket:", productId, quantity, "\n", localBasket);

                // No local basket
                // -> Impossible case, do nothing
                if (!localBasket) return;

                // Update quantity in local basket
                set({
                    basket: {
                        ...localBasket,
                        items: localBasket.items.map((prod) =>
                            prod.productId === productId ? { ...prod, quantity } : prod,
                        ),
                    },
                });

                console.log("==> Local basket, after server update\n", get().basket);

                // TODO: find a basket ?
                // -> Happens if user logs in after using a local basket
                if (!localBasket.orderId) return;

                // Update server basket, then overwrite local basket
                const orderId = await UpdateProductOnServerBasket({ productId, quantity });
                if (orderId) get().syncLocalBasket(orderId);

                console.log("==> Local basket, after server update\n", get().basket);
            },

            /**
             * Remove product from basket
             * - Remove quantity from local basket
             * - Get server basket
             * - Remove quantity from server basket
             * - Overwrite local basket with server basket
             */
            removeProductFromBasket: async (productId) => {
                const localBasket = get().basket;

                console.log("==> Remove product from basket", productId, "\n", localBasket);

                // No local basket
                // -> Impossible case, do nothing
                if (!localBasket) return;

                // Remove quantity from local basket
                set({
                    basket: {
                        ...localBasket,
                        items: localBasket.items.filter((prod) => prod.productId !== productId),
                    },
                });

                console.log("==> Local basket after local remove\n", get().basket);

                // TODO: find a basket ?
                // -> Happens if user logs in after using a local basket
                if (!localBasket.orderId) return;

                // Find or create server basket, update local basket orderId
                const orderId = await RemoveProductFromServerBasket({ productId });
                if (orderId) get().syncLocalBasket(orderId);

                console.log("==> Local basket after server remove\n", get().basket);
            },

            /**
             * Clear both basket
             * - Clear local basket
             * - Clear server basket
             */
            clearBothBasket: async () => {
                const localBasket = get().basket;

                // Clear local basket
                if (localBasket) set({ basket: null });

                console.log("==> Local basket cleared\n");

                // Clear server basket
                if (localBasket?.orderId) await ClearServerBasket({ orderId: localBasket.orderId });

                console.log("==> Server basket cleared\n");
            },

            /**
             * Clear local basket
             */
            clearLocalBasket: () => {
                const localBasket = get().basket;
                if (localBasket) set({ basket: null });

                console.log("==> Local basket cleared");
            },

            compareAndSyncBasket: async () => {
                // Get local basket
                const localBasket = get().basket;

                // No local basket, no local orderId
                // -> Try to find a server basket, and sync it
                if (!localBasket?.orderId) {
                    const orderId = await FindBasket();
                    if (orderId) get().syncLocalBasket(orderId);
                    return null;
                }

                // Local orderId exist
                // -> Get server basket
                const serverBasket = await GetServerBasket({ orderId: localBasket.orderId });

                // Local basket with orderId exists, but server basket not found
                // -> Impossible case, do nothing
                if (!serverBasket) return null;

                // Local basket and corresponding server basket exists
                // -> If order has been paid and accepted, clear local basket
                if (
                    localBasket.orderId === serverBasket.orderId &&
                    serverBasket.paymentStatus === "ACCEPTED" &&
                    serverBasket.orderStatus === "ACCEPTED"
                ) {
                    get().clearLocalBasket();
                    return null;
                }

                const serverQuantities = serverBasket.items.length;
                const localQuantities = localBasket.items.length;

                // Server basket contains products, local basket is empty
                // -> Sync local basket
                if (serverQuantities > 0 && localQuantities === 0) {
                    get().syncLocalBasket(serverBasket.orderId);
                }

                // Local basket contains products, server basket is empty
                // -> Sync server basket
                else if (serverQuantities === 0 && localQuantities > 0) {
                    get().syncServerBasket(serverBasket.orderId);
                }

                // Server and local baskets contain products
                else if (serverQuantities > 0 && localQuantities > 0) {
                    const areTheSame = areBasketsTheSame(serverBasket, localBasket);
                    if (!areTheSame) return { serverBasket, localBasket };
                }

                // Both baskets are empty
                // -> Impossible case, do nothing
                return null;
            },

            /**
             * Overwrite local basket with server basket
             * - Get server basket with orderId
             * - Overwrite the local basket
             */
            syncLocalBasket: async (orderId) => {
                const newBasket = await GetServerBasket({ orderId });
                if (!newBasket) return;

                set(() => ({ basket: newBasket }));

                console.log("==> Local basket synced\n", get().basket);
            },

            /**
             * Overwrite server basket with local basket
             * - Get local basket
             * - Get server basket with orderId
             * - Overwrite the server basket
             */
            syncServerBasket: async (orderId) => {
                const localBasket = get().basket;
                if (!localBasket) return;

                // Update server basket
                await SyncServerBasket({ localBasket, orderId });

                console.log("==> Server basket synced\n", get().basket);
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

/**
 * Compare two baskets
 * - Sort both baskets properties
 * - JSON stringify objects
 * - Compare strings
 * @param serverBasket - Server basket
 * @param localBasket - Local basket
 * @returns True if the baskets are the same, false otherwise
 */
const areBasketsTheSame = (serverBasket: ServerBasket, localBasket: LocalBasket) => {
    const prepareForComparison = (basket: ServerBasket | LocalBasket | null) => {
        if (!basket) return null;
        return basket.items
            .sort((a, b) => a.productId.localeCompare(b.productId))
            .map(({ productId, quantity }) => [productId, quantity]);
    };

    const areTheSame =
        JSON.stringify(prepareForComparison(serverBasket)) === JSON.stringify(prepareForComparison(localBasket));

    return areTheSame;
};
