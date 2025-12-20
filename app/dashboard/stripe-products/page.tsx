import { hasRole } from "@permissions/hasRole";
import { Metadata } from "next";
import { unauthorized } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import Solid from "@/solid/solid-fetch";
import SidebarToggleButton from "../sidebarToggleButton";
import ProductDisplay from "./components/productDisplay";

export const metadata: Metadata = {
    title: "Mes produits Stripe",
};

export default async function Page() {
    return (
        <Suspense>
            <SuspendedPage />
        </Suspense>
    );
}

const SuspendedPage = async () => {
    await connection();

    const session = await hasRole(["VENDOR", "EMPLOYEE", "ADMIN"]);
    if (!session) unauthorized();

    const stripeProductList = await Solid({ route: "/stripe/products" });

    return (
        <main className="w-full">
            <SidebarToggleButton title={metadata.title as string} />
            <ProductDisplay stripeProductList={stripeProductList} />
        </main>
    );
};
