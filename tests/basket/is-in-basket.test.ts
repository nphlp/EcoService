import { useBasketStore } from "@comps/CORE/basket/basketStore";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock server-only module
vi.mock("server-only", () => ({}));

describe("isInBasket", () => {
    // Initial state(s)
    beforeEach(() => {
        useBasketStore.setState({
            basket: {
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
        expect(basket?.orderId).toBeUndefined();
        expect(basket?.items.length).toBe(1);
        expect(basket?.items[0].productId).toBe("product-123");
        expect(basket?.items[0].quantity).toBe(1);
    });

    it("No basket", async () => {
        // Define the basket
        useBasketStore.setState({ basket: null });

        // Get the basket
        const isInBasket = useBasketStore.getState().isInBasket("product-123");

        // Check the basket
        expect(isInBasket).toBe(false);
    });

    it("Is in basket", async () => {
        // Get the basket
        const isInBasket = useBasketStore.getState().isInBasket("product-123");

        // Check the basket
        expect(isInBasket).toBe(true);
    });

    it("Is not in basket", async () => {
        // Get the basket
        const isInBasket = useBasketStore.getState().isInBasket("product-456");

        // Check the basket
        expect(isInBasket).toBe(false);
    });
});
