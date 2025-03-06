import { CategoryId, SelectCategoryAmountProps, SelectCategoryListProps, SelectCategoryProps } from "@actions/types/Category";
import { ProductId, SelectProductAmountProps, SelectProductListProps, SelectProductProps } from "@actions/types/Product";
import { SelectCategoryAmountResponse } from "@app/api/categories/count/route";
import { SelectCategoryListResponse } from "@app/api/categories/route";
import { SelectCategoryResponse } from "@app/api/categories/unique/route";
import { SelectProductAmountResponse } from "@app/api/products/count/route";
import { SelectProductListResponse } from "@app/api/products/route";
import { SelectProductResponse } from "@app/api/products/unique/route";

/**
 * Type definition for all API routes in the application.
 * This serves as a centralized registry for route parameters and response types.
 *
 * Each route is defined with:
 * - params: The expected parameters for the route (optional)
 * - response: The expected response type from the route
 *
 * This type is used by the Fetch utility to provide type safety when making API requests.
 */
export type Routes = {
    /**
     * Route for fetching a list of products
     * GET /api/get/products
     */
    "/products": {
        params?: SelectProductListProps;
        response: SelectProductListResponse;
    };
    /**
     * Route for fetching a single product by ID
     * GET /api/get/products/unique
     */
    "/products/unique": {
        params?: SelectProductProps;
        response: SelectProductResponse;
    };
    /**
     * Route for fetching the count of products
     * GET /api/get/products/count
     */
    "/products/count": {
        params?: SelectProductAmountProps;
        response: SelectProductAmountResponse;
    };
    /**
     * Route for fetching a list of categories
     * GET /api/get/categories
     */
    "/categories": {
        params?: SelectCategoryListProps;
        response: SelectCategoryListResponse;
    };
    /**
     * Route for fetching a single category by ID
     * GET /api/get/categories/unique
     */
    "/categories/unique": {
        params?: SelectCategoryProps;
        response: SelectCategoryResponse;
    };
    /**
     * Route for fetching the count of categories
     * GET /api/get/categories/count
     */
    "/categories/count": {
        params?: SelectCategoryAmountProps;
        response: SelectCategoryAmountResponse;
    };
};
