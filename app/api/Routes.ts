/**
 * Type definition for all API routes in the application.
 * This serves as a centralized registry for route parameters and response types.
 *
 * Each route is defined with:
 * - params: The expected parameters for the route (optional)
 * - response: The expected response type from the route
 *
 * This type is used by the Fetch utility to provide type safety when making API requests.
 * 
 * ATTENTION: Ce fichier est généré automatiquement. Ne pas modifier manuellement.
 */


import { SelectUserAmountProps, SelectUserListProps, SelectUserProps } from "@actions/types/User";
import { SelectUserAmountResponse } from "@app/api/users/count/route";
import { SelectUserListResponse } from "@app/api/users/route";
import { SelectUserResponse } from "@app/api/users/unique/route";

import { SelectSessionAmountProps, SelectSessionListProps, SelectSessionProps } from "@actions/types/Session";
import { SelectSessionAmountResponse } from "@app/api/sessions/count/route";
import { SelectSessionListResponse } from "@app/api/sessions/route";
import { SelectSessionResponse } from "@app/api/sessions/unique/route";

import { SelectAccountAmountProps, SelectAccountListProps, SelectAccountProps } from "@actions/types/Account";
import { SelectAccountAmountResponse } from "@app/api/accounts/count/route";
import { SelectAccountListResponse } from "@app/api/accounts/route";
import { SelectAccountResponse } from "@app/api/accounts/unique/route";

import { SelectVerificationAmountProps, SelectVerificationListProps, SelectVerificationProps } from "@actions/types/Verification";
import { SelectVerificationAmountResponse } from "@app/api/verifications/count/route";
import { SelectVerificationListResponse } from "@app/api/verifications/route";
import { SelectVerificationResponse } from "@app/api/verifications/unique/route";

import { SelectAddressAmountProps, SelectAddressListProps, SelectAddressProps } from "@actions/types/Address";
import { SelectAddressAmountResponse } from "@app/api/addresses/count/route";
import { SelectAddressListResponse } from "@app/api/addresses/route";
import { SelectAddressResponse } from "@app/api/addresses/unique/route";

import { SelectArticleAmountProps, SelectArticleListProps, SelectArticleProps } from "@actions/types/Article";
import { SelectArticleAmountResponse } from "@app/api/articles/count/route";
import { SelectArticleListResponse } from "@app/api/articles/route";
import { SelectArticleResponse } from "@app/api/articles/unique/route";

import { SelectDoItYourselfAmountProps, SelectDoItYourselfListProps, SelectDoItYourselfProps } from "@actions/types/DoItYourself";
import { SelectDoItYourselfAmountResponse } from "@app/api/doItYourselves/count/route";
import { SelectDoItYourselfListResponse } from "@app/api/doItYourselves/route";
import { SelectDoItYourselfResponse } from "@app/api/doItYourselves/unique/route";

import { SelectContentAmountProps, SelectContentListProps, SelectContentProps } from "@actions/types/Content";
import { SelectContentAmountResponse } from "@app/api/contents/count/route";
import { SelectContentListResponse } from "@app/api/contents/route";
import { SelectContentResponse } from "@app/api/contents/unique/route";

import { SelectCategoryAmountProps, SelectCategoryListProps, SelectCategoryProps } from "@actions/types/Category";
import { SelectCategoryAmountResponse } from "@app/api/categories/count/route";
import { SelectCategoryListResponse } from "@app/api/categories/route";
import { SelectCategoryResponse } from "@app/api/categories/unique/route";

import { SelectProductAmountProps, SelectProductListProps, SelectProductProps } from "@actions/types/Product";
import { SelectProductAmountResponse } from "@app/api/products/count/route";
import { SelectProductListResponse } from "@app/api/products/route";
import { SelectProductResponse } from "@app/api/products/unique/route";

import { SelectQuantityAmountProps, SelectQuantityListProps, SelectQuantityProps } from "@actions/types/Quantity";
import { SelectQuantityAmountResponse } from "@app/api/quantities/count/route";
import { SelectQuantityListResponse } from "@app/api/quantities/route";
import { SelectQuantityResponse } from "@app/api/quantities/unique/route";

