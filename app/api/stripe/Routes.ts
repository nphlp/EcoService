import { StripeFileUploadBody, StripeFileUploadResponse } from "./file/upload/route";
import { CreateStripePriceProps, CreateStripePriceResponse } from "./prices/create/route";
import { StripeSelectPriceProps, StripeSelectPriceResponse } from "./prices/select/route";
import { CreateStripeProductProps, CreateStripeProductResponse } from "./products/create/route";
import { StripeProductsProps, StripeProductsResponse } from "./products/route";
import { StripeSearchProductProps, StripeSearchProductResponse } from "./products/search/route";
import { StripeSelectProductProps, StripeSelectProductResponse } from "./products/select/route";
import { UpdateStripeProductProps, UpdateStripeProductResponse } from "./products/update/route";
import { StripeWebhookResponse } from "./webhooks/route";

export type Routes = {
    // ====== Files ====== //

    "/stripe/file/upload": () => {
        method: "POST";
        body: StripeFileUploadBody;
        response: StripeFileUploadResponse;
    };

    // ====== Prices  ====== //

    "/stripe/prices/create": () => {
        params: CreateStripePriceProps;
        response: CreateStripePriceResponse;
    };

    "/stripe/prices/select": () => {
        params: StripeSelectPriceProps;
        response: StripeSelectPriceResponse;
    };

    // ====== Products  ====== //

    "/stripe/products": () => {
        params: StripeProductsProps;
        response: StripeProductsResponse;
    };

    "/stripe/products/search": () => {
        params: StripeSearchProductProps;
        response: StripeSearchProductResponse;
    };

    "/stripe/products/create": () => {
        params: CreateStripeProductProps;
        response: CreateStripeProductResponse;
    };

    "/stripe/products/select": () => {
        params: StripeSelectProductProps;
        response: StripeSelectProductResponse;
    };

    "/stripe/products/update": () => {
        params: UpdateStripeProductProps;
        response: UpdateStripeProductResponse;
    };

    // ====== Webhooks  ====== //

    "/stripe/webhooks": () => {
        method: "POST";
        response: StripeWebhookResponse;
    };
};
