"use server";

/**
 * Actions serveur pour les opérations CRUD sur les diys
 * 
 * Ce fichier expose les méthodes de DiyService comme des actions serveur Next.js.
 * Ces actions peuvent être appelées directement depuis les composants client.
 * 
 * Chaque action est une simple passerelle vers la méthode correspondante du service,
 * ce qui permet de centraliser la logique métier dans les classes de service.
 * 
 * Note: Ces actions ne sont pas mises en cache et ne doivent pas être utilisées
 * pour récupérer des données - utilisez plutôt les routes API avec mise en cache.
 */

import {
    DiyService,
    CountDiyProps,
    CountDiyResponse,
    CreateDiyProps,
    CreateDiyResponse,
    DeleteDiyProps,
    DeleteDiyResponse,
    FindManyDiyProps,
    FindManyDiyResponse,
    FindUniqueDiyProps,
    FindUniqueDiyResponse,
    UpdateDiyProps,
    UpdateDiyResponse
} from "@services/class/DiyClass";

/**
 * Creates a new diy
 * @param props Diy properties
 * @returns Created diy or error
 */
export const CreateDiy = async (props: CreateDiyProps): Promise<CreateDiyResponse> => {
    try {
        const { data, error } = await DiyService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateDiy -> " + (error as Error).message);
    }
};

/**
 * Updates a diy
 * @param props Diy ID and new data
 * @returns Updated diy or error
 */
export const UpdateDiy = async (props: UpdateDiyProps): Promise<UpdateDiyResponse> => {
    try {
        const { data, error } = await DiyService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateDiy -> " + (error as Error).message);
    }
};

/**
 * Deletes a diy
 * @param props Diy ID
 * @returns Deleted diy or error
 */
export const DeleteDiy = async (props: DeleteDiyProps): Promise<DeleteDiyResponse> => {
    try {
        const { data, error } = await DiyService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteDiy -> " + (error as Error).message);
    }
};

/**
 * Retrieves a diy by ID or another filter (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Diy ID or other filter
 * @returns Found diy or error
 */
export const SelectDiy = async (props: FindUniqueDiyProps): Promise<FindUniqueDiyResponse> => {
    try {
        const { data, error } = await DiyService.findUnique(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectDiy -> " + (error as Error).message);
    }
};

/**
 * Retrieves a list of diys with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of diys or error
 */
export const SelectDiyList = async (props: FindManyDiyProps): Promise<FindManyDiyResponse> => {
    try {
        const { data, error } = await DiyService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectDiyList -> " + (error as Error).message);
    }
};

/**
 * Counts diys with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter options
 * @returns Count of diys or error
 */
export const SelectDiyAmount = async (props: CountDiyProps): Promise<CountDiyResponse> => {
    try {
        const { data, error } = await DiyService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectDiyAmount -> " + (error as Error).message);
    }
};
