import { FetchV2 } from "@utils/FetchV2/FetchV2";
import ClientComponent from "./client";
import { ArticleFetchParams } from "./fetchParams";

export default async function Page() {
    const articleList = await FetchV2({
        route: "/article",
        params: ArticleFetchParams({ includeAuthor: true }),
    });

    if (!articleList.length) {
        return <div>There is no data.</div>;
    }

    return <ClientComponent articleList={articleList} />;
}
