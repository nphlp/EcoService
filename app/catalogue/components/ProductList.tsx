import Card from "@comps/server/Card";

import { combo } from "@lib/combo";

import { ProductType } from "@actions/types/Product";

type ProductListProps = {
    produitList: ProductType[] | null;
    className?: string;
};

export default function ProductList(props: ProductListProps) {
    const { produitList, className } = props;

    if (!produitList) {
        return (
            <div className="flex size-full items-center justify-center">
                Aucun produit disponible pour le moment.
            </div>
        );
    }

    return (
        <div
            className={combo(
                // "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
                className,
            )}
        >
            {produitList.map((produit, index) => (
                <Card
                    key={index}
                    className="h-[200px] rounded-xl bg-white p-4 shadow-lg"
                >
                    <h2 className="text-lg font-semibold">{produit.name}</h2>
                    <p className="text-gray-600">Prix : {produit.price} €</p>
                </Card>
            ))}
        </div>
    );
};