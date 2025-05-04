import { GetSession } from "@lib/auth";
import { Fetch } from "@utils/Fetch/Fetch";
import { Metadata } from "next";
import { unauthorized } from "next/navigation";
import ProductDisplay from "./components/productDisplay";
import { SideBarToggleTitle } from "../sideBar";

export const metadata: Metadata = {
    title: "Mes produits Stripe",
};

export default async function Page() {
    const session = await GetSession();

    if (!session) {
        unauthorized();
    }

    const stripeProductList = await Fetch({ route: "/stripe/products" });

    return (
        <main className="w-full">
            <SideBarToggleTitle title={metadata.title as string} />
            <ProductDisplay stripeProductList={stripeProductList} />
        </main>
    );
}
