import { StripeFileUploadBody, StripeFileUploadResponse } from "./file/upload/route";
import { CreateStripeProductProps, CreateStripeProductResponse } from "./products/create/route";
import { StripeProductsResponse } from "./products/route";
import { StripeSelectProductProps, StripeSelectProductResponse } from "./products/select/route";
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

    "/stripe/file/upload": {
        method: "POST";
        params: undefined;
        body: StripeFileUploadBody;
        response: StripeFileUploadResponse;
    };

    "/stripe/products": {
        method: "GET";
        params: undefined;
        response: StripeProductsResponse;
    };

    "/stripe/products/create": {
        method: "POST";
        params: CreateStripeProductProps;
        response: CreateStripeProductResponse;
    };

    "/stripe/products/select": {
        method: "GET";
        params: StripeSelectProductProps;
        response: StripeSelectProductResponse;
    };

    "/stripe/webhooks": {
        method: "POST";
        params: undefined;
        response: StripeWebhookResponse;
    };
};
