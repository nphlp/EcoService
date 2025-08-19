import { useBasketStore } from "@comps/CORE/basket/basketStore";
import * as clearApi from "@process/basket/ClearServerBasket";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("addProductToBasket", () => {
    // Initial state(s)
    beforeEach(() => {
        useBasketStore.setState({
            basket: {
                orderId: "order-123",
                items: [
                    {
                        productId: "product-123",
                        name: "Produit test",
                        description: "Description du produit",
                        price: 10,
                        image: "image.jpg",
                        quantityId: "quantity-123",
                        quantity: 1,
                    },
                    {
                        productId: "product-456",
                        name: "Produit test 2",
                        description: "Description du produit 2",
                        price: 20,
                        image: "image2.jpg",
                        quantityId: "quantity-456",
                        quantity: 1,
                    },
                ],
            },
        });
        vi.resetAllMocks();
    });

    // Check the initial state
    it("State(s) before test", async () => {
        // Get the basket
        const basket = useBasketStore.getState().basket;

        // Check the basket
        expect(basket).toBeDefined();
        expect(basket?.orderId).toBe("order-123");
        expect(basket?.items.length).toBe(2);
        expect(basket?.items[0].productId).toBe("product-123");
        expect(basket?.items[1].productId).toBe("product-456");
    });

    it("Clear both basket", async () => {
        // Mock the action responses
        vi.spyOn(clearApi, "ClearServerBasket");

        // Clear the basket
        useBasketStore.getState().clearBothBasket();

        // Get the basket
        const basketAfterClear = useBasketStore.getState().basket;

        // Check the basket
        expect(basketAfterClear).toBeNull();
        expect(clearApi.ClearServerBasket).toHaveBeenCalled();
    });

    it("Clear local basket", async () => {
        // Clear the basket
        useBasketStore.getState().clearLocalBasket();

        // Get the basket
        const basketAfterClear = useBasketStore.getState().basket;

        // Check the basket
        expect(basketAfterClear).toBeNull();
    });
});
