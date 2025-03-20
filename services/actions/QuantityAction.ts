"use server";

/**
 * Actions serveur pour les opérations CRUD sur les quantitys
 * 
 * Ce fichier expose les méthodes de QuantityService comme des actions serveur Next.js.
 * Ces actions peuvent être appelées directement depuis les composants client.
 * 
 * Chaque action est une simple passerelle vers la méthode correspondante du service,
 * ce qui permet de centraliser la logique métier dans les classes de service.
 * 
 * Note: Ces actions ne sont pas mises en cache et ne doivent pas être utilisées
 * pour récupérer des données - utilisez plutôt les routes API avec mise en cache.
 */

import {
    QuantityService,
    CountQuantityProps,
    CountQuantityResponse,
    CreateQuantityProps,
    CreateQuantityResponse,
    DeleteQuantityProps,
    DeleteQuantityResponse,
    FindManyQuantityProps,
    FindManyQuantityResponse,
    FindUniqueQuantityProps,
    FindUniqueQuantityResponse,
    UpdateQuantityProps,
    UpdateQuantityResponse
} from "@services/class/QuantityClass";

/**
 * Creates a new quantity
 * @param props Quantity properties
 * @returns Created quantity or error
 */
export const CreateQuantity = async (props: CreateQuantityProps): Promise<CreateQuantityResponse> => {
    try {
        const { data, error } = await QuantityService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateQuantity -> " + (error as Error).message);
    }
};

/**
 * Updates a quantity
 * @param props Quantity ID and new data
 * @returns Updated quantity or error
 */
export const UpdateQuantity = async (props: UpdateQuantityProps): Promise<UpdateQuantityResponse> => {
    try {
        const { data, error } = await QuantityService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateQuantity -> " + (error as Error).message);
    }
};

/**
 * Deletes a quantity
 * @param props Quantity ID
 * @returns Deleted quantity or error
 */
export const DeleteQuantity = async (props: DeleteQuantityProps): Promise<DeleteQuantityResponse> => {
    try {
        const { data, error } = await QuantityService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteQuantity -> " + (error as Error).message);
    }
};

/**
 * Retrieves a quantity by ID or another filter (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Quantity ID or other filter
 * @returns Found quantity or error
 */
export const SelectQuantity = async (props: FindUniqueQuantityProps): Promise<FindUniqueQuantityResponse> => {
    try {
        const { data, error } = await QuantityService.findUnique(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectQuantity -> " + (error as Error).message);
    }
};

/**
 * Retrieves a list of quantitys with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of quantitys or error
 */
export const SelectQuantityList = async (props: FindManyQuantityProps): Promise<FindManyQuantityResponse> => {
    try {
        const { data, error } = await QuantityService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectQuantityList -> " + (error as Error).message);
    }
};

/**
 * Counts quantitys with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter options
 * @returns Count of quantitys or error
 */
export const SelectQuantityAmount = async (props: CountQuantityProps): Promise<CountQuantityResponse> => {
    try {
        const { data, error } = await QuantityService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectQuantityAmount -> " + (error as Error).message);
    }
};
