import { useBasketStore } from "@comps/basket/basketStore";
import * as addApi from "@process/basket/AddProductToServerBasket";
import * as createApi from "@process/basket/CreateServerBasket";
import { Mock, beforeEach, describe, expect, it, vi } from "vitest";

describe("addProductToBasket", () => {
    // Initial state(s)
    beforeEach(() => {
        useBasketStore.setState({ basket: null });
        vi.resetAllMocks();
    });

    // Check the initial state
    it("State(s) before test", async () => {
        // Get the basket
        const basket = useBasketStore.getState().basket;

        // Check the basket
        expect(basket).toBeNull();
    });

    it("[LOGGED IN] Add product (and initialize basket)", async () => {
        // Mock the action responses
        vi.spyOn(createApi, "CreateServerBasket").mockResolvedValue("order-123");

        // Define the basket
        useBasketStore.setState({ basket: null });

        // Add product to new basket
        useBasketStore.getState().addProductToBasket({
            productId: "product-123",
            name: "Produit test",
            description: "Description du produit",
            price: 10,
            image: "image.jpg",
        });

        // Get the basket
        const basket = useBasketStore.getState().basket;

        // Check the basket
        expect(basket).toBeDefined();
        expect(basket?.orderId).toBeUndefined();
        expect(basket?.items.length).toBe(1);
        expect(basket?.items[0].productId).toBe("product-123");
        expect(basket?.items[0].quantity).toBe(1);
        expect(createApi.CreateServerBasket).toHaveBeenCalled();
        await expect((createApi.CreateServerBasket as Mock).mock.results[0].value).resolves.toBe("order-123");
    });

    it("[LOGGED IN] Add product (to an existing basket)", async () => {
        // Mock the action responses
        vi.spyOn(addApi, "AddProductToServerBasket").mockResolvedValue("order-123");

        // Define the basket
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

        // Add product to existing basket
        useBasketStore.getState().addProductToBasket({
            productId: "product-456",
            name: "Produit test 2",
            description: "Description du produit 2",
            price: 20,
            image: "image2.jpg",
        });

        // Get the basket
        const basket = useBasketStore.getState().basket;

        // Check the basket
        expect(basket).toBeDefined();
        expect(basket?.orderId).toBe("order-123");
        expect(basket?.items.length).toBe(2);
        expect(basket?.items[0].productId).toBe("product-123");
        expect(basket?.items[0].quantity).toBe(1);
        expect(basket?.items[1].productId).toBe("product-456");
        expect(basket?.items[1].quantity).toBe(1);
        expect(addApi.AddProductToServerBasket).toHaveBeenCalled();
        await expect((addApi.AddProductToServerBasket as Mock).mock.results[0].value).resolves.toBe("order-123");
    });
});
