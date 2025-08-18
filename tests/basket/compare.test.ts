import { useBasketStore } from "@comps/basket/basketStore";
import * as createApi from "@process/basket/CreateServerBasket";
import * as findApi from "@process/basket/FindPendingServerBasket";
import * as getApi from "@process/basket/GetServerBasket";
import { Mock, beforeEach, describe, expect, it, vi } from "vitest";
import {
    emptyLocalBasketOrderId,
    emptyServerBasket,
    localBasketOrderId,
    serverBasket,
    serverBasketLessItems,
    serverBasketStatusAccepted,
} from "./compare-mock";

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

    it("Local basket does not exist, server basket exists", async () => {
        // Mock the action responses
        vi.spyOn(findApi, "FindPendingServerBasket").mockResolvedValue("order-123");

        // Define the basket
        useBasketStore.setState({ basket: null });

        // Compare and sync basket
        const result = await useBasketStore.getState().compareAndSyncBasket();

        // Get the basket
        const basket = useBasketStore.getState().basket;

        // Check the basket
        expect(result).toBeNull();
        expect(basket).toBeNull();
        expect(findApi.FindPendingServerBasket).toHaveBeenCalled();
        await expect((findApi.FindPendingServerBasket as Mock).mock.results[0].value).resolves.toBe("order-123");
    });

    it("Local basket exists, server basket does not exist", async () => {
        // Mock the action responses
        vi.spyOn(findApi, "FindPendingServerBasket").mockResolvedValue(null);
        vi.spyOn(createApi, "CreateServerBasket").mockResolvedValue("order-123");

        // Define the basket
        useBasketStore.setState({ basket: localBasketOrderId });

        // Compare and sync basket
        const result = await useBasketStore.getState().compareAndSyncBasket();

        // Get the basket
        const basket = useBasketStore.getState().basket;

        // Check the basket
        expect(result).toBeNull();
        expect(basket).toBe(localBasketOrderId);
        expect(findApi.FindPendingServerBasket).toHaveBeenCalled();
        await expect((findApi.FindPendingServerBasket as Mock).mock.results[0].value).resolves.toBeNull();
        expect(createApi.CreateServerBasket).toHaveBeenCalled();
        await expect((createApi.CreateServerBasket as Mock).mock.results[0].value).resolves.toBe("order-123");
    });

    it("Both baskets exists, serverQuantities > 0 and localQuantities === 0", async () => {
        // Mock the action responses
        vi.spyOn(findApi, "FindPendingServerBasket").mockResolvedValue("order-123");
        vi.spyOn(getApi, "GetServerBasket").mockResolvedValue(serverBasket);

        // Define the basket
        useBasketStore.setState({ basket: emptyLocalBasketOrderId });

        // Compare and sync basket
        const result = await useBasketStore.getState().compareAndSyncBasket();

        // Get the basket
        const basket = useBasketStore.getState().basket;

        // Check the basket
        expect(result).toBeNull();
        expect(basket).toBe(serverBasket);
        expect(findApi.FindPendingServerBasket).toHaveBeenCalled();
        await expect((findApi.FindPendingServerBasket as Mock).mock.results[0].value).resolves.toBe("order-123");
        expect(getApi.GetServerBasket).toHaveBeenCalled();
        await expect((getApi.GetServerBasket as Mock).mock.results[0].value).resolves.toBe(serverBasket);
    });

    it("Both baskets exists, serverQuantities === 0 and localQuantities > 0", async () => {
        // Mock the action responses
        vi.spyOn(findApi, "FindPendingServerBasket").mockResolvedValue("order-123");
        vi.spyOn(getApi, "GetServerBasket").mockResolvedValue(emptyServerBasket);

        // Define the basket
        useBasketStore.setState({ basket: localBasketOrderId });

        // Compare and sync basket
        const result = await useBasketStore.getState().compareAndSyncBasket();

        // Get the basket
        const basket = useBasketStore.getState().basket;

        // Check the basket
        expect(result).toBeNull();
        expect(basket).toBe(localBasketOrderId);
        expect(findApi.FindPendingServerBasket).toHaveBeenCalled();
        await expect((findApi.FindPendingServerBasket as Mock).mock.results[0].value).resolves.toBe("order-123");
        expect(getApi.GetServerBasket).toHaveBeenCalled();
        await expect((getApi.GetServerBasket as Mock).mock.results[0].value).resolves.toBe(emptyServerBasket);
    });

    it("Both baskets exists, both quantities > 0, items are the same", async () => {
        // Mock the action responses
        vi.spyOn(findApi, "FindPendingServerBasket").mockResolvedValue("order-123");
        vi.spyOn(getApi, "GetServerBasket").mockResolvedValue(serverBasket);

        // Define the basket
        useBasketStore.setState({ basket: localBasketOrderId });

        // Compare and sync basket
        const result = await useBasketStore.getState().compareAndSyncBasket();

        // Get the basket
        const basket = useBasketStore.getState().basket;

        // Check the basket
        expect(result).toBeNull();
        expect(basket).toBe(serverBasket);
        expect(findApi.FindPendingServerBasket).toHaveBeenCalled();
        await expect((findApi.FindPendingServerBasket as Mock).mock.results[0].value).resolves.toBe("order-123");
        expect(getApi.GetServerBasket).toHaveBeenCalled();
        await expect((getApi.GetServerBasket as Mock).mock.results[0].value).resolves.toBe(serverBasket);
    });

    it("Both baskets exists, both quantities > 0, items are different", async () => {
        // Mock the action responses
        vi.spyOn(findApi, "FindPendingServerBasket").mockResolvedValue("order-123");
        vi.spyOn(getApi, "GetServerBasket").mockResolvedValue(serverBasketLessItems);

        // Define the basket
        useBasketStore.setState({ basket: localBasketOrderId });

        // Compare and sync basket
        const result = await useBasketStore.getState().compareAndSyncBasket();

        // Get the basket
        const basket = useBasketStore.getState().basket;

        // Check the basket
        expect(result).toStrictEqual({ serverBasket: serverBasketLessItems, localBasket: localBasketOrderId });
        expect(basket).toBe(localBasketOrderId);
        expect(findApi.FindPendingServerBasket).toHaveBeenCalled();
        await expect((findApi.FindPendingServerBasket as Mock).mock.results[0].value).resolves.toBe("order-123");
        expect(getApi.GetServerBasket).toHaveBeenCalled();
        await expect((getApi.GetServerBasket as Mock).mock.results[0].value).resolves.toBe(serverBasketLessItems);
    });
});
