import { 
    CountUserProps, 
    CountUserResponse,
    FindManyUserProps,
    FindManyUserResponse,
    FindUniqueUserProps,
    FindUniqueUserResponse,
    CountSessionProps, 
    CountSessionResponse,
    FindManySessionProps,
    FindManySessionResponse,
    FindUniqueSessionProps,
    FindUniqueSessionResponse,
    CountAccountProps, 
    CountAccountResponse,
    FindManyAccountProps,
    FindManyAccountResponse,
    FindUniqueAccountProps,
    FindUniqueAccountResponse,
    CountVerificationProps, 
    CountVerificationResponse,
    FindManyVerificationProps,
    FindManyVerificationResponse,
    FindUniqueVerificationProps,
    FindUniqueVerificationResponse,
    CountAddressProps, 
    CountAddressResponse,
    FindManyAddressProps,
    FindManyAddressResponse,
    FindUniqueAddressProps,
    FindUniqueAddressResponse,
    CountArticleProps, 
    CountArticleResponse,
    FindManyArticleProps,
    FindManyArticleResponse,
    FindUniqueArticleProps,
    FindUniqueArticleResponse,
    CountDiyProps, 
    CountDiyResponse,
    FindManyDiyProps,
    FindManyDiyResponse,
    FindUniqueDiyProps,
    FindUniqueDiyResponse,
    CountContentProps, 
    CountContentResponse,
    FindManyContentProps,
    FindManyContentResponse,
    FindUniqueContentProps,
    FindUniqueContentResponse,
    CountCategoryProps, 
    CountCategoryResponse,
    FindManyCategoryProps,
    FindManyCategoryResponse,
    FindUniqueCategoryProps,
    FindUniqueCategoryResponse,
    CountProductProps, 
    CountProductResponse,
    FindManyProductProps,
    FindManyProductResponse,
    FindUniqueProductProps,
    FindUniqueProductResponse,
    CountQuantityProps, 
    CountQuantityResponse,
    FindManyQuantityProps,
    FindManyQuantityResponse,
    FindUniqueQuantityProps,
    FindUniqueQuantityResponse,
    CountOrderProps, 
    CountOrderResponse,
    FindManyOrderProps,
    FindManyOrderResponse,
    FindUniqueOrderProps,
    FindUniqueOrderResponse,
    CountFruitProps, 
    CountFruitResponse,
    FindManyFruitProps,
    FindManyFruitResponse,
    FindUniqueFruitProps,
    FindUniqueFruitResponse
} from "@services/class";

export type ResponseFormat<Response> = {
    data: Response;
    error?: undefined;
} | {
    data?: undefined;
    error: string;
};

import { Routes as StripeRoutes } from "./stripe/Routes";

