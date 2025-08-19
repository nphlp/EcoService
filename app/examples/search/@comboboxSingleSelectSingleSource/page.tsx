import { createComboOptions } from "@comps/ui/comboboxes/utils";
import { ProductFindManyServer } from "@services/server";
import Search from "./search";

export default async function Page() {
    // Fetch
    const productList = await ProductFindManyServer({
        select: { slug: true, name: true },
        take: 5,
    });

    // Format options
    const initialOptions = createComboOptions(productList, { slug: "slug", name: "name" });

    // Render
    return <Search initialOptions={initialOptions} />;
}
