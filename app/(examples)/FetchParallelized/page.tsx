import { FetchParallelized } from "@utils/FetchParallelized";

export default async function Page() {
    const [userList, articleList] = await FetchParallelized([
        {
            route: "/article",
            params: {
                include: {
                    Author: true,
                },
                take: 2,
            },
        },
        {
            route: "/article",
            params: {
                include: {
                    Author: true,
                },
                take: 2,
            },
        },
    ]);

    if (!userList.length || !articleList.length) {
        return <div>There is no data.</div>;
    }

    return (
        <div className="grid grid-cols-2 gap-4">
            <pre>{JSON.stringify(userList, null, 2)}</pre>
            <pre>{JSON.stringify(articleList, null, 2)}</pre>
        </div>
    );
}
