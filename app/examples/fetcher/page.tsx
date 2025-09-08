import { FetchV3 } from "@utils/FetchV3/FetchV3";

export default async function Page() {
    const internalProduct = await FetchV3({
        route: "/internal/product/findMany",
        params: { take: 3 },
    });

    const stripeProduct = await FetchV3({
        route: "/stripe/products",
        params: { limit: 3 },
    });

    const internalProductNames = internalProduct.map((p) => p.name).join(", ");
    const stripeProductNames = stripeProduct.map((p) => p.name).join(", ");

    console.log({ internalProductNames, stripeProductNames });

    return (
        <div>
            <div>Internal DB: {internalProductNames}</div>
            <div>Stripe API: {stripeProductNames}</div>
        </div>
    );
}
