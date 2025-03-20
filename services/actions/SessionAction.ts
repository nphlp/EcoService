"use server";

/**
 * Actions serveur pour les opérations CRUD sur les sessions
 * 
 * Ce fichier expose les méthodes de SessionService comme des actions serveur Next.js.
 * Ces actions peuvent être appelées directement depuis les composants client.
 * 
 * Chaque action est une simple passerelle vers la méthode correspondante du service,
 * ce qui permet de centraliser la logique métier dans les classes de service.
 * 
 * Note: Ces actions ne sont pas mises en cache et ne doivent pas être utilisées
 * pour récupérer des données - utilisez plutôt les routes API avec mise en cache.
 */

import {
    SessionService,
    CountSessionProps,
    CountSessionResponse,
    CreateSessionProps,
    CreateSessionResponse,
    DeleteSessionProps,
    DeleteSessionResponse,
    FindManySessionProps,
    FindManySessionResponse,
    FindUniqueSessionProps,
    FindUniqueSessionResponse,
    UpdateSessionProps,
    UpdateSessionResponse
} from "@services/class/SessionClass";

/**
 * Creates a new session
 * @param props Session properties
 * @returns Created session or error
 */
export const CreateSession = async (props: CreateSessionProps): Promise<CreateSessionResponse> => {
    try {
        const { data, error } = await SessionService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateSession -> " + (error as Error).message);
    }
};

/**
 * Updates a session
 * @param props Session ID and new data
 * @returns Updated session or error
 */
export const UpdateSession = async (props: UpdateSessionProps): Promise<UpdateSessionResponse> => {
    try {
        const { data, error } = await SessionService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateSession -> " + (error as Error).message);
    }
};

/**
 * Deletes a session
 * @param props Session ID
 * @returns Deleted session or error
 */
export const DeleteSession = async (props: DeleteSessionProps): Promise<DeleteSessionResponse> => {
    try {
        const { data, error } = await SessionService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteSession -> " + (error as Error).message);
    }
};

/**
 * Retrieves a session by ID or another filter (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Session ID or other filter
 * @returns Found session or error
 */
export const SelectSession = async (props: FindUniqueSessionProps): Promise<FindUniqueSessionResponse> => {
    try {
        const { data, error } = await SessionService.findUnique(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectSession -> " + (error as Error).message);
    }
};

/**
 * Retrieves a list of sessions with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of sessions or error
 */
export const SelectSessionList = async (props: FindManySessionProps): Promise<FindManySessionResponse> => {
    try {
        const { data, error } = await SessionService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectSessionList -> " + (error as Error).message);
    }
};

/**
 * Counts sessions with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter options
 * @returns Count of sessions or error
 */
export const SelectSessionAmount = async (props: CountSessionProps): Promise<CountSessionResponse> => {
    try {
        const { data, error } = await SessionService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectSessionAmount -> " + (error as Error).message);
    }
};
