import { StripeFileUploadBody, StripeFileUploadResponse } from "./file/upload/route";
import { CreateStripePriceProps, CreateStripePriceResponse } from "./prices/create/route";
import { StripeSelectPriceProps, StripeSelectPriceResponse } from "./prices/select/route";
import { CreateStripeProductProps, CreateStripeProductResponse } from "./products/create/route";
import { StripeProductsResponse } from "./products/route";
import { StripeSearchProductProps, StripeSearchProductResponse } from "./products/search/route";
import { StripeSelectProductProps, StripeSelectProductResponse } from "./products/select/route";
import { UpdateStripeProductProps, UpdateStripeProductResponse } from "./products/update/route";
import { StripeWebhookResponse } from "./webhooks/route";

export type Routes = {
    // "/stripe/checkout": {
    //     method: "POST";
    //     params: SelectProductListProps;
    //     response: SelectProductListResponse;
    // };

    // "/stripe/connect/become-seller": {
    //     method: "POST";
    //     params: SelectProductListProps;
    //     response: SelectProductListResponse;
    // };

    // "/stripe/connect/onboard": {
    //     method: "POST";
    //     params: SelectProductListProps;
    //     response: SelectProductListResponse;
    // };

    // ====== Files ====== //

    "/stripe/file/upload": {
        method: "POST";
        params: undefined;
        body: StripeFileUploadBody;
        response: StripeFileUploadResponse;
    };

    // ====== Products  ====== //

    "/stripe/products": {
        params: undefined;
        response: StripeProductsResponse;
    };

    "/stripe/products/search": {
        params: StripeSearchProductProps;
        response: StripeSearchProductResponse;
    };

    "/stripe/products/create": {
        params: CreateStripeProductProps;
        response: CreateStripeProductResponse;
    };

    "/stripe/products/select": {
        params: StripeSelectProductProps;
        response: StripeSelectProductResponse;
    };

    "/stripe/products/update": {
        params: UpdateStripeProductProps;
        response: UpdateStripeProductResponse;
    };

    // "/stripe/products/delete": {
    //     method: "POST";
    //     params: DeleteStripeProductProps;
    //     response: DeleteStripeProductResponse;
    // };

    // ====== Prices  ====== //

    "/stripe/prices/create": {
        params: CreateStripePriceProps;
        response: CreateStripePriceResponse;
    };

    "/stripe/prices/select": {
        params: StripeSelectPriceProps;
        response: StripeSelectPriceResponse;
    };

    // ====== Webhooks  ====== //

    "/stripe/webhooks": {
        method: "POST";
        params: undefined;
        response: StripeWebhookResponse;
    };
};
