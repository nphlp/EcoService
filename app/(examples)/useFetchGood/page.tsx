import Client from "./client";
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

    return <Client initialData={{ dataApiInit: userList, dataActionInit: articleList }} />;
}