import { SelectOrderAmountProps, SelectOrderListProps, SelectOrderProps } from "@actions/types/Order";
import { SelectOrderAmountResponse } from "@app/api/orders/count/route";
import { SelectOrderListResponse } from "@app/api/orders/route";
import { SelectOrderResponse } from "@app/api/orders/unique/route";

import { SelectFruitAmountProps, SelectFruitListProps, SelectFruitProps } from "@actions/types/Fruit";
import { SelectFruitAmountResponse } from "@app/api/fruits/count/route";
import { SelectFruitListResponse } from "@app/api/fruits/route";
import { SelectFruitResponse } from "@app/api/fruits/unique/route";
export type Routes = {

    /**
     * Route for fetching a list of users \
     * GET `/api/users`
     */
    "/users": {
        params?: SelectUserListProps;
        response: SelectUserListResponse;
    };

    /**
     * Route for fetching a single User by ID \
     * GET `/api/users/unique`
     */
    "/users/unique": {
        params?: SelectUserProps;
        response: SelectUserResponse;
    };
    /**
     * Route for fetching the count of users \
     * GET `/api/users/count`
     */
    "/users/count": {
        params?: SelectUserAmountProps;
        response: SelectUserAmountResponse;
    };




    /**
     * Route for fetching a list of sessions \
     * GET `/api/sessions`
     */
    "/sessions": {
        params?: SelectSessionListProps;
        response: SelectSessionListResponse;
    };

    /**
     * Route for fetching a single Session by ID \
     * GET `/api/sessions/unique`
     */
    "/sessions/unique": {
        params?: SelectSessionProps;
        response: SelectSessionResponse;
    };
    /**
     * Route for fetching the count of sessions \
     * GET `/api/sessions/count`
     */
    "/sessions/count": {
        params?: SelectSessionAmountProps;
        response: SelectSessionAmountResponse;
    };




    /**
     * Route for fetching a list of accounts \
     * GET `/api/accounts`
     */
    "/accounts": {
        params?: SelectAccountListProps;
        response: SelectAccountListResponse;
    };

    /**
     * Route for fetching a single Account by ID \
     * GET `/api/accounts/unique`
     */
    "/accounts/unique": {
        params?: SelectAccountProps;
        response: SelectAccountResponse;
    };
    /**
     * Route for fetching the count of accounts \
     * GET `/api/accounts/count`
     */
    "/accounts/count": {
        params?: SelectAccountAmountProps;
        response: SelectAccountAmountResponse;
    };




    /**
     * Route for fetching a list of verifications \
     * GET `/api/verifications`
     */
    "/verifications": {
        params?: SelectVerificationListProps;
        response: SelectVerificationListResponse;
    };

    /**
     * Route for fetching a single Verification by ID \
     * GET `/api/verifications/unique`
     */
    "/verifications/unique": {
        params?: SelectVerificationProps;
        response: SelectVerificationResponse;
    };
    /**
     * Route for fetching the count of verifications \
     * GET `/api/verifications/count`
     */
    "/verifications/count": {
        params?: SelectVerificationAmountProps;
        response: SelectVerificationAmountResponse;
    };




    /**
     * Route for fetching a list of addresses \
     * GET `/api/addresses`
     */
    "/addresses": {
        params?: SelectAddressListProps;
        response: SelectAddressListResponse;
    };

    /**
     * Route for fetching a single Address by ID \
     * GET `/api/addresses/unique`
     */
    "/addresses/unique": {
        params?: SelectAddressProps;
        response: SelectAddressResponse;
    };
    /**
     * Route for fetching the count of addresses \
     * GET `/api/addresses/count`
     */
    "/addresses/count": {
        params?: SelectAddressAmountProps;
        response: SelectAddressAmountResponse;
    };




    /**
     * Route for fetching a list of articles \
     * GET `/api/articles`
     */
    "/articles": {
        params?: SelectArticleListProps;
        response: SelectArticleListResponse;
    };

    /**
     * Route for fetching a single Article by ID \
     * GET `/api/articles/unique`
     */
    "/articles/unique": {
        params?: SelectArticleProps;
        response: SelectArticleResponse;
    };
    /**
     * Route for fetching the count of articles \
     * GET `/api/articles/count`
     */
    "/articles/count": {
        params?: SelectArticleAmountProps;
        response: SelectArticleAmountResponse;
    };




    /**
     * Route for fetching a list of doItYourselves \
     * GET `/api/doItYourselves`
     */
    "/doItYourselves": {
        params?: SelectDoItYourselfListProps;
        response: SelectDoItYourselfListResponse;
    };

    /**
     * Route for fetching a single DoItYourself by ID \
     * GET `/api/doItYourselves/unique`
     */
    "/doItYourselves/unique": {
        params?: SelectDoItYourselfProps;
        response: SelectDoItYourselfResponse;
    };
    /**
     * Route for fetching the count of doItYourselves \
     * GET `/api/doItYourselves/count`
     */
    "/doItYourselves/count": {
        params?: SelectDoItYourselfAmountProps;
        response: SelectDoItYourselfAmountResponse;
    };




    /**
     * Route for fetching a list of contents \
     * GET `/api/contents`
     */
    "/contents": {
        params?: SelectContentListProps;
        response: SelectContentListResponse;
    };

    /**
     * Route for fetching a single Content by ID \
     * GET `/api/contents/unique`
     */
    "/contents/unique": {
        params?: SelectContentProps;
        response: SelectContentResponse;
    };
    /**
     * Route for fetching the count of contents \
     * GET `/api/contents/count`
     */
    "/contents/count": {
        params?: SelectContentAmountProps;
        response: SelectContentAmountResponse;
    };




    /**
     * Route for fetching a list of categories \
     * GET `/api/categories`
     */
    "/categories": {
        params?: SelectCategoryListProps;
        response: SelectCategoryListResponse;
    };

    /**
     * Route for fetching a single Category by ID \
     * GET `/api/categories/unique`
     */
    "/categories/unique": {
        params?: SelectCategoryProps;
        response: SelectCategoryResponse;
    };
    /**
     * Route for fetching the count of categories \
     * GET `/api/categories/count`
     */
    "/categories/count": {
        params?: SelectCategoryAmountProps;
        response: SelectCategoryAmountResponse;
    };




    /**
     * Route for fetching a list of products \
     * GET `/api/products`
     */
    "/products": {
        params?: SelectProductListProps;
        response: SelectProductListResponse;
    };

    /**
     * Route for fetching a single Product by ID \
     * GET `/api/products/unique`
     */
    "/products/unique": {
        params?: SelectProductProps;
        response: SelectProductResponse;
    };
    /**
     * Route for fetching the count of products \
     * GET `/api/products/count`
     */
    "/products/count": {
        params?: SelectProductAmountProps;
        response: SelectProductAmountResponse;
    };




    /**
     * Route for fetching a list of quantities \
     * GET `/api/quantities`
     */
    "/quantities": {
        params?: SelectQuantityListProps;
        response: SelectQuantityListResponse;
    };

    /**
     * Route for fetching a single Quantity by ID \
     * GET `/api/quantities/unique`
     */
    "/quantities/unique": {
        params?: SelectQuantityProps;
        response: SelectQuantityResponse;
    };
    /**
     * Route for fetching the count of quantities \
     * GET `/api/quantities/count`
     */
    "/quantities/count": {
        params?: SelectQuantityAmountProps;
        response: SelectQuantityAmountResponse;
    };




    /**
     * Route for fetching a list of orders \
     * GET `/api/orders`
     */
    "/orders": {
        params?: SelectOrderListProps;
        response: SelectOrderListResponse;
    };

    /**
     * Route for fetching a single Order by ID \
     * GET `/api/orders/unique`
     */
    "/orders/unique": {
        params?: SelectOrderProps;
        response: SelectOrderResponse;
    };
    /**
     * Route for fetching the count of orders \
     * GET `/api/orders/count`
     */
    "/orders/count": {
        params?: SelectOrderAmountProps;
        response: SelectOrderAmountResponse;
    };




    /**
     * Route for fetching a list of fruits \
     * GET `/api/fruits`
     */
    "/fruits": {
        params?: SelectFruitListProps;
        response: SelectFruitListResponse;
    };

    /**
     * Route for fetching a single Fruit by ID \
     * GET `/api/fruits/unique`
     */
    "/fruits/unique": {
        params?: SelectFruitProps;
        response: SelectFruitResponse;
    };
    /**
     * Route for fetching the count of fruits \
     * GET `/api/fruits/count`
     */
    "/fruits/count": {
        params?: SelectFruitAmountProps;
        response: SelectFruitAmountResponse;
    };

};