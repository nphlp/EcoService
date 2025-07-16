import Card from "@comps/server/card";
import { createOptions, mergeAndDeduplicateOptions } from "@comps/ui/comboboxes/utils";
import {
    ArticleFindManyServer,
    CategoryFindManyServer,
    DiyFindManyServer,
    ProductFindManyServer,
} from "@services/server";
import Search from "./search";

export default async function Page() {
    // ======= Fetch ======= //
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

    // ======= Create formatted options ======= //
    const productOptions = createOptions(productList, "product");
    const categoryOptions = createOptions(categoryList, "category");
    const articleOptions = createOptions(articleList, "article");
    const diyOptions = createOptions(diyList, "diy");

    // ======= Merge and deduplicate options ======= //
    const mergedOptions = [...productOptions, ...categoryOptions, ...articleOptions, ...diyOptions];
    const initialOptions = mergeAndDeduplicateOptions({ optionsToMerge: mergedOptions, limit: 10 });

    // ======= Render ======= //
    return (
        <div className="flex h-full flex-col items-center justify-center">
            <Card className="h-fit w-[450px] space-y-4">
                <div className="flex flex-row items-baseline gap-2">
                    <div className="text-2xl font-bold">Recherche</div>
                    <div className="text-2xl font-light text-gray-500">Multi source</div>
                </div>
                <div className="text-sm text-gray-500">
                    <span>Ce champ de recherche est un exemple de recherche avec </span>
                    <span>des données dynamiques sur quatre tables : </span>
                    <b>produits</b>
                    <span>, </span>
                    <b>categories</b>
                    <span>, </span>
                    <b>articles</b>
                    <span> et </span>
                    <b>DIY</b>
                    <span>.</span>
                </div>
                <Search<"product" | "category" | "article" | "diy"> initialOptions={initialOptions} />
            </Card>
        </div>
    );
}
