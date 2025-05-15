import { useBasketStore } from "@comps/basket/basketStore";
import * as getApi from "@process/basket/GetServerBasket";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { localBasketOrderId, serverBasketStatusAccepted } from "./compare-mock";

describe("compareAndSyncBasket", () => {
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

    it("Server basket status is accepted", async () => {
        // Mock the action responses
        vi.spyOn(getApi, "GetServerBasket").mockResolvedValue(serverBasketStatusAccepted);

        // Define the basket
        useBasketStore.setState({ basket: localBasketOrderId });

        // Compare and sync basket
        const result = await useBasketStore.getState().compareAndSyncBasket();

        // Get the basket
        const basket = useBasketStore.getState().basket;

        // Check the basket
        expect(result).toBeNull();
        expect(basket).toBeNull();
        expect(getApi.GetServerBasket).toHaveBeenCalled();
        await expect((getApi.GetServerBasket as Mock).mock.results[0].value).resolves.toBe(serverBasketStatusAccepted);
    });
});