export type Routes = StripeRoutes & {

    // User Routes
    "/user": {
        params?: FindManyUserProps;
        response: FindManyUserResponse<FindManyUserProps>;
    };
    "/user/unique": {
        params?: FindUniqueUserProps;
        response: FindUniqueUserResponse<FindUniqueUserProps>;
    };
    "/user/count": {
        params?: CountUserProps;
        response: CountUserResponse;
    };

    // Session Routes
    "/session": {
        params?: FindManySessionProps;
        response: FindManySessionResponse<FindManySessionProps>;
    };
    "/session/unique": {
        params?: FindUniqueSessionProps;
        response: FindUniqueSessionResponse<FindUniqueSessionProps>;
    };
    "/session/count": {
        params?: CountSessionProps;
        response: CountSessionResponse;
    };

    // Account Routes
    "/account": {
        params?: FindManyAccountProps;
        response: FindManyAccountResponse<FindManyAccountProps>;
    };
    "/account/unique": {
        params?: FindUniqueAccountProps;
        response: FindUniqueAccountResponse<FindUniqueAccountProps>;
    };
    "/account/count": {
        params?: CountAccountProps;
        response: CountAccountResponse;
    };

    // Verification Routes
    "/verification": {
        params?: FindManyVerificationProps;
        response: FindManyVerificationResponse<FindManyVerificationProps>;
    };
    "/verification/unique": {
        params?: FindUniqueVerificationProps;
        response: FindUniqueVerificationResponse<FindUniqueVerificationProps>;
    };
    "/verification/count": {
        params?: CountVerificationProps;
        response: CountVerificationResponse;
    };

    // Address Routes
    "/address": {
        params?: FindManyAddressProps;
        response: FindManyAddressResponse<FindManyAddressProps>;
    };
    "/address/unique": {
        params?: FindUniqueAddressProps;
        response: FindUniqueAddressResponse<FindUniqueAddressProps>;
    };
    "/address/count": {
        params?: CountAddressProps;
        response: CountAddressResponse;
    };

    // Article Routes
    "/article": {
        params?: FindManyArticleProps;
        response: FindManyArticleResponse<FindManyArticleProps>;
    };
    "/article/unique": {
        params?: FindUniqueArticleProps;
        response: FindUniqueArticleResponse<FindUniqueArticleProps>;
    };
    "/article/count": {
        params?: CountArticleProps;
        response: CountArticleResponse;
    };

    // Diy Routes
    "/diy": {
        params?: FindManyDiyProps;
        response: FindManyDiyResponse<FindManyDiyProps>;
    };
    "/diy/unique": {
        params?: FindUniqueDiyProps;
        response: FindUniqueDiyResponse<FindUniqueDiyProps>;
    };
    "/diy/count": {
        params?: CountDiyProps;
        response: CountDiyResponse;
    };

    // Content Routes
    "/content": {
        params?: FindManyContentProps;
        response: FindManyContentResponse<FindManyContentProps>;
    };
    "/content/unique": {
        params?: FindUniqueContentProps;
        response: FindUniqueContentResponse<FindUniqueContentProps>;
    };
    "/content/count": {
        params?: CountContentProps;
        response: CountContentResponse;
    };

    // Category Routes
    "/category": {
        params?: FindManyCategoryProps;
        response: FindManyCategoryResponse<FindManyCategoryProps>;
    };
    "/category/unique": {
        params?: FindUniqueCategoryProps;
        response: FindUniqueCategoryResponse<FindUniqueCategoryProps>;
    };
    "/category/count": {
        params?: CountCategoryProps;
        response: CountCategoryResponse;
    };

    // Product Routes
    "/product": {
        params?: FindManyProductProps;
        response: FindManyProductResponse<FindManyProductProps>;
    };
    "/product/unique": {
        params?: FindUniqueProductProps;
        response: FindUniqueProductResponse<FindUniqueProductProps>;
    };
    "/product/count": {
        params?: CountProductProps;
        response: CountProductResponse;
    };

    // Quantity Routes
    "/quantity": {
        params?: FindManyQuantityProps;
        response: FindManyQuantityResponse<FindManyQuantityProps>;
    };
    "/quantity/unique": {
        params?: FindUniqueQuantityProps;
        response: FindUniqueQuantityResponse<FindUniqueQuantityProps>;
    };
    "/quantity/count": {
        params?: CountQuantityProps;
        response: CountQuantityResponse;
    };

    // Order Routes
    "/order": {
        params?: FindManyOrderProps;
        response: FindManyOrderResponse<FindManyOrderProps>;
    };
    "/order/unique": {
        params?: FindUniqueOrderProps;
        response: FindUniqueOrderResponse<FindUniqueOrderProps>;
    };
    "/order/count": {
        params?: CountOrderProps;
        response: CountOrderResponse;
    };

    // Fruit Routes
    "/fruit": {
        params?: FindManyFruitProps;
        response: FindManyFruitResponse<FindManyFruitProps>;
    };
    "/fruit/unique": {
        params?: FindUniqueFruitProps;
        response: FindUniqueFruitResponse<FindUniqueFruitProps>;
    };
    "/fruit/count": {
        params?: CountFruitProps;
        response: CountFruitResponse;
    };
};
