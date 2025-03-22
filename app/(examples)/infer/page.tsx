import PrismaInstance from "@lib/prisma";
import { SelectArticleList } from "@services/actions/ArticleAction";
import { Fetch } from "@utils/Fetch";

export default async function Page() {
    const articlesPrisma = await PrismaInstance.article.findMany({
        select: { id: true, authorId: true },
    });

    const articlesAction = await SelectArticleList({
        select: { id: true, authorId: true },
    });

    const articlesApi = await Fetch({ route: "/article", params: {
        select: { id: true, authorId: true },
    } });

    const dataPrisma = articlesPrisma[0]
    const dataAction = articlesAction[0]
    const dataApi = articlesApi[0]

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
