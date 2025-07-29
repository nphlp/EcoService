import Card from "@comps/server/card";
import { createComboOptions } from "@comps/ui/comboboxes/utils";
import { createSelectOptions } from "@comps/ui/select/utils";
import { ArticleFindManyServer, CategoryFindManyServer, ProductFindManyServer } from "@services/server";
import Form from "./form";

export default async function Page() {
    // Fetch the data
    const categoryList = await CategoryFindManyServer({
        select: { slug: true, name: true },
    });
    const articleList = await ArticleFindManyServer({
        select: { slug: true, title: true },
    });
    const productList = await ProductFindManyServer({
        select: { slug: true, name: true },
    });

    // Format the options
    const categoryOptions = createSelectOptions(categoryList, { slug: "slug", label: "name" });
    const articleOptions = createComboOptions(articleList, { slug: "slug", name: "title" });
    const productOptions = createComboOptions(productList, { slug: "slug", name: "name", type: "product" });

    return (
        <div className="p-7">
            <Card className="h-fit w-[450px] space-y-4">
                <div className="text-2xl font-bold">Formulaire</div>
                <div className="text-sm text-gray-500">
                    Ce formulaire est un exemple de formulaire avec des champs de type texte, sélection, checkbox,
                    bouton, etc.
                </div>
                <Form
                    categoryOptions={categoryOptions}
                    articleOptions={articleOptions}
                    productOptions={productOptions}
                />
            </Card>
        </div>
    );
}
