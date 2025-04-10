import { FindManyDiyProps, FindManyDiyResponse } from "@services/types";

// Diy fetch params

export const DiyFetchParams = ({ author }: { author: boolean }) =>
    ({
        ...(author && {
            include: {
                Author: {
                    select: {
                        name: true,
                    },
                },
            },
        }),
        orderBy: {
            createdAt: "desc" as const,
        },
        take: 2,
    }) satisfies FindManyDiyProps;

export type DiyListType = FindManyDiyResponse<ReturnType<typeof DiyFetchParams>>;
