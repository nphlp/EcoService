import { useBasketStore } from "@comps/CORE/basket/basketStore";
import * as removeApi from "@process/basket/RemoveProductFromServerBasket";
import { Mock, beforeEach, describe, expect, it, vi } from "vitest";

describe("removeProductInBasket", () => {
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

    it("[LOGGED IN] Remove product from basket", async () => {
        // Mock the action responses
        vi.spyOn(removeApi, "RemoveProductFromServerBasket").mockResolvedValue("order-123");

        // Remove the product from the basket
        useBasketStore.getState().removeProductFromBasket("product-123");

        // Get the basket
        const basketAfterRemove = useBasketStore.getState().basket;

        // Check the basket
        expect(basketAfterRemove).toBeDefined();
        expect(basketAfterRemove?.orderId).toBe("order-123");
        expect(basketAfterRemove?.items.length).toBe(0);
        expect(removeApi.RemoveProductFromServerBasket).toHaveBeenCalled();
        await expect((removeApi.RemoveProductFromServerBasket as Mock).mock.results[0].value).resolves.toBe(
            "order-123",
        );
    });
});
