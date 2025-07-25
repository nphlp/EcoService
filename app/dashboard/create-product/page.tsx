import { hasRole } from "@permissions/hasRole";
import { CategoryFindManyServer } from "@services/server";
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
