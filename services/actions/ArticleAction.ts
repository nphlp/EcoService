"use server";

/**
 * Actions serveur pour les opérations CRUD sur les articles
 * 
 * Ce fichier expose les méthodes de ArticleService comme des actions serveur Next.js.
 * Ces actions peuvent être appelées directement depuis les composants client.
 * 
 * Chaque action est une simple passerelle vers la méthode correspondante du service,
 * ce qui permet de centraliser la logique métier dans les classes de service.
 * 
 * Note: Ces actions ne sont pas mises en cache et ne doivent pas être utilisées
 * pour récupérer des données - utilisez plutôt les routes API avec mise en cache.
 */

import {
    ArticleService,
    CountArticleProps,
    CountArticleResponse,
    CreateArticleProps,
    CreateArticleResponse,
    DeleteArticleProps,
    DeleteArticleResponse,
    FindManyArticleProps,
    FindManyArticleResponse,
    FindUniqueArticleProps,
    FindUniqueArticleResponse,
    UpdateArticleProps,
    UpdateArticleResponse
} from "@services/class/ArticleClass";

/**
 * Creates a new article
 * @param props Article properties
 * @returns Created article or error
 */
export const CreateArticle = async (props: CreateArticleProps): Promise<CreateArticleResponse> => {
    try {
        const { data, error } = await ArticleService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateArticle -> " + (error as Error).message);
    }
};

/**
 * Updates a article
 * @param props Article ID and new data
 * @returns Updated article or error
 */
export const UpdateArticle = async (props: UpdateArticleProps): Promise<UpdateArticleResponse> => {
    try {
        const { data, error } = await ArticleService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateArticle -> " + (error as Error).message);
    }
};

/**
 * Deletes a article
 * @param props Article ID
 * @returns Deleted article or error
 */
export const DeleteArticle = async (props: DeleteArticleProps): Promise<DeleteArticleResponse> => {
    try {
        const { data, error } = await ArticleService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteArticle -> " + (error as Error).message);
    }
};

/**
 * Retrieves a article by ID or another filter (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Article ID or other filter
 * @returns Found article or error
 */
export const SelectArticle = async (props: FindUniqueArticleProps): Promise<FindUniqueArticleResponse> => {
    try {
        const { data, error } = await ArticleService.findUnique(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectArticle -> " + (error as Error).message);
    }
};

/**
 * Retrieves a list of articles with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of articles or error
 */
export const SelectArticleList = async (props: FindManyArticleProps): Promise<FindManyArticleResponse> => {
    try {
        const { data, error } = await ArticleService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectArticleList -> " + (error as Error).message);
    }
};

/**
 * Counts articles with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter options
 * @returns Count of articles or error
 */
export const SelectArticleAmount = async (props: CountArticleProps): Promise<CountArticleResponse> => {
    try {
        const { data, error } = await ArticleService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectArticleAmount -> " + (error as Error).message);
    }
};
