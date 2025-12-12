import { Prisma } from "@prisma/client/client";
import { DiyCountProps, DiyFindManyProps } from "@services/types";
import { DiyQueryParamsCachedType } from "./queryParams";

type CountType = number;

// ============== Diy ============== //

type DiySearchType = Prisma.DiyGetPayload<ReturnType<typeof diyFetchParams>>;

const diyFetchParams = ({ page, search = "" }: DiyQueryParamsCachedType) =>
    ({
        select: {
            title: true,
            slug: true,
            createdAt: true,
            Content: {
                select: {
                    content: true,
                    image: true,
                },
            },
            Author: {
                select: {
                    name: true,
                },
            },
        },
        take: 6,
        skip: (page - 1) * 6,
        orderBy: {
            createdAt: "desc",
        },
        where: {
            OR: [
                { title: { contains: search } },
                { slug: { contains: search } },
                {
                    Content: {
                        some: {
                            content: { contains: search },
                        },
                    },
                },
                {
                    Author: {
                        name: { contains: search },
                    },
                },
            ],
        },
    }) satisfies DiyFindManyProps;

const diyCountParams = ({ search = "" }: { search: string }) =>
    ({
        where: {
            OR: [
                { title: { contains: search } },
                { slug: { contains: search } },
                {
                    Content: {
                        some: {
                            content: { contains: search },
                        },
                    },
                },
                {
                    Author: {
                        name: { contains: search },
                    },
                },
            ],
        },
    }) satisfies DiyCountProps;

// ============== Exports ============== //

export type { CountType, DiySearchType };

export { diyCountParams, diyFetchParams };
