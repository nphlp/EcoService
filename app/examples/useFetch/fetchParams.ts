import { DiyFindManyProps, DiyFindManyResponse } from "@services/types/DiyType";

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
    }) satisfies DiyFindManyProps;

export type DiyListType = DiyFindManyResponse<ReturnType<typeof DiyFetchParams>>;
