import ProductDisplay from "./components/productDisplay";
import { GetSession } from "@lib/auth";
import { Fetch } from "@utils/Fetch/Fetch";
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

    const stripeProductList = await Fetch({ route: "/stripe/products" });

    return (
        <main className="w-full">
            <ProductDisplay stripeProductList={stripeProductList} />
        </main>
    );
}
