import { StripeProductsResponse } from "@app/api/stripe/products/route";
import Link from "@comps/UI/button/link";
import ImageRatio from "@comps/UI/imageRatio";
import { combo } from "@lib/combo";
import { Route } from "next";
import Stripe from "stripe";

const env = process.env.NODE_ENV;

/**
 * Récupère l'URL de l'image du produit
 * Priorité : metadata.localImage > images[0] > placeholder
 */
function getImageUrl(product: Stripe.Product): string {
    // Image locale stockée en metadata
    if (product.metadata?.localImage) {
        return product.metadata.localImage;
    }

    // Image Stripe
    if (product.images?.[0]) {
        const imageUrl = product.images[0];
        if (imageUrl.includes("/v1/files/")) {
            const fileId = imageUrl.split("/").pop();
            return `https://files.stripe.com/links/${fileId}`;
        }
        return imageUrl;
    }

    // Placeholder
    return "/images/placeholder.webp";
}

type ProductDisplayProps = {
    stripeProductList: StripeProductsResponse;
};

export default function ProductDisplay(props: ProductDisplayProps) {
    const { stripeProductList } = props;

    return (
        <div className="grid grid-cols-1 gap-8 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {stripeProductList.map((product, index) => (
                <div key={index} className="group relative">
                    <div className="w-full overflow-hidden rounded-lg">
                        <ImageRatio src={getImageUrl(product)} alt={product.name} mode="onPageLoad" />
                    </div>
                    <div
                        className={combo(
                            "opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                            "absolute top-0 size-full",
                            "flex flex-col items-center justify-center gap-2 rounded-lg",
                            "bg-black/50 text-xl font-medium text-gray-100",
                        )}
                    >
                        <Link
                            label={product.name}
                            variant="outline"
                            className="text-sm"
                            href={`https://dashboard.stripe.com/${env === "production" ? "" : "test"}/products/${product.id}`}
                            target="_blank"
                        >
                            Voir sur Stripe
                        </Link>
                        <Link
                            label={product.name}
                            className="border border-gray-600 text-sm"
                            href={`/dashboard/edit-product/${product.id}` as Route}
                        >
                            Éditer
                        </Link>
                    </div>
                    <div
                        className={combo(
                            "absolute bottom-0 flex w-full flex-row items-center justify-between px-4 py-2",
                            "text-white text-shadow-lg group-hover:opacity-0",
                            "transition-opacity duration-100",
                        )}
                    >
                        <div className="text-xl font-bold">{product.name}</div>
                        <div className="text-lg">
                            {(((product.default_price as Stripe.Price).unit_amount as number) / 100).toFixed(2)}€
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
