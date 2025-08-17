import { AddProductToServerBasket } from "@process/basket/AddProductToServerBasket";
import { ClearServerBasket } from "@process/basket/ClearServerBasket";
import { CreateServerBasket } from "@process/basket/CreateServerBasket";
import { FindPendingServerBasket } from "@process/basket/FindPendingServerBasket";
import { GetServerBasket } from "@process/basket/GetServerBasket";
import { RemoveProductFromServerBasket } from "@process/basket/RemoveProductFromServerBasket";
import { SyncServerBasket } from "@process/basket/SyncServerBasket";
import { UpdateProductOnServerBasket } from "@process/basket/UpdateProductOnServerBasket";
import { OrderModel } from "@services/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandCookieStorage } from "../../lib/zustandCookieStorage";
import { BasketProduct, LocalBasket, LocalBasketItem, ServerBasket } from "./basketType";

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

                // Create server basket, add quantity, then overwrite local basket
                if (!localBasket?.orderId) {
                    const orderId = await CreateServerBasket({
                        items: [{ ...product, quantity: 1 }],
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

                // May not happen, because `compareAndSyncBasket` add the orderId
                if (!localBasket.orderId) return;

                // Update server basket, then overwrite local basket
                const orderId = await UpdateProductOnServerBasket({
                    orderId: localBasket.orderId,
                    productId,
                    quantity,
                });
                if (orderId) get().syncLocalBasket(orderId);
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

                // May not happen, because `compareAndSyncBasket` add the orderId
                if (!localBasket.orderId) return;

                // Find or create server basket, update local basket orderId
                const orderId = await RemoveProductFromServerBasket({ orderId: localBasket.orderId, productId });
                if (orderId) get().syncLocalBasket(orderId);
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

                // Clear server basket
                if (localBasket?.orderId) await ClearServerBasket({ orderId: localBasket.orderId });
            },

            /**
             * Clear local basket
             */
            clearLocalBasket: () => {
                const localBasket = get().basket;
                if (localBasket) set({ basket: null });
            },

            compareAndSyncBasket: async () => {
                // Get local basket
                const localBasket = get().basket;

                // Local basket orderId exists
                // -> If order isn't pending anymore, clear local basket
                if (localBasket?.orderId) {
                    const serverBasket = await GetServerBasket({ orderId: localBasket.orderId });
                    if (
                        serverBasket &&
                        serverBasket.paymentStatus !== "PENDING" &&
                        serverBasket.orderStatus !== "PENDING"
                    ) {
                        get().clearLocalBasket();
                        return null;
                    }
                }

                // Try to find a server basket (required for next steps)
                const foundOrderId = await FindPendingServerBasket();

                // No local basket, but server basket found
                if (!localBasket && foundOrderId) {
                    get().syncLocalBasket(foundOrderId);
                    return null;
                }

                // Create server basket and sync local basket
                if (localBasket && !foundOrderId) {
                    const orderId = await CreateServerBasket({
                        items: localBasket.items.map((product) => ({
                            ...product,
                            quantity: product.quantity,
                        })),
                    });
                    if (orderId) get().syncLocalBasket(orderId);
                    return null;
                }

                // Local basket exists, server basket orderId found
                if (localBasket && foundOrderId) {
                    // Local basket orderId exist, or server basket orderId found
                    const usedOrderId = localBasket.orderId ?? foundOrderId;

                    // Get server basket
                    const serverBasket = await GetServerBasket({ orderId: usedOrderId });

                    // Server basket exists, but not found
                    // -> Impossible case, do nothing
                    if (!serverBasket) return null;

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
                        const sameBaskets = areBasketsTheSame(serverBasket, localBasket);
                        // Ask user to choose which basket to keep
                        if (!sameBaskets) return { serverBasket, localBasket };
                        get().syncLocalBasket(serverBasket.orderId);
                    }
                }

                // Both baskets are empty
                return null;
            },

            /**
             * Overwrite local basket with server basket
             * - Get server basket with orderId
             * - Overwrite the local basket
             */
            syncLocalBasket: async (orderId) => {
                const serverBasket = await GetServerBasket({ orderId });
                if (!serverBasket) return;

                set(() => ({ basket: serverBasket }));
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
const areBasketsTheSame = (serverBasket: ServerBasket, localBasket: LocalBasket): boolean => {
    const prepareForComparison = (basket: ServerBasket | LocalBasket) =>
        basket.items
            .sort((a, b) => a.productId.localeCompare(b.productId))
            .map(({ productId, quantity }) => [productId, quantity]);

    const areTheSame =
        JSON.stringify(prepareForComparison(serverBasket)) === JSON.stringify(prepareForComparison(localBasket));

    return areTheSame;
};
