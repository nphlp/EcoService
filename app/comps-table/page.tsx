import { CategoryFindManyServer } from "@services/server";
import Client from "./client";
import { categoryFetchParams } from "@comps/CORE/search/fetchParams";

export default async function Page() {
    const categoryList = await CategoryFindManyServer(categoryFetchParams());

    const initialData = {
        categoryList,
    };

    return <Client initialData={initialData} />;
}
