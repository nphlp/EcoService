import { createComboOptions } from "@comps/ui/comboboxes/utils";
import { ArticleFindManyServer, CategoryFindManyServer, ProductFindManyServer } from "@services/server";
import Search from "./search";

export default async function Page() {
    // Fetch multiple sources
    const [productList, categoryList, articleList] = await Promise.all([
        ProductFindManyServer({
            select: { slug: true, name: true },
            take: 3,
        }),
        CategoryFindManyServer({
            select: { slug: true, name: true },
            take: 3,
        }),
        ArticleFindManyServer({
            select: { slug: true, title: true },
            take: 3,
        }),
    ]);

    // Format options with types
    const productOptions = createComboOptions(productList, { slug: "slug", name: "name", type: "product" });
    const categoryOptions = createComboOptions(categoryList, { slug: "slug", name: "name", type: "category" });
    const articleOptions = createComboOptions(articleList, { slug: "slug", name: "title", type: "article" });

    // Merge all options
    const initialOptions = [...productOptions, ...categoryOptions, ...articleOptions];

    // Render
    return <Search initialOptions={initialOptions} />;
}
