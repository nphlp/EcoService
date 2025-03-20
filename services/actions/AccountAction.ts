"use server";

/**
 * Actions serveur pour les opérations CRUD sur les accounts
 * 
 * Ce fichier expose les méthodes de AccountService comme des actions serveur Next.js.
 * Ces actions peuvent être appelées directement depuis les composants client.
 * 
 * Chaque action est une simple passerelle vers la méthode correspondante du service,
 * ce qui permet de centraliser la logique métier dans les classes de service.
 * 
 * Note: Ces actions ne sont pas mises en cache et ne doivent pas être utilisées
 * pour récupérer des données - utilisez plutôt les routes API avec mise en cache.
 */

import {
    AccountService,
    CountAccountProps,
    CountAccountResponse,
    CreateAccountProps,
    CreateAccountResponse,
    DeleteAccountProps,
    DeleteAccountResponse,
    FindManyAccountProps,
    FindManyAccountResponse,
    FindUniqueAccountProps,
    FindUniqueAccountResponse,
    UpdateAccountProps,
    UpdateAccountResponse
} from "@services/class/AccountClass";

/**
 * Creates a new account
 * @param props Account properties
 * @returns Created account or error
 */
export const CreateAccount = async (props: CreateAccountProps): Promise<CreateAccountResponse> => {
    try {
        const { data, error } = await AccountService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateAccount -> " + (error as Error).message);
    }
};

/**
 * Updates a account
 * @param props Account ID and new data
 * @returns Updated account or error
 */
export const UpdateAccount = async (props: UpdateAccountProps): Promise<UpdateAccountResponse> => {
    try {
        const { data, error } = await AccountService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateAccount -> " + (error as Error).message);
    }
};

/**
 * Deletes a account
 * @param props Account ID
 * @returns Deleted account or error
 */
export const DeleteAccount = async (props: DeleteAccountProps): Promise<DeleteAccountResponse> => {
    try {
        const { data, error } = await AccountService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteAccount -> " + (error as Error).message);
    }
};

/**
 * Retrieves a account by ID or another filter (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Account ID or other filter
 * @returns Found account or error
 */
export const SelectAccount = async (props: FindUniqueAccountProps): Promise<FindUniqueAccountResponse> => {
    try {
        const { data, error } = await AccountService.findUnique(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectAccount -> " + (error as Error).message);
    }
};

/**
 * Retrieves a list of accounts with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of accounts or error
 */
export const SelectAccountList = async (props: FindManyAccountProps): Promise<FindManyAccountResponse> => {
    try {
        const { data, error } = await AccountService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectAccountList -> " + (error as Error).message);
    }
};

/**
 * Counts accounts with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter options
 * @returns Count of accounts or error
 */
export const SelectAccountAmount = async (props: CountAccountProps): Promise<CountAccountResponse> => {
    try {
        const { data, error } = await AccountService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectAccountAmount -> " + (error as Error).message);
    }
};
