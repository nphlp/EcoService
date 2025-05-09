import ImageRatio from "@comps/server/imageRatio";
import { FetchV2 } from "@utils/FetchV2/FetchV2";
import { ArrowLeft, Package2, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import { ProductFetchParams } from "./fetchParams";
import AddToCartButtonWrapper from "@app/product/[id]/addToCartButtonWrapper";
import { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");
}

type PageProps = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const { params } = props;
    const { id } = await params;

    const product = await FetchV2({
        route: "/product/unique",
        params: ProductFetchParams(id),
    });

    return {
        title: product ? `${product.name} - Eco Service` : "Produit - Eco Service",
        description: product ? product.description : "Achetez des produits éco-responsables sur Eco Service.",
        alternates: {
            canonical: `${baseUrl}/product/${id}`,
        },
        openGraph: {
            title: product ? `${product.name} - Eco Service` : "Produit - Eco Service",
            description: product ? product.description : "Achetez des produits éco-responsables sur Eco Service.",
            url: `${baseUrl}/product/${id}`,
            siteName: "Eco Service",
            // images: [
            //     {
            //         url: `${baseUrl}/icon-512x512.png`,
            //         width: 512,
            //         height: 512,
            //         alt: "Eco Service Icon",
            //     },
            // ],
            locale: "fr_FR",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: product ? `${product.name} - Eco Service` : "Produit - Eco Service",
            description: product ? product.description : "Achetez des produits éco-responsables sur Eco Service.",
            images: [`${baseUrl}/icon-512x512.png`],
        },
    };
}

export default async function Page(props: PageProps) {
    const { params } = props;
    const { id } = await params;

    const product = await FetchV2({
        route: "/product/unique",
        params: ProductFetchParams(id),
    });

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center space-y-4">
                <h1 className="text-2xl font-semibold">Produit non trouvé</h1>
                <Link href="/products" className="text-eco flex items-center hover:underline">
                    <ArrowLeft className="mr-2 size-4" />
                    Retour aux produits
                </Link>
            </div>
        );
    }

    const { name, image, price, description, stock, Vendor, Category } = product;

    return (
        <div className="p-7">
            {/* Bouton retour */}
            <Link href="/catalog" className="text-eco mb-8 inline-flex items-center hover:underline">
                <ArrowLeft className="mr-2 size-4" />
                Retour aux produits
            </Link>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Image du produit */}
                <div className="rounded-2xl border border-gray-300 bg-white p-4 shadow-[2px_2px_7px_rgba(0,0,0,0.1)]">
                    <ImageRatio src={image} alt={name} className="rounded-lg" />
                </div>

                {/* Informations produit */}
                <div className="space-y-6">
                    <div>
                        {Category && (
                            <span className="bg-eco/10 text-eco mb-2 inline-block rounded-full px-3 py-1 text-sm">
                                {Category.name}
                            </span>
                        )}
                        <h1 className="text-3xl font-bold">{name}</h1>
                        <p className="mt-2 text-gray-600">{description}</p>
                    </div>

                    {/* Prix et stock */}
                    <div className="space-y-4 rounded-xl border border-gray-300 bg-white p-6 shadow-[2px_2px_7px_rgba(0,0,0,0.1)]">
                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Prix</p>
                                <p className="text-eco text-3xl font-bold">{price.toFixed(2)} €</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Stock</p>
                                <p className={`font-medium ${stock > 0 ? "text-green-600" : "text-red-600"}`}>
                                    {stock > 0 ? `${stock} disponibles` : "Rupture de stock"}
                                </p>
                            </div>
                        </div>

                        <AddToCartButtonWrapper product={product} stock={stock} />
                    </div>

                    {/* Vendeur */}
                    {Vendor && (
                        <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-[2px_2px_7px_rgba(0,0,0,0.1)]">
                            <p className="text-sm text-gray-500">Vendu par</p>
                            <p className="font-medium">{Vendor.name}</p>
                        </div>
                    )}

                    {/* Avantages */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center rounded-xl border border-gray-300 bg-white p-4 text-center shadow-[2px_2px_7px_rgba(0,0,0,0.1)]">
                            <Truck className="text-eco mb-2 size-6" />
                            <span className="text-sm">Livraison rapide</span>
                        </div>
                        <div className="flex flex-col items-center rounded-xl border border-gray-300 bg-white p-4 text-center shadow-[2px_2px_7px_rgba(0,0,0,0.1)]">
                            <Package2 className="text-eco mb-2 size-6" />
                            <span className="text-sm">Emballage écologique</span>
                        </div>
                        <div className="flex flex-col items-center rounded-xl border border-gray-300 bg-white p-4 text-center shadow-[2px_2px_7px_rgba(0,0,0,0.1)]">
                            <ShieldCheck className="text-eco mb-2 size-6" />
                            <span className="text-sm">Qualité garantie</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
