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
    return <Search initialOptions={initialOptions} />;
}
