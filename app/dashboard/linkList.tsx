"use client";

import Link from "@comps/UI/button/link";
// import Modal from "@comps/UI/modal/modal";
import { combo } from "@lib/combo";
// import { Hammer } from "lucide-react";
import { CreditCard, FilePlus, LayoutDashboard, PackagePlus } from "lucide-react";
// import { Route } from "next";
import { usePathname } from "next/navigation";

// import { MouseEvent, useState } from "react";

export default function LinkList() {
    const path = usePathname();

    // const [isModalOpen, setIsModalOpen] = useState(false);

    // const handleDisabledLink = (e: MouseEvent<HTMLAnchorElement>) => {
    //     e.preventDefault();
    //     setIsModalOpen(true);
    // };

    return (
        <div className="space-y-1">
            {/* <Modal
                setIsModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
                className={{ card: "flex flex-col items-center gap-4 py-8" }}
                withCross
            >
                <Hammer className="size-18 stroke-[1.3px] text-gray-700" />
                <div className="space-y-2 text-center">
                    <h1 className="text-xl font-semibold">En cours de développement</h1>
                    <p>Ce lien n&apos;est pas encore actif car la page est en construction.</p>
                </div>
            </Modal> */}

            <Link
                label="Dashboard"
                variant="outline"
                className={combo(
                    "flex w-full items-center justify-start gap-2 text-sm",
                    path === "/dashboard" && "font-bold",
                )}
                href="/dashboard"
            >
                <LayoutDashboard className="size-4" />
                Dashboard
            </Link>
            <Link
                label="Créer un produit"
                variant="outline"
                className={combo(
                    "flex w-full items-center justify-start gap-2 text-sm",
                    path === "/dashboard/create-product" && "font-bold",
                )}
                href="/dashboard/create-product"
            >
                <PackagePlus className="size-4" />
                Créer un produit
            </Link>
            <Link
                label="Créer un contenu"
                variant="outline"
                className={combo(
                    "flex w-full items-center justify-start gap-2 text-sm",
                    path === "/dashboard/create-content" && "font-bold",
                )}
                href="/dashboard/create-content"
            >
                <FilePlus className="size-4" />
                Créer un contenu
            </Link>
            <Link
                label="Produits stripe"
                variant="outline"
                className={combo(
                    "flex w-full items-center justify-start gap-2 text-sm",
                    path === "/dashboard/stripe-products" && "font-bold",
                )}
                href="/dashboard/stripe-products"
            >
                <CreditCard className="size-4" />
                Produits Stripe
            </Link>
            {/* <Link
                label="Créer un vendeur"
                variant="outline"
                className={combo("w-full text-sm", path === "/dashboard/create-vendor" && "font-bold")}
                href={"/dashboard/create-vendor" as Route}
                onClick={handleDisabledLink}
            /> */}
        </div>
    );
}
