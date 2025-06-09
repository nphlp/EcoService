import { hasRole } from "@lib/checkRole";
import { Fetch } from "@utils/Fetch/Fetch";
import { Metadata } from "next";
import { unauthorized } from "next/navigation";
import { SideBarToggleTitle } from "../sideBar";
import ProductDisplay from "./components/productDisplay";

export const metadata: Metadata = {
    title: "Mes produits Stripe",
};

export default async function Page() {
    const session = await hasRole(["VENDOR", "EMPLOYEE", "ADMIN"]);
    if (!session) unauthorized();

    const stripeProductList = await Fetch({ route: "/stripe/products" });

    return (
        <main className="w-full">
            <SideBarToggleTitle title={metadata.title as string} />
            <ProductDisplay stripeProductList={stripeProductList} />
        </main>
    );
}
