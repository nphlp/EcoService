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

import { 
    CountUserProps, 
    CountUserResponse,
    FindManyUserProps,
    FindManyUserResponse,
    FindUniqueUserProps,
    FindUniqueUserResponse
} from "@services/class/UserClass";
import { 
    CountSessionProps, 
    CountSessionResponse,
    FindManySessionProps,
    FindManySessionResponse,
    FindUniqueSessionProps,
    FindUniqueSessionResponse
} from "@services/class/SessionClass";
import { 
    CountAccountProps, 
    CountAccountResponse,
    FindManyAccountProps,
    FindManyAccountResponse,
    FindUniqueAccountProps,
    FindUniqueAccountResponse
} from "@services/class/AccountClass";
import { 
    CountVerificationProps, 
    CountVerificationResponse,
    FindManyVerificationProps,
    FindManyVerificationResponse,
    FindUniqueVerificationProps,
    FindUniqueVerificationResponse
} from "@services/class/VerificationClass";
import { 
    CountAddressProps, 
    CountAddressResponse,
    FindManyAddressProps,
    FindManyAddressResponse,
    FindUniqueAddressProps,
    FindUniqueAddressResponse
} from "@services/class/AddressClass";
import { 
    CountArticleProps, 
    CountArticleResponse,
    FindManyArticleProps,
    FindManyArticleResponse,
    FindUniqueArticleProps,
    FindUniqueArticleResponse
} from "@services/class/ArticleClass";
import { 
    CountDiyProps, 
    CountDiyResponse,
    FindManyDiyProps,
    FindManyDiyResponse,
    FindUniqueDiyProps,
    FindUniqueDiyResponse
} from "@services/class/DiyClass";
import { 
    CountContentProps, 
    CountContentResponse,
    FindManyContentProps,
    FindManyContentResponse,
    FindUniqueContentProps,
    FindUniqueContentResponse
} from "@services/class/ContentClass";
import { 
    CountCategoryProps, 
    CountCategoryResponse,
    FindManyCategoryProps,
    FindManyCategoryResponse,
    FindUniqueCategoryProps,
    FindUniqueCategoryResponse
} from "@services/class/CategoryClass";
import { 
    CountProductProps, 
    CountProductResponse,
    FindManyProductProps,
    FindManyProductResponse,
    FindUniqueProductProps,
    FindUniqueProductResponse
} from "@services/class/ProductClass";
import { 
    CountQuantityProps, 
    CountQuantityResponse,
    FindManyQuantityProps,
    FindManyQuantityResponse,
    FindUniqueQuantityProps,
    FindUniqueQuantityResponse
} from "@services/class/QuantityClass";
import { 
    CountOrderProps, 
    CountOrderResponse,
    FindManyOrderProps,
    FindManyOrderResponse,
    FindUniqueOrderProps,
    FindUniqueOrderResponse
} from "@services/class/OrderClass";
import { 
    CountFruitProps, 
    CountFruitResponse,
    FindManyFruitProps,
    FindManyFruitResponse,
    FindUniqueFruitProps,
    FindUniqueFruitResponse
} from "@services/class/FruitClass";

/**
 * Type representing the response format for API routes
 * @template Response - The type of the data in the response
 */
export type ResponseFormat<Response> = {
    data: Response;
    error?: undefined;
} | {
    data?: undefined;
    error: string;
};

import { Routes as StripeRoutes } from "./stripe/Routes";

