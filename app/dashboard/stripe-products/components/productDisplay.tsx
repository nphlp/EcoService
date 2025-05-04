"use client";

import { StripeProductsResponse } from "@app/api/stripe/products/route";
import ImageRatio from "@comps/server/imageRatio";
import Link from "@comps/ui/link";
import { combo } from "@lib/combo";
import Stripe from "stripe";

// TODO: make utils function
function getImageUrl(imageUrl: string) {
    if (imageUrl.includes("/v1/files/")) {
        const fileId = imageUrl.split("/").pop();
        return `https://files.stripe.com/links/${fileId}`;
    }
    return imageUrl;
}

type ProductDisplayProps = {
    stripeProductList: StripeProductsResponse;
};

export default function ProductDisplay(props: ProductDisplayProps) {
    const { stripeProductList } = props;

    return (
        <div className="grid grid-cols-1 gap-8 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {stripeProductList.map((product, index) => (
                <Link
                    key={index}
                    label={product.name}
                    baseStyleOnly={["rounded"]}
                    href={`https://dashboard.stripe.com/test/products/${product.id}`}
                    className="group relative"
                    target="_blank"
                >
                    <div className="w-full overflow-hidden rounded-lg">
                        <ImageRatio src={getImageUrl(product.images[0])} alt={product.name} />
                    </div>
                    <div
                        className={combo(
                            "opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                            "absolute top-0 size-full",
                            "flex items-center justify-center rounded-lg",
                            "bg-black/50 text-xl font-medium text-gray-100",
                        )}
                    >
                        Voir sur Stripe
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
                </Link>
            ))}
        </div>
    );
}
