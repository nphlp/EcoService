import { useBasketStore } from "@comps/basket/basketStore";
import { LocalBasket } from "@comps/basket/basketType";
import * as updateApi from "@process/basket/UpdateProductOnServerBasket";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("updateProductInBasket", () => {
    // Reset states and mocks before each test
    beforeEach(() => {
        useBasketStore.setState({ basket: null });
        vi.resetAllMocks();
    });

    it("User (logged in): update product in basket", async () => {
        // Mock the action responses
        vi.spyOn(updateApi, "UpdateProductOnServerBasket").mockResolvedValue("order-123");

        // Product to add
        const basket: LocalBasket = {
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
        };

        // Set the basket
        useBasketStore.setState({ basket });

        const basketBeforeUpdate = useBasketStore.getState().basket;

        // Check the basket
        expect(basketBeforeUpdate).toBeDefined();
        expect(basketBeforeUpdate?.items[0].productId).toBe("product-123");
        expect(basketBeforeUpdate?.items[0].quantity).toBe(1);

        // Update the product in the basket
        useBasketStore.getState().updateProductInBasket("product-123", 2);

        // Get the basket
        const basketAfterUpdate = useBasketStore.getState().basket;

        // Check the basket
        expect(basketAfterUpdate).toBeDefined();
        expect(basketAfterUpdate?.items[0].productId).toBe("product-123");
        expect(basketAfterUpdate?.items[0].quantity).toBe(2);
        expect(updateApi.UpdateProductOnServerBasket).toHaveBeenCalled();
    });
});
