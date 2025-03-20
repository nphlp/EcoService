"use server";

/**
 * Actions serveur pour les opérations CRUD sur les users
 * 
 * Ce fichier expose les méthodes de UserService comme des actions serveur Next.js.
 * Ces actions peuvent être appelées directement depuis les composants client.
 * 
 * Chaque action est une simple passerelle vers la méthode correspondante du service,
 * ce qui permet de centraliser la logique métier dans les classes de service.
 * 
 * Note: Ces actions ne sont pas mises en cache et ne doivent pas être utilisées
 * pour récupérer des données - utilisez plutôt les routes API avec mise en cache.
 */

import {
    UserService,
    CountUserProps,
    CountUserResponse,
    CreateUserProps,
    CreateUserResponse,
    DeleteUserProps,
    DeleteUserResponse,
    FindManyUserProps,
    FindManyUserResponse,
    FindUniqueUserProps,
    FindUniqueUserResponse,
    UpdateUserProps,
    UpdateUserResponse
} from "@services/class/UserClass";

/**
 * Creates a new user
 * @param props User properties
 * @returns Created user or error
 */
export const CreateUser = async (props: CreateUserProps): Promise<CreateUserResponse> => {
    try {
        const { data, error } = await UserService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateUser -> " + (error as Error).message);
    }
};

/**
 * Updates a user
 * @param props User ID and new data
 * @returns Updated user or error
 */
export const UpdateUser = async (props: UpdateUserProps): Promise<UpdateUserResponse> => {
    try {
        const { data, error } = await UserService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateUser -> " + (error as Error).message);
    }
};

/**
 * Deletes a user
 * @param props User ID
 * @returns Deleted user or error
 */
export const DeleteUser = async (props: DeleteUserProps): Promise<DeleteUserResponse> => {
    try {
        const { data, error } = await UserService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteUser -> " + (error as Error).message);
    }
};

/**
 * Retrieves a user by ID or another filter (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props User ID or other filter
 * @returns Found user or error
 */
export const SelectUser = async (props: FindUniqueUserProps): Promise<FindUniqueUserResponse> => {
    try {
        const { data, error } = await UserService.findUnique(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectUser -> " + (error as Error).message);
    }
};

/**
 * Retrieves a list of users with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of users or error
 */
export const SelectUserList = async (props: FindManyUserProps): Promise<FindManyUserResponse> => {
    try {
        const { data, error } = await UserService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectUserList -> " + (error as Error).message);
    }
};

/**
 * Counts users with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter options
 * @returns Count of users or error
 */
export const SelectUserAmount = async (props: CountUserProps): Promise<CountUserResponse> => {
    try {
        const { data, error } = await UserService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectUserAmount -> " + (error as Error).message);
    }
};
