import { createOptions, mergeAndDeduplicateOptions } from "@comps/ui/comboboxes/utils";
import {
    ArticleFindManyServer,
    CategoryFindManyServer,
    DiyFindManyServer,
    ProductFindManyServer,
} from "@services/server";
import Search from "./search";

export default async function Page() {
    // Fetch
    const productList = await ProductFindManyServer({
        select: { slug: true, name: true },
        take: 3,
    });

    const categoryList = await CategoryFindManyServer({
        select: { slug: true, name: true },
        take: 2,
    });

    const articleList = await ArticleFindManyServer({
        select: { slug: true, title: true },
        take: 3,
    });

    const diyList = await DiyFindManyServer({
        select: { slug: true, title: true },
        take: 2,
    });

    // Format options
    const productOptions = createOptions(productList, "product");
    const categoryOptions = createOptions(categoryList, "category");
    const articleOptions = createOptions(articleList, "article");
    const diyOptions = createOptions(diyList, "diy");

    // Merge and deduplicate options
    const mergedOptions = [...productOptions, ...categoryOptions, ...articleOptions, ...diyOptions];
    const initialOptions = mergeAndDeduplicateOptions({ optionsToMerge: mergedOptions, limit: 10 });

    // Render
    return <Search<"product" | "category" | "article" | "diy"> initialOptions={initialOptions} />;
}
