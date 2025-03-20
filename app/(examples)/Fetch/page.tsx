import { SelectArticleList } from "@actions/ArticleAction";
import { Fetch } from "@utils/Fetch";

export default async function Page() {
    const responseApi = await Fetch({
        route: "/article",
        params: {
            include: {
                Author: true,
            },
        },
    });

    const responseAction = await SelectArticleList({
        include: {
            Author: true,
        },
    });

    if (!responseApi || !responseAction) {
        return <div>There is no data.</div>;
    }

    return (
        <div className="grid grid-cols-2 gap-4">
            <pre>{JSON.stringify(responseApi, null, 2)}</pre>
            <pre>{JSON.stringify(responseAction, null, 2)}</pre>
        </div>
    );
}
