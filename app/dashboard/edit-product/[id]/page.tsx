import { hasRole } from "@permissions/hasRole";
import { CategoryFindManyServer } from "@services/server";
import { Metadata } from "next";
import { unauthorized } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import Stripe from "stripe";
import Solid from "@/solid/solid-fetch";
import SidebarToggleButton from "../../sidebarToggleButton";
import ProductEditForm from "./productEditForm";

export const metadata: Metadata = {
    title: "Éditer un produit",
};

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function Page(props: PageProps) {
    return (
        <Suspense>
            <SuspendedPage {...props} />
        </Suspense>
    );
}

const SuspendedPage = async (props: PageProps) => {
    await connection();

    const { params } = props;
    const { id } = await params;

    const session = await hasRole(["VENDOR", "EMPLOYEE", "ADMIN"]);
    if (!session) unauthorized();

    const stripeProduct = await Solid({
        route: "/stripe/products/select",
        params: { id },
    });

    const categoryList = await CategoryFindManyServer({
        select: {
            id: true,
            name: true,
        },
    });

    if (!categoryList) {
        throw new Error("Category list not found");
    }

    // Get current price
    const defaultPrice = stripeProduct.default_price as Stripe.Price | null;
    const currentPrice = defaultPrice?.unit_amount ? defaultPrice.unit_amount / 100 : 0;

    return (
        <div className="flex h-full flex-col">
            <SidebarToggleButton title={metadata.title as string} />
            <div className="flex flex-1 flex-col items-center justify-center">
                <div className="flex w-full flex-col items-center justify-start">
                    <ProductEditForm product={stripeProduct} currentPrice={currentPrice} categoryList={categoryList} />
                </div>
            </div>
        </div>
    );
};
