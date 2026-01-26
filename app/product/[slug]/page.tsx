import ProductSlider from "@comps/PROJECT/sliders/productSlider";
import Link from "@comps/UI/button/link";
import Card from "@comps/UI/card";
import ImageRatio from "@comps/UI/imageRatio";
import { ProductFindManyServer, ProductFindUniqueServer } from "@services/server";
import { ArrowLeft, Package2, ShieldCheck, Truck, User } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { JSX, Suspense, cloneElement } from "react";
import AddToCartButton from "./addToCartButton";
import { ProductFetchParams, RecommendedProductListFetchParams } from "./fetchParams";

type PageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");

    const { params } = props;
    const { slug } = await params;

    const product = await ProductFindUniqueServer({ where: { slug } });

    if (!product) {
        return {
            title: "Produit non trouvé - Eco Service",
        };
    }

    return {
        title: `${product.name} - Eco Service`,
        description: "Achetez des produits éco-responsables sur Eco Service.",
        // metadataBase: new URL(`${baseUrl}/product`),
        alternates: {
            canonical: `${baseUrl}/product/${slug}`,
        },
    };
}

export default async function Page(props: PageProps) {
    return (
        <Suspense>
            <SuspendedPage {...props} />
        </Suspense>
    );
}

const SuspendedPage = async (props: PageProps) => {
    await connection();

    const { params } = props;
    const { slug } = await params;

    const product = await ProductFindUniqueServer(ProductFetchParams(slug));

    if (!product) notFound();

    const recommendedProductList = await ProductFindManyServer(RecommendedProductListFetchParams(slug));

    const { name, image, price, description, stock, Category } = product;

    return (
        <div className="w-full max-w-300 flex-1 space-y-8 overflow-x-hidden p-7 px-4 md:px-7">
            <Link label="Retour aux produits" href="/catalog" variant="ghost">
                <ArrowLeft className="mr-2 size-4" />
                Retour aux produits
            </Link>

            <div className="flex items-start justify-start gap-8">
                {/* Image for large screen */}
                <ImageRatio
                    src={image}
                    alt={name}
                    className="hidden h-105 shrink-0 grow-0 rounded-lg lg:block"
                    mode="preloaded"
                />

                <div className="w-full space-y-6">
                    <div>
                        {Category && (
                            <div className="bg-primary/10 text-primary mb-2 w-fit rounded-full px-3 py-1 text-sm">
                                {Category.name}
                            </div>
                        )}
                        <h1 className="text-3xl font-bold">{name}</h1>
                        <p className="text-gray-600">{description}</p>
                    </div>

                    {/* Image for small screen */}
                    <ImageRatio src={image} alt={name} className="rounded-lg lg:hidden" mode="preloaded" />

                    <div className="w-full space-y-4">
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

                        <AddToCartButton
                            className="w-full py-3 text-xl lg:py-1.5 lg:text-base"
                            product={product}
                            stock={stock}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-2">
                        <ProductInfo icon={<User />} title="Vendeur agréé" />
                        <ProductInfo icon={<Truck />} title="Livraison rapide" />
                        <ProductInfo icon={<Package2 />} title="Eco-emballage" />
                        <ProductInfo icon={<ShieldCheck />} title="Qualité garantie" />
                    </div>
                </div>
            </div>

            <ProductSlider productList={recommendedProductList} title="Nos recommandations" />
        </div>
    );
};

type ProductInfoProps = {
    icon: JSX.Element;
    title: string;
};

const ProductInfo = (props: ProductInfoProps) => {
    const { icon, title } = props;

    return (
        <Card className="flex flex-col items-center justify-center gap-2 p-3">
            {cloneElement(icon, { className: "size-6" })}
            <div className="text-center text-sm text-gray-500">{title}</div>
        </Card>
    );
};
