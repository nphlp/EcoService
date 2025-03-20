"use server";

/**
 * Actions serveur pour les opérations CRUD sur les fruits
 * 
 * Ce fichier expose les méthodes de FruitService comme des actions serveur Next.js.
 * Ces actions peuvent être appelées directement depuis les composants client.
 * 
 * Chaque action est une simple passerelle vers la méthode correspondante du service,
 * ce qui permet de centraliser la logique métier dans les classes de service.
 * 
 * Note: Ces actions ne sont pas mises en cache et ne doivent pas être utilisées
 * pour récupérer des données - utilisez plutôt les routes API avec mise en cache.
 */

import {
    FruitService,
    CountFruitProps,
    CountFruitResponse,
    CreateFruitProps,
    CreateFruitResponse,
    DeleteFruitProps,
    DeleteFruitResponse,
    FindManyFruitProps,
    FindManyFruitResponse,
    FindUniqueFruitProps,
    FindUniqueFruitResponse,
    UpdateFruitProps,
    UpdateFruitResponse
} from "@services/class/FruitClass";

/**
 * Creates a new fruit
 * @param props Fruit properties
 * @returns Created fruit or error
 */
export const CreateFruit = async (props: CreateFruitProps): Promise<CreateFruitResponse> => {
    try {
        const { data, error } = await FruitService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateFruit -> " + (error as Error).message);
    }
};

/**
 * Updates a fruit
 * @param props Fruit ID and new data
 * @returns Updated fruit or error
 */
export const UpdateFruit = async (props: UpdateFruitProps): Promise<UpdateFruitResponse> => {
    try {
        const { data, error } = await FruitService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateFruit -> " + (error as Error).message);
    }
};

/**
 * Deletes a fruit
 * @param props Fruit ID
 * @returns Deleted fruit or error
 */
export const DeleteFruit = async (props: DeleteFruitProps): Promise<DeleteFruitResponse> => {
    try {
        const { data, error } = await FruitService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteFruit -> " + (error as Error).message);
    }
};

/**
 * Retrieves a fruit by ID or another filter (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Fruit ID or other filter
 * @returns Found fruit or error
 */
export const SelectFruit = async (props: FindUniqueFruitProps): Promise<FindUniqueFruitResponse> => {
    try {
        const { data, error } = await FruitService.findUnique(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectFruit -> " + (error as Error).message);
    }
};

/**
 * Retrieves a list of fruits with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of fruits or error
 */
export const SelectFruitList = async (props: FindManyFruitProps): Promise<FindManyFruitResponse> => {
    try {
        const { data, error } = await FruitService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectFruitList -> " + (error as Error).message);
    }
};

/**
 * Counts fruits with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter options
 * @returns Count of fruits or error
 */
export const SelectFruitAmount = async (props: CountFruitProps): Promise<CountFruitResponse> => {
    try {
        const { data, error } = await FruitService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectFruitAmount -> " + (error as Error).message);
    }
};
