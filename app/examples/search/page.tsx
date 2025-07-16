import Card from "@comps/server/card";
import { createOptions } from "@comps/ui/comboboxes/utils";
import { ProductFindManyServer } from "@services/server";
import Search from "./search";

export default async function Page() {
    const productList = await ProductFindManyServer({
        select: { slug: true, name: true },
        take: 5,
    });

    const productOptions = createOptions(productList);

    return (
        <div className="flex h-full flex-col items-center justify-center">
            <Card className="h-fit w-[450px] space-y-4">
                <div className="text-2xl font-bold">Recherche</div>
                <div className="text-sm text-gray-500">
                    Ce champ de recherche est un exemple de rafraîchissement de données.
                </div>
                <Search productOptions={productOptions} />
            </Card>
        </div>
    );
}
