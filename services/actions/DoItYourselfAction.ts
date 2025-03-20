"use server";

/**
 * Actions serveur pour les opérations CRUD sur les doItYourselfs
 * 
 * Ce fichier expose les méthodes de DoItYourselfService comme des actions serveur Next.js.
 * Ces actions peuvent être appelées directement depuis les composants client.
 * 
 * Chaque action est une simple passerelle vers la méthode correspondante du service,
 * ce qui permet de centraliser la logique métier dans les classes de service.
 * 
 * Note: Ces actions ne sont pas mises en cache et ne doivent pas être utilisées
 * pour récupérer des données - utilisez plutôt les routes API avec mise en cache.
 */

import {
    DoItYourselfService,
    CountDoItYourselfProps,
    CountDoItYourselfResponse,
    CreateDoItYourselfProps,
    CreateDoItYourselfResponse,
    DeleteDoItYourselfProps,
    DeleteDoItYourselfResponse,
    FindManyDoItYourselfProps,
    FindManyDoItYourselfResponse,
    FindUniqueDoItYourselfProps,
    FindUniqueDoItYourselfResponse,
    UpdateDoItYourselfProps,
    UpdateDoItYourselfResponse
} from "@services/class/DoItYourselfClass";

/**
 * Creates a new doItYourself
 * @param props DoItYourself properties
 * @returns Created doItYourself or error
 */
export const CreateDoItYourself = async (props: CreateDoItYourselfProps): Promise<CreateDoItYourselfResponse> => {
    try {
        const { data, error } = await DoItYourselfService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateDoItYourself -> " + (error as Error).message);
    }
};

/**
 * Updates a doItYourself
 * @param props DoItYourself ID and new data
 * @returns Updated doItYourself or error
 */
export const UpdateDoItYourself = async (props: UpdateDoItYourselfProps): Promise<UpdateDoItYourselfResponse> => {
    try {
        const { data, error } = await DoItYourselfService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateDoItYourself -> " + (error as Error).message);
    }
};

/**
 * Deletes a doItYourself
 * @param props DoItYourself ID
 * @returns Deleted doItYourself or error
 */
export const DeleteDoItYourself = async (props: DeleteDoItYourselfProps): Promise<DeleteDoItYourselfResponse> => {
    try {
        const { data, error } = await DoItYourselfService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteDoItYourself -> " + (error as Error).message);
    }
};

/**
 * Retrieves a doItYourself by ID or another filter (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props DoItYourself ID or other filter
 * @returns Found doItYourself or error
 */
export const SelectDoItYourself = async (props: FindUniqueDoItYourselfProps): Promise<FindUniqueDoItYourselfResponse> => {
    try {
        const { data, error } = await DoItYourselfService.findUnique(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectDoItYourself -> " + (error as Error).message);
    }
};

/**
 * Retrieves a list of doItYourselfs with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of doItYourselfs or error
 */
export const SelectDoItYourselfList = async (props: FindManyDoItYourselfProps): Promise<FindManyDoItYourselfResponse> => {
    try {
        const { data, error } = await DoItYourselfService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectDoItYourselfList -> " + (error as Error).message);
    }
};

/**
 * Counts doItYourselfs with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter options
 * @returns Count of doItYourselfs or error
 */
export const SelectDoItYourselfAmount = async (props: CountDoItYourselfProps): Promise<CountDoItYourselfResponse> => {
    try {
        const { data, error } = await DoItYourselfService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectDoItYourselfAmount -> " + (error as Error).message);
    }
};
