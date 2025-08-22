import { categoryFetchParams } from "@comps/CORE/search/fetchParams";
import { CategoryFindManyServer } from "@services/server";
import Client from "./client";

export default async function Page() {
    const categoryList = await CategoryFindManyServer(categoryFetchParams());

    const initialData = {
        categoryList,
    };

    return <Client initialData={initialData} />;
}
