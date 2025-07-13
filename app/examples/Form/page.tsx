import { CategoryFindManyServer, ProductFindManyServer } from "@services/server";
import Form from "./form";

export default async function Page() {
    // Fetch the data
    const categoryList = await CategoryFindManyServer({
        select: {
            id: true,
            name: true,
        },
    });
    const productList = await ProductFindManyServer({
        select: {
            id: true,
            name: true,
        },
    });

    // Format the options
    const categoryOptions = categoryList.map(({ id, name }) => ({
        label: name,
        value: id,
    }));
    const productOptions = productList.map(({ id, name }) => ({
        label: name,
        value: id,
    }));

    return (
        <div className="flex h-full items-center justify-center">
            <Form categoryOptions={categoryOptions} productOptions={productOptions} />
        </div>
    );
}
