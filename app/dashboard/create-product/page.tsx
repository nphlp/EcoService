import { hasRole } from "@lib/checkRole";
import { FetchV2 } from "@utils/FetchV2/FetchV2";
import { Metadata } from "next";
import { unauthorized } from "next/navigation";
import { SideBarToggleTitle } from "../sideBar";
import ProductCreationForm from "./productCreationForm";

export const metadata: Metadata = {
    title: "Créer un produit",
};

export default async function Page() {
    const session = await hasRole(["VENDOR", "EMPLOYEE", "ADMIN"]);
    if (!session) unauthorized();

    const categoryList = await FetchV2({ route: "/category" });
    if (!categoryList) {
        throw new Error("Category list not found");
    }

    return (
        <div className="flex h-full flex-col">
            <SideBarToggleTitle title={metadata.title as string} />
            <div className="flex flex-1 flex-col items-center justify-center">
                <div className="flex w-full flex-col items-center justify-start">
                    <ProductCreationForm categoryList={categoryList} />
                </div>
            </div>
        </div>
    );
}
