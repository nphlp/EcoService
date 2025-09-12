import { hasRole } from "@permissions/hasRole";
import { FetchV3 } from "@utils/FetchV3/FetchV3";
import { Metadata } from "next";
import { unauthorized } from "next/navigation";
import SidebarToggleButton from "../sidebarToggleButton";
import ProductDisplay from "./components/productDisplay";

export const metadata: Metadata = {
    title: "Mes produits Stripe",
};

export default async function Page() {
    const session = await hasRole(["VENDOR", "EMPLOYEE", "ADMIN"]);
    if (!session) unauthorized();

    const stripeProductList = await FetchV3({ route: "/stripe/products" });

    return (
        <main className="w-full">
            <SidebarToggleButton title={metadata.title as string} />
            <ProductDisplay stripeProductList={stripeProductList} />
        </main>
    );
}
