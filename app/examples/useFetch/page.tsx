import { ArticleFindManyServer } from "@services/server";
import ClientComponent from "./client";
import { ArticleFetchParams } from "./fetchParams";

export default async function Page() {
    const articleList = await ArticleFindManyServer(ArticleFetchParams({ includeAuthor: true }));

    if (!articleList.length) {
        return <div>There is no data.</div>;
    }

    return <ClientComponent articleList={articleList} />;
}
