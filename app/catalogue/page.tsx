import { SelectProductList } from "@actions/database/Product";
import CatalogueClient from "./client";

export default async function CataloguePage() {
    const produitList = await SelectProductList({});

    return (        
        // TODO: check if h-screen is fine
        <div className="h-screen w-full">
            <h1 className="mb-6 text-3xl font-bold text-gray-800">Catalogue</h1>
            <CatalogueClient produitList={produitList} />
        </div>
    );
}
