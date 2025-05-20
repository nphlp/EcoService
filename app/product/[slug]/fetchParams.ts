import { ProductFindUniqueProps, ProductFindUniqueResponse } from "@services/types/ProductType";

// Product fetch params

export const ProductFetchParams = (slug: string) =>
    ({
        where: { slug },
        select: {
            id: true,
            name: true,
            slug: true,
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
    }) satisfies ProductFindUniqueProps;

export type ProductType = NonNullable<ProductFindUniqueResponse<ReturnType<typeof ProductFetchParams>>>;
