import { FindManyProductProps } from "@services/types/ProductType";
import { FindManyProductResponse } from "@services/types";

// Product fetch params

export const ProductFetchParams = {
    select: {
        name: true,
        image: true,
        description: true,
        price: true,
    },
} satisfies FindManyProductProps;

export type ProductListType = FindManyProductResponse<typeof ProductFetchParams>;
