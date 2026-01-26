import { combo } from "@lib/combo";
import { hasRole } from "@permissions/hasRole";
import { CategoryFindManyServer } from "@services/server";
import { Metadata } from "next";
import { unauthorized } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import SidebarToggleButton from "../components/sidebarToggleButton";
import ProductCreationForm from "./productCreationForm";

export const metadata: Metadata = {
    title: "Créer un produit",
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

    const categoryList = await CategoryFindManyServer({
        select: {
            id: true,
            name: true,
        },
    });
    if (!categoryList) {
        throw new Error("Category list not found");
    }

    return (
        <>
            <SidebarToggleButton title={metadata.title as string} />
            <div className="flex flex-1 flex-col items-center justify-center">
                <div className={combo("flex w-full flex-col items-center justify-start", "px-4 py-4 md:px-7")}>
                    <ProductCreationForm categoryList={categoryList} />
                </div>
            </div>
        </>
    );
};
