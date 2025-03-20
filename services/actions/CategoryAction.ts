"use server";

/**
 * Actions serveur pour les opérations CRUD sur les categorys
 * 
 * Ce fichier expose les méthodes de CategoryService comme des actions serveur Next.js.
 * Ces actions peuvent être appelées directement depuis les composants client.
 * 
 * Chaque action est une simple passerelle vers la méthode correspondante du service,
 * ce qui permet de centraliser la logique métier dans les classes de service.
 * 
 * Note: Ces actions ne sont pas mises en cache et ne doivent pas être utilisées
 * pour récupérer des données - utilisez plutôt les routes API avec mise en cache.
 */

import {
    CategoryService,
    CountCategoryProps,
    CountCategoryResponse,
    CreateCategoryProps,
    CreateCategoryResponse,
    DeleteCategoryProps,
    DeleteCategoryResponse,
    FindManyCategoryProps,
    FindManyCategoryResponse,
    FindUniqueCategoryProps,
    FindUniqueCategoryResponse,
    UpdateCategoryProps,
    UpdateCategoryResponse
} from "@services/class/CategoryClass";

/**
 * Creates a new category
 * @param props Category properties
 * @returns Created category or error
 */
export const CreateCategory = async (props: CreateCategoryProps): Promise<CreateCategoryResponse> => {
    try {
        const { data, error } = await CategoryService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateCategory -> " + (error as Error).message);
    }
};

/**
 * Updates a category
 * @param props Category ID and new data
 * @returns Updated category or error
 */
export const UpdateCategory = async (props: UpdateCategoryProps): Promise<UpdateCategoryResponse> => {
    try {
        const { data, error } = await CategoryService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateCategory -> " + (error as Error).message);
    }
};

/**
 * Deletes a category
 * @param props Category ID
 * @returns Deleted category or error
 */
export const DeleteCategory = async (props: DeleteCategoryProps): Promise<DeleteCategoryResponse> => {
    try {
        const { data, error } = await CategoryService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteCategory -> " + (error as Error).message);
    }
};

/**
 * Retrieves a category by ID or another filter (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Category ID or other filter
 * @returns Found category or error
 */
export const SelectCategory = async (props: FindUniqueCategoryProps): Promise<FindUniqueCategoryResponse> => {
    try {
        const { data, error } = await CategoryService.findUnique(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectCategory -> " + (error as Error).message);
    }
};

/**
 * Retrieves a list of categorys with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of categorys or error
 */
export const SelectCategoryList = async (props: FindManyCategoryProps): Promise<FindManyCategoryResponse> => {
    try {
        const { data, error } = await CategoryService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectCategoryList -> " + (error as Error).message);
    }
};

/**
 * Counts categorys with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter options
 * @returns Count of categorys or error
 */
export const SelectCategoryAmount = async (props: CountCategoryProps): Promise<CountCategoryResponse> => {
    try {
        const { data, error } = await CategoryService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectCategoryAmount -> " + (error as Error).message);
    }
};
