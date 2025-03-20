"use server";

/**
 * Actions serveur pour les opérations CRUD sur les products
 * 
 * Ce fichier expose les méthodes de ProductService comme des actions serveur Next.js.
 * Ces actions peuvent être appelées directement depuis les composants client.
 * 
 * Chaque action est une simple passerelle vers la méthode correspondante du service,
 * ce qui permet de centraliser la logique métier dans les classes de service.
 * 
 * Note: Ces actions ne sont pas mises en cache et ne doivent pas être utilisées
 * pour récupérer des données - utilisez plutôt les routes API avec mise en cache.
 */

import {
    ProductService,
    CountProductProps,
    CountProductResponse,
    CreateProductProps,
    CreateProductResponse,
    DeleteProductProps,
    DeleteProductResponse,
    FindManyProductProps,
    FindManyProductResponse,
    FindUniqueProductProps,
    FindUniqueProductResponse,
    UpdateProductProps,
    UpdateProductResponse
} from "@services/class/ProductClass";

/**
 * Creates a new product
 * @param props Product properties
 * @returns Created product or error
 */
export const CreateProduct = async (props: CreateProductProps): Promise<CreateProductResponse> => {
    try {
        const { data, error } = await ProductService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateProduct -> " + (error as Error).message);
    }
};

/**
 * Updates a product
 * @param props Product ID and new data
 * @returns Updated product or error
 */
export const UpdateProduct = async (props: UpdateProductProps): Promise<UpdateProductResponse> => {
    try {
        const { data, error } = await ProductService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateProduct -> " + (error as Error).message);
    }
};

/**
 * Deletes a product
 * @param props Product ID
 * @returns Deleted product or error
 */
export const DeleteProduct = async (props: DeleteProductProps): Promise<DeleteProductResponse> => {
    try {
        const { data, error } = await ProductService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteProduct -> " + (error as Error).message);
    }
};

/**
 * Retrieves a product by ID or another filter (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Product ID or other filter
 * @returns Found product or error
 */
export const SelectProduct = async (props: FindUniqueProductProps): Promise<FindUniqueProductResponse> => {
    try {
        const { data, error } = await ProductService.findUnique(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectProduct -> " + (error as Error).message);
    }
};

/**
 * Retrieves a list of products with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of products or error
 */
export const SelectProductList = async (props: FindManyProductProps): Promise<FindManyProductResponse> => {
    try {
        const { data, error } = await ProductService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectProductList -> " + (error as Error).message);
    }
};

/**
 * Counts products with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter options
 * @returns Count of products or error
 */
export const SelectProductAmount = async (props: CountProductProps): Promise<CountProductResponse> => {
    try {
        const { data, error } = await ProductService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectProductAmount -> " + (error as Error).message);
    }
};
