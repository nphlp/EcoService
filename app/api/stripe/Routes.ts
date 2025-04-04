import { StripeFileUploadBody, StripeFileUploadResponse } from "./file/upload/route";
import { CreateStripeProductProps, CreateStripeProductResponse } from "./products/create/route";
import { StripeProductsResponse } from "./products/route";
import { StripeWebhookResponse } from "./webhooks/route";

export type Routes = {
    // ========== Stripe routes ========== //

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

    // "/stripe/products/{id}": {
    //     method: "GET" | "POST";
    //     params: SelectProductProps;
    //     response: SelectProductResponse;
    // };

    "/stripe/file/upload": {
        // OK
        method: "POST";
        params: undefined;
        body: StripeFileUploadBody;
        response: StripeFileUploadResponse;
    };

    "/stripe/products": {
        // OK
        method: "GET";
        params: undefined;
        response: StripeProductsResponse;
    };

    "/stripe/products/create": {
        // OK
        method: "POST";
        params: CreateStripeProductProps;
        response: CreateStripeProductResponse;
    };

    "/stripe/webhooks": {
        // OK
        method: "POST";
        params: undefined;
        response: StripeWebhookResponse;
    };

    // ========== Stripe routes ========== //
};
