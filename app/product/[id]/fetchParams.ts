import { FindUniqueProductProps } from "@services/types/ProductType";

import { FindUniqueProductResponse } from "@services/types";

// Product fetch params

export const ProductFetchParams = (id: string) =>
    ({
        where: { id },
        select: {
            id: true,
            name: true,
            description: true,
            image: true,
            price: true,
            stock: true,
            Vendor: {
                select: {
                    name: true,
                },
            },
            Category: {
                select: {
                    name: true,
                },
            },
        },
    }) satisfies FindUniqueProductProps;

export type ProductType = NonNullable<FindUniqueProductResponse<ReturnType<typeof ProductFetchParams>>>;
