import { createComboOptions, deduplicateOptions } from "@comps/ui/comboboxes/utils";
import {
    ArticleFindManyServer,
    CategoryFindManyServer,
    DiyFindManyServer,
    ProductFindManyServer,
} from "@services/server";
import Search from "./search";

export default async function Page() {
    // Fetch multiple sources in parallel
    const [productList, categoryList, articleList, diyList] = await Promise.all([
        ProductFindManyServer({
            select: { slug: true, name: true },
            take: 3,
        }),
        CategoryFindManyServer({
            select: { slug: true, name: true },
            take: 2,
        }),
        ArticleFindManyServer({
            select: { slug: true, title: true },
            take: 3,
        }),
        DiyFindManyServer({
            select: { slug: true, title: true },
            take: 2,
        }),
    ]);

    // Format options
    const productOptions = createComboOptions(productList, { slug: "slug", name: "name", type: "product" });
    const categoryOptions = createComboOptions(categoryList, { slug: "slug", name: "name", type: "category" });
    const articleOptions = createComboOptions(articleList, { slug: "slug", name: "title", type: "article" });
    const diyOptions = createComboOptions(diyList, { slug: "slug", name: "title", type: "diy" });

    // Merge and deduplicate options
    const mergedOptions = [...productOptions, ...categoryOptions, ...articleOptions, ...diyOptions];
    const initialOptions = deduplicateOptions(mergedOptions, 10);

    // Render
    return <Search initialOptions={initialOptions} />;
}
