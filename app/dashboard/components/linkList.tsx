"use client";

import Link from "@comps/UI/button/link";
// import Modal from "@comps/UI/modal/modal";
import { combo } from "@lib/combo";
// import { Hammer } from "lucide-react";
import { CreditCard, FilePlus, LayoutDashboard, PackagePlus } from "lucide-react";
// import { Route } from "next";
import { usePathname } from "next/navigation";
import { useSidebarStore } from "./sidebarStore";

export default function LinkList() {
    const path = usePathname();
    const { setIsOpen } = useSidebarStore();

    const closeSidebarOnMobile = () => {
        if (window.innerWidth < 768) {
            setIsOpen(false);
        }
    };

    return (
        <div className="space-y-2 md:space-y-1">
            <Link
                label="Dashboard"
                variant="outline"
                className={combo(
                    "flex w-full items-center justify-start gap-3 py-4 text-base md:gap-2 md:py-2 md:text-sm",
                    path === "/dashboard" && "font-bold",
                )}
                href="/dashboard"
                onClick={closeSidebarOnMobile}
            >
                <LayoutDashboard className="size-5 md:size-4" />
                Dashboard
            </Link>
            <Link
                label="Créer un produit"
                variant="outline"
                className={combo(
                    "flex w-full items-center justify-start gap-3 py-4 text-base md:gap-2 md:py-2 md:text-sm",
                    path === "/dashboard/create-product" && "font-bold",
                )}
                href="/dashboard/create-product"
                onClick={closeSidebarOnMobile}
            >
                <PackagePlus className="size-5 md:size-4" />
                Créer un produit
            </Link>
            <Link
                label="Créer un contenu"
                variant="outline"
                className={combo(
                    "flex w-full items-center justify-start gap-3 py-4 text-base md:gap-2 md:py-2 md:text-sm",
                    path === "/dashboard/create-content" && "font-bold",
                )}
                href="/dashboard/create-content"
                onClick={closeSidebarOnMobile}
            >
                <FilePlus className="size-5 md:size-4" />
                Créer un contenu
            </Link>
            <Link
                label="Produits stripe"
                variant="outline"
                className={combo(
                    "flex w-full items-center justify-start gap-3 py-4 text-base md:gap-2 md:py-2 md:text-sm",
                    path === "/dashboard/stripe-products" && "font-bold",
                )}
                href="/dashboard/stripe-products"
                onClick={closeSidebarOnMobile}
            >
                <CreditCard className="size-5 md:size-4" />
                Produits Stripe
            </Link>
        </div>
    );
}
