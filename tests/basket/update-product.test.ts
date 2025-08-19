import { useBasketStore } from "@comps/CORE/basket/basketStore";
import * as updateApi from "@process/basket/UpdateProductOnServerBasket";
import { Mock, beforeEach, describe, expect, it, vi } from "vitest";

describe("updateProductInBasket", () => {
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
        expect(basket?.items[0].productId).toBe("product-123");
        expect(basket?.items[0].quantity).toBe(1);
    });

    it("[LOGGED IN] Update product in basket", async () => {
        // Mock the action responses
        vi.spyOn(updateApi, "UpdateProductOnServerBasket").mockResolvedValue("order-123");

        // Update the product in the basket
        useBasketStore.getState().updateProductInBasket("product-123", 2);

        // Get the basket
        const basket = useBasketStore.getState().basket;

        // Check the basket
        expect(basket).toBeDefined();
        expect(basket?.orderId).toBe("order-123");
        expect(basket?.items[0].productId).toBe("product-123");
        expect(basket?.items[0].quantity).toBe(2);
        expect(updateApi.UpdateProductOnServerBasket).toHaveBeenCalled();
        await expect((updateApi.UpdateProductOnServerBasket as Mock).mock.results[0].value).resolves.toBe("order-123");
    });
});