export type Routes = StripeRoutes & {
    /**
    * Route for fetching a list of users \
    * GET `/api/user`
    */
    "/user": {
        params?: FindManyUserProps;
        response: FindManyUserResponse;
    };

    /**
    * Route for fetching a single User by ID \
    * GET `/api/user/unique`
    */
    "/user/unique": {
        params?: FindUniqueUserProps;
        response: FindUniqueUserResponse;
    };
    
    /**
    * Route for fetching the count of users \
    * GET `/api/user/count`
    */
    "/user/count": {
        params?: CountUserProps;
        response: CountUserResponse;
    };

    /**
    * Route for fetching a list of sessions \
    * GET `/api/session`
    */
    "/session": {
        params?: FindManySessionProps;
        response: FindManySessionResponse;
    };

    /**
    * Route for fetching a single Session by ID \
    * GET `/api/session/unique`
    */
    "/session/unique": {
        params?: FindUniqueSessionProps;
        response: FindUniqueSessionResponse;
    };
    
    /**
    * Route for fetching the count of sessions \
    * GET `/api/session/count`
    */
    "/session/count": {
        params?: CountSessionProps;
        response: CountSessionResponse;
    };

    /**
    * Route for fetching a list of accounts \
    * GET `/api/account`
    */
    "/account": {
        params?: FindManyAccountProps;
        response: FindManyAccountResponse;
    };

    /**
    * Route for fetching a single Account by ID \
    * GET `/api/account/unique`
    */
    "/account/unique": {
        params?: FindUniqueAccountProps;
        response: FindUniqueAccountResponse;
    };
    
    /**
    * Route for fetching the count of accounts \
    * GET `/api/account/count`
    */
    "/account/count": {
        params?: CountAccountProps;
        response: CountAccountResponse;
    };

    /**
    * Route for fetching a list of verifications \
    * GET `/api/verification`
    */
    "/verification": {
        params?: FindManyVerificationProps;
        response: FindManyVerificationResponse;
    };

    /**
    * Route for fetching a single Verification by ID \
    * GET `/api/verification/unique`
    */
    "/verification/unique": {
        params?: FindUniqueVerificationProps;
        response: FindUniqueVerificationResponse;
    };
    
    /**
    * Route for fetching the count of verifications \
    * GET `/api/verification/count`
    */
    "/verification/count": {
        params?: CountVerificationProps;
        response: CountVerificationResponse;
    };

    /**
    * Route for fetching a list of addresss \
    * GET `/api/address`
    */
    "/address": {
        params?: FindManyAddressProps;
        response: FindManyAddressResponse;
    };

    /**
    * Route for fetching a single Address by ID \
    * GET `/api/address/unique`
    */
    "/address/unique": {
        params?: FindUniqueAddressProps;
        response: FindUniqueAddressResponse;
    };
    
    /**
    * Route for fetching the count of addresss \
    * GET `/api/address/count`
    */
    "/address/count": {
        params?: CountAddressProps;
        response: CountAddressResponse;
    };

    /**
    * Route for fetching a list of articles \
    * GET `/api/article`
    */
    "/article": {
        params?: FindManyArticleProps;
        response: FindManyArticleResponse<FindManyArticleProps>;
    };

    /**
    * Route for fetching a single Article by ID \
    * GET `/api/article/unique`
    */
    "/article/unique": {
        params?: FindUniqueArticleProps;
        response: FindUniqueArticleResponse<FindUniqueArticleProps>;
    };
    
    /**
    * Route for fetching the count of articles \
    * GET `/api/article/count`
    */
    "/article/count": {
        params?: CountArticleProps;
        response: CountArticleResponse;
    };

    /**
    * Route for fetching a list of diys \
    * GET `/api/diy`
    */
    "/diy": {
        params?: FindManyDiyProps;
        response: FindManyDiyResponse;
    };

    /**
    * Route for fetching a single Diy by ID \
    * GET `/api/diy/unique`
    */
    "/diy/unique": {
        params?: FindUniqueDiyProps;
        response: FindUniqueDiyResponse;
    };
    
    /**
    * Route for fetching the count of diys \
    * GET `/api/diy/count`
    */
    "/diy/count": {
        params?: CountDiyProps;
        response: CountDiyResponse;
    };

    /**
    * Route for fetching a list of contents \
    * GET `/api/content`
    */
    "/content": {
        params?: FindManyContentProps;
        response: FindManyContentResponse;
    };

    /**
    * Route for fetching a single Content by ID \
    * GET `/api/content/unique`
    */
    "/content/unique": {
        params?: FindUniqueContentProps;
        response: FindUniqueContentResponse;
    };
    
    /**
    * Route for fetching the count of contents \
    * GET `/api/content/count`
    */
    "/content/count": {
        params?: CountContentProps;
        response: CountContentResponse;
    };

    /**
    * Route for fetching a list of categorys \
    * GET `/api/category`
    */
    "/category": {
        params?: FindManyCategoryProps;
        response: FindManyCategoryResponse;
    };

    /**
    * Route for fetching a single Category by ID \
    * GET `/api/category/unique`
    */
    "/category/unique": {
        params?: FindUniqueCategoryProps;
        response: FindUniqueCategoryResponse;
    };
    
    /**
    * Route for fetching the count of categorys \
    * GET `/api/category/count`
    */
    "/category/count": {
        params?: CountCategoryProps;
        response: CountCategoryResponse;
    };

    /**
    * Route for fetching a list of products \
    * GET `/api/product`
    */
    "/product": {
        params?: FindManyProductProps;
        response: FindManyProductResponse;
    };

    /**
    * Route for fetching a single Product by ID \
    * GET `/api/product/unique`
    */
    "/product/unique": {
        params?: FindUniqueProductProps;
        response: FindUniqueProductResponse;
    };
    
    /**
    * Route for fetching the count of products \
    * GET `/api/product/count`
    */
    "/product/count": {
        params?: CountProductProps;
        response: CountProductResponse;
    };

    /**
    * Route for fetching a list of quantitys \
    * GET `/api/quantity`
    */
    "/quantity": {
        params?: FindManyQuantityProps;
        response: FindManyQuantityResponse;
    };

    /**
    * Route for fetching a single Quantity by ID \
    * GET `/api/quantity/unique`
    */
    "/quantity/unique": {
        params?: FindUniqueQuantityProps;
        response: FindUniqueQuantityResponse;
    };
    
    /**
    * Route for fetching the count of quantitys \
    * GET `/api/quantity/count`
    */
    "/quantity/count": {
        params?: CountQuantityProps;
        response: CountQuantityResponse;
    };

    /**
    * Route for fetching a list of orders \
    * GET `/api/order`
    */
    "/order": {
        params?: FindManyOrderProps;
        response: FindManyOrderResponse;
    };

    /**
    * Route for fetching a single Order by ID \
    * GET `/api/order/unique`
    */
    "/order/unique": {
        params?: FindUniqueOrderProps;
        response: FindUniqueOrderResponse;
    };
    
    /**
    * Route for fetching the count of orders \
    * GET `/api/order/count`
    */
    "/order/count": {
        params?: CountOrderProps;
        response: CountOrderResponse;
    };

    /**
    * Route for fetching a list of fruits \
    * GET `/api/fruit`
    */
    "/fruit": {
        params?: FindManyFruitProps;
        response: FindManyFruitResponse;
    };

    /**
    * Route for fetching a single Fruit by ID \
    * GET `/api/fruit/unique`
    */
    "/fruit/unique": {
        params?: FindUniqueFruitProps;
        response: FindUniqueFruitResponse;
    };
    
    /**
    * Route for fetching the count of fruits \
    * GET `/api/fruit/count`
    */
    "/fruit/count": {
        params?: CountFruitProps;
        response: CountFruitResponse;
    };
};
