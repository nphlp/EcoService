import { FetchParallelizedV2 } from "@utils/FetchParallelizedV2";
import { FetchV2 } from "@utils/FetchV2";

export default async function Page() {
    const testList = await FetchV2({
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
    const [diyList, articleList, userList] = await FetchParallelizedV2([
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
            route: "/article",
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
                    Order: {
                        select: {
                            _count: true,
                        },
                    },
                },
            },
        },
    ]);

    const tests = testList[0].Author;
    const diys = diyList[0].Author;
    const articles = articleList[0].Author;
    const users = userList[0];

    console.log(tests, diys, articles, users);

    return (
        <div className="grid grid-cols-4 gap-4">
            <pre>{JSON.stringify(testList, null, 2)}</pre>
            <pre>{JSON.stringify(diyList, null, 2)}</pre>
            <pre>{JSON.stringify(articleList, null, 2)}</pre>
            <pre>{JSON.stringify(userList, null, 2)}</pre>
        </div>
    );
}
