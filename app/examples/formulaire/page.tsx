import Card from "@comps/server/card";
import { ArticleFindManyServer, CategoryFindManyServer, ProductFindManyServer } from "@services/server";
import Form from "./form";
import { createOptions } from "@comps/ui/comboboxes/utils";

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
    const categoryOptions = categoryList.map(({ slug, name }) => ({ label: name, value: slug }));
    const articleOptions = createOptions(articleList);
    const productOptions = createOptions(productList);

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
