import ProductDisplay from "@app/(stripe)/products/ProductDisplay";
import { GetSession } from "@lib/auth";
import { Metadata } from "next";
import { unauthorized } from "next/navigation";

export const metadata: Metadata = {
    title: "EcoService - Produits",
    description: "Découvrez nos produits et services écologiques",
};

export default async function Page() {
    const session = await GetSession();

    if (!session) {
        unauthorized();
    }

    const response = await fetch("http://localhost:3000/api/stripe/products");

    const { data: stripeProductList } = await response.json();

    return (
        <main className="w-full">
            <ProductDisplay stripeProductList={stripeProductList} />
        </main>
    );
}
