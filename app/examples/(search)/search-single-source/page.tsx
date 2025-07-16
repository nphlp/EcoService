import Card from "@comps/server/card";
import { createOptions, mergeAndDeduplicateOptions } from "@comps/ui/comboboxes/utils";
import { ProductFindManyServer } from "@services/server";
import Search from "./search";

export default async function Page() {
    // ======= Fetch ======= //
    const productList = await ProductFindManyServer({
        select: { slug: true, name: true },
        take: 10,
    });

    // ======= Create formatted options ======= //
    const productOptions = createOptions(productList);

    // ======= Merge and deduplicate options ======= //
    const mergedOptions = [...productOptions];
    const initialOptions = mergeAndDeduplicateOptions({ optionsToMerge: mergedOptions, limit: 10 });

    // ======= Render ======= //
    return (
        <div className="flex h-full flex-col items-center justify-center">
            <Card className="h-fit w-[450px] space-y-4">
                <div className="flex flex-row items-baseline gap-2">
                    <div className="text-2xl font-bold">Recherche</div>
                    <div className="text-2xl font-light text-gray-500">Single source</div>
                </div>
                <div className="text-sm text-gray-500">
                    <span>Ce champ de recherche est un exemple de recherche avec </span>
                    <span>des données dynamiques sur une table.</span>
                </div>
                <Search initialOptions={initialOptions} />
            </Card>
        </div>
    );
}
