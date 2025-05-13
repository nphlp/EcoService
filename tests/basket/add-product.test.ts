import { useBasketStore } from "@comps/basket/basketStore";
import { LocalBasketItem, ServerBasket } from "@comps/basket/basketType";
import * as createApi from "@process/basket/CreateServerBasket";
import * as addApi from "@process/basket/AddProductToServerBasket";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("addProductToBasket", () => {
    // Reset states and mocks before each test
    beforeEach(() => {
        useBasketStore.setState({ basket: null });
        vi.resetAllMocks();
    });

    it("User (logged in): initialize basket and add product", async () => {
        // Mock the action responses
        vi.spyOn(createApi, "CreateServerBasket").mockResolvedValue("order-123");

        // Product to add
        const produit1: LocalBasketItem = {
            productId: "product-123",
            name: "Produit test",
            description: "Description du produit",
            price: 10,
            image: "image.jpg",
            quantity: 1,
        };
        const produit2: LocalBasketItem = {
            productId: "product-456",
            name: "Produit test 2",
            description: "Description du produit 2",
            price: 20,
            image: "image2.jpg",
            quantity: 1,
        };

        // Add the product to the basket
        useBasketStore.getState().addProductToBasket(produit1);
        useBasketStore.getState().addProductToBasket(produit2);

        // Get the basket
        const panier = useBasketStore.getState().basket;

        // Check the basket
        expect(panier).toBeDefined();
        expect(panier?.items[0].productId).toBe("product-123");
        expect(panier?.items[1].productId).toBe("product-456");
        expect(createApi.CreateServerBasket).toHaveBeenCalled();
    });

    it("User (logged in): add product to existing basket", async () => {
        // Mock the action responses
        vi.spyOn(addApi, "AddProductToServerBasket").mockResolvedValue("order-123");

        // Product to add
        const basket: ServerBasket = {
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
        const produit: LocalBasketItem = {
            productId: "product-456",
            name: "Produit test 2",
            description: "Description du produit 2",
            price: 20,
            image: "image2.jpg",
            quantity: 1,
        };

        // Add the product to the basket
        useBasketStore.setState({ basket });
        useBasketStore.getState().addProductToBasket(produit);

        // Get the basket
        const panier = useBasketStore.getState().basket;

        // Check the basket
        expect(panier).toBeDefined();
        expect(panier?.items[0].productId).toBe("product-123");
        expect(panier?.items[1].productId).toBe("product-456");
        expect(addApi.AddProductToServerBasket).toHaveBeenCalled();
    });
});
