import PrismaInstance from "@lib/prisma";
import { SelectArticleList } from "@services/actions/ArticleAction";
import { FetchV2 } from "@utils/FetchV2/FetchV2";

export default async function Page() {
    /**
     * Prisma fetch
     * To avoid, not cachable and parallelizable
     */
    const articlesPrisma = await PrismaInstance.article.findMany({
        select: { id: true, authorId: true },
    });

    /**
     * Action fetch
     * To avoid, not cachable and parallelizable
     */
    const articlesAction = await SelectArticleList({
        select: { id: true, authorId: true },
    });

    /**
     * Api fetch
     * Prefer this method, cacheable and parallelizable!
     */
    const articlesApi = await FetchV2({
        route: "/article",
        params: {
            select: { id: true, authorId: true },
        },
    });

    const dataPrisma = articlesPrisma[0];
    const dataAction = articlesAction[0];
    const dataApi = articlesApi[0];

    if (!dataPrisma || !dataAction || !dataApi) {
        return <div>No data</div>;
    }

    return (
        <div className="grid grid-cols-3 gap-4">
            <pre>{JSON.stringify(articlesPrisma, null, 2)}</pre>
            <pre>{JSON.stringify(articlesAction, null, 2)}</pre>
            <pre>{JSON.stringify(articlesApi, null, 2)}</pre>
        </div>
    );
}
