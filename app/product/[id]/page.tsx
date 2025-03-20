import ImageRatio from "@comps/server/ImageRatio";
import { Fetch } from "@utils/Fetch";
import { ArrowLeft, Package2, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export const dynamic = "force-dynamic";

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function Page(props: PageProps) {
    const { params } = props;
    const { id } = await params;

    const product = await Fetch({
        route: "/product/unique",
        params: {
            where: { id },
            select: {
                id: true,
                name: true,
                description: true,
                image: true,
                price: true,
                stock: true,
                Vendor: {
                    select: {
                        name: true,
                    },
                },
                Category: {
                    select: {
                        name: true,
                    },
                },
            },
        },
    });

    if (!product) {
        return (
            <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4">
                <h1 className="text-2xl font-semibold">Produit non trouvé</h1>
                <Link href="/products" className="text-primary flex items-center hover:underline">
                    <ArrowLeft className="mr-2 size-4" />
                    Retour aux produits
                </Link>
            </div>
        );
    }

    const { name, image, price, description, stock, Vendor, Category } = product;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Bouton retour */}
            <Link href="/catalog" className="text-primary mb-8 inline-flex items-center hover:underline">
                <ArrowLeft className="mr-2 size-4" />
                Retour aux produits
            </Link>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Image du produit */}
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <ImageRatio className="rounded-xl" src={image} alt={name} />
                </div>

                {/* Informations produit */}
                <div className="space-y-6">
                    <div>
                        {Category && (
                            <span className="bg-primary/10 text-primary mb-2 inline-block rounded-full px-3 py-1 text-sm">
                                {Category.name}
                            </span>
                        )}
                        <h1 className="text-3xl font-bold">{name}</h1>
                        <p className="mt-2 text-gray-600">{description}</p>
                    </div>

                    {/* Prix et stock */}
                    <div className="space-y-4 rounded-xl bg-white p-6 shadow-sm">
                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Prix</p>
                                <p className="text-primary text-3xl font-bold">{price.toFixed(2)} €</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Stock</p>
                                <p className={`font-medium ${stock > 0 ? "text-green-600" : "text-red-600"}`}>
                                    {stock > 0 ? `${stock} disponibles` : "Rupture de stock"}
                                </p>
                            </div>
                        </div>

                        <AddToCartButton product={product} stock={stock} />
                    </div>

                    {/* Vendeur */}
                    {Vendor && (
                        <div className="rounded-xl bg-white p-6 shadow-sm">
                            <p className="text-sm text-gray-500">Vendu par</p>
                            <p className="font-medium">{Vendor.name}</p>
                        </div>
                    )}

                    {/* Avantages */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center rounded-xl bg-white p-4 text-center shadow-sm">
                            <Truck className="text-primary mb-2 size-6" />
                            <span className="text-sm">Livraison rapide</span>
                        </div>
                        <div className="flex flex-col items-center rounded-xl bg-white p-4 text-center shadow-sm">
                            <Package2 className="text-primary mb-2 size-6" />
                            <span className="text-sm">Emballage écologique</span>
                        </div>
                        <div className="flex flex-col items-center rounded-xl bg-white p-4 text-center shadow-sm">
                            <ShieldCheck className="text-primary mb-2 size-6" />
                            <span className="text-sm">Qualité garantie</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
