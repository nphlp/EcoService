import { createComboOptions, deduplicateOptions } from "@comps/ui/comboboxes/utils";
import { ProductFindManyServer } from "@services/server";
import Search from "./search";

export default async function Page() {
    // Fetch
    const productList = await ProductFindManyServer({
        select: { slug: true, name: true },
        take: 10,
    });

    // Format options
    const productOptions = createComboOptions(productList, { slug: "slug", name: "name" });

    // Merge and deduplicate options
    const mergedOptions = [...productOptions];
    const initialOptions = deduplicateOptions(mergedOptions, 10);

    // Render
    return <Search initialOptions={initialOptions} />;
}
