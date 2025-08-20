"use client";

import Link from "@comps/UI/link";
import Modal from "@comps/UI/modal/modal";
import { combo } from "@lib/combo";
import { Hammer } from "lucide-react";
import { usePathname } from "next/navigation";
import { MouseEvent, useState } from "react";

export default function LinkList() {
    const path = usePathname();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDisabledLink = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    return (
        <>
            <Modal
                setIsModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
                className="flex w-1/2 items-center gap-5 py-6"
            >
                <Hammer className="size-18 stroke-[1.3px] text-gray-700" />
                <div className="space-y-2">
                    <h1 className="text-xl font-semibold">En cours de développement</h1>
                    <p>Ce lien n&apos;est pas encore actif car la page est en construction.</p>
                </div>
            </Modal>
            <Link
                label="Dashboard"
                variant="outline"
                className={combo("text-sm", path === "/dashboard" && "font-bold")}
                href="/dashboard"
            />
            <Link
                label="Créer un produit"
                variant="outline"
                className={combo("text-sm", path === "/dashboard/create-product" && "font-bold")}
                href="/dashboard/create-product"
            />
            <Link
                label="Produits stripe"
                variant="outline"
                className={combo("text-sm", path === "/dashboard/stripe-products" && "font-bold")}
                href="/dashboard/stripe-products"
            />
            <Link
                label="Créer un article"
                variant="outline"
                className={combo("text-sm", path === "/dashboard/create-article" && "font-bold")}
                href="/dashboard/create-article"
                onClick={handleDisabledLink}
            />
            <Link
                label="Créer un DIY"
                variant="outline"
                className={combo("text-sm", path === "/dashboard/create-diy" && "font-bold")}
                href="/dashboard/create-diy"
                onClick={handleDisabledLink}
            />
            <Link
                label="Créer un vendeur"
                variant="outline"
                className={combo("text-sm", path === "/dashboard/create-vendor" && "font-bold")}
                href="/dashboard/create-vendor"
            />
        </>
    );
}
