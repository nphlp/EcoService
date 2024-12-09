import { FetchParallelizedV2 } from "@utils/FetchV2/FetchParallelizedV2";
import { FetchV2 } from "@utils/FetchV2/FetchV2";

export default async function Page() {
    const diyListA = await FetchV2({
        route: "/diy",
        params: {
            select: {
                Author: {
                    select: {
                        name: true,
                    },
                },
                // ICI
            },
            take: 2,
        },
    });

    const userListA = await FetchV2({
        route: "/user",
        params: {
            select: {
                name: true,
            },
        },
    });

    const [diyListB, userListB] = await FetchParallelizedV2([
        {
            route: "/diy",
            params: {
                select: {
                    Author: {
                        select: {
                            name: true,
                        },
                    },
                    // ICI
                },
                take: 2,
            },
        },
        {
            route: "/user",
            params: {
                select: {
                    name: true,
                },
            },
        },
    ]);

    // Expected output
    const diysA = diyListA[0];
    // Current output
    const diysB = diyListB[0];

    // Expected output
    const usersA = userListA[0];
    // Current output
    const usersB = userListB[0];

    return (
        <div className="grid h-full grid-cols-2 gap-4 p-10">
            <div className="space-y-4">
                <pre>{JSON.stringify(diysA, null, 2)}</pre>
                <pre>{JSON.stringify(diysB, null, 2)}</pre>
            </div>
            <div className="space-y-4">
                <pre>{JSON.stringify(usersA, null, 2)}</pre>
                <pre>{JSON.stringify(usersB, null, 2)}</pre>
            </div>
        </div>
    );
}
