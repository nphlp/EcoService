import Pagination from "@comps/SHARED/PaginationFilter";
import { hasRole } from "@permissions/hasRole";
import { Metadata } from "next";
import { unauthorized } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import Solid from "@/solid/solid-fetch";
import SidebarToggleButton from "../sidebarToggleButton";
import { Context } from "./components/context";
import ProductDisplay from "./components/productDisplay";
import Provider from "./components/provider";

export const metadata: Metadata = {
    title: "Mes produits Stripe",
};

const ITEMS_PER_PAGE = 12;

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
        <Provider itemsAmount={stripeProductList.length}>
            <main className="flex w-full flex-1 flex-col">
                <SidebarToggleButton title={metadata.title as string} />
                <Suspense>
                    <div className="flex-1">
                        <ProductDisplay stripeProductList={stripeProductList} take={ITEMS_PER_PAGE} />
                    </div>
                    <Pagination
                        path="/dashboard/stripe-products"
                        context={Context}
                        takeOverride={ITEMS_PER_PAGE}
                        className="pb-6"
                    />
                </Suspense>
            </main>
        </Provider>
    );
};
