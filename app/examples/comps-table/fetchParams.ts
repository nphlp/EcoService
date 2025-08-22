import { Prisma } from "@prisma/client";
import { CategoryFindManyProps } from "@services/types";

// ============== Category ============== //

type CategorySearchType = Prisma.CategoryGetPayload<ReturnType<typeof categoryFetchParams>>;

const categoryFetchParams = () =>
    ({
        select: {
            name: true,
            slug: true,
        },
        take: 5,
    }) satisfies CategoryFindManyProps;

// ============== Exports ============== //

export type { CategorySearchType };

export const indexFetchParams = {
    categoryFetchParams,
};
