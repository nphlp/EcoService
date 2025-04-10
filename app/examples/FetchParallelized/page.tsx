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

    console.log(diysA, diysB, usersA, usersB);

    return (
        <div className="grid grid-cols-4 gap-4">
            <pre>{JSON.stringify(diyListA, null, 2)}</pre>
            <pre>{JSON.stringify(diyListB, null, 2)}</pre>
            <pre>{JSON.stringify(userListA, null, 2)}</pre>
            <pre>{JSON.stringify(userListB, null, 2)}</pre>
        </div>
    );
}
