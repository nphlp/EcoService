"use client";

import Link from "@comps/ui/link";
import { combo } from "@lib/combo";
import { usePathname } from "next/navigation";

export default function LinkList() {
    const path = usePathname();

    return (
        <>
            <Link
                label="Dashboard"
                variant="outline"
                className={combo("text-sm", path === "/dashboard" && "font-bold")}
                href="/dashboard"
            >
                Dashboard
            </Link>
            <Link
                label="Créer un produit"
                variant="outline"
                className={combo("text-sm", path === "/dashboard/create-product" && "font-bold")}
                href="/dashboard/create-product"
            >
                Créer un produit
            </Link>
            <Link
                label="Mes produits stripe"
                variant="outline"
                className={combo("text-sm", path === "/dashboard/stripe-products" && "font-bold")}
                href="/dashboard/stripe-products"
            >
                Mes produits stripe
            </Link>
            <Link
                label="Créer un vendeur"
                variant="outline"
                className={combo("text-sm", path === "/dashboard/create-vendor" && "font-bold")}
                href="/dashboard/create-vendor"
            >
                Créer un vendeur
            </Link>
        </>
    );
}
