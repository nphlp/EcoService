import { createComboOptions } from "@comps/UI/comboboxes/utils";
import { ProductFindManyServer } from "@services/server";
import Search from "./search";

export default async function Page() {
    // Fetch single source
    const productList = await ProductFindManyServer({
        select: { slug: true, name: true },
        take: 6,
    });

    // Format options
    const initialOptions = createComboOptions(productList, { slug: "slug", name: "name" });

    return <Search initialOptions={initialOptions} />;
}
