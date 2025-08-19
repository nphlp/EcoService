import { createComboOptions } from "@comps/UI/comboboxes/utils";
import { ArticleFindManyServer, CategoryFindManyServer, ProductFindManyServer } from "@services/server";
import Search from "./search";

export default async function Page() {
    // Fetch multiple sources
    const [productList, categoryList, articleList] = await Promise.all([
        ProductFindManyServer({
            select: { slug: true, name: true },
            take: 2,
        }),
        CategoryFindManyServer({
            select: { slug: true, name: true },
            take: 2,
        }),
        ArticleFindManyServer({
            select: { slug: true, title: true },
            take: 2,
        }),
    ]);

    // Format options with types
    const productOptions = createComboOptions(productList, { slug: "slug", name: "name", type: "product" });
    const categoryOptions = createComboOptions(categoryList, { slug: "slug", name: "name", type: "category" });
    const articleOptions = createComboOptions(articleList, { slug: "slug", name: "title", type: "article" });

    // Merge options
    const initialOptions = [...productOptions, ...categoryOptions, ...articleOptions];

    return <Search initialOptions={initialOptions} />;
}
