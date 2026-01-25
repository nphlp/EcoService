import { hasRole } from "@permissions/hasRole";
import { Metadata } from "next";
import { unauthorized } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import SidebarToggleButton from "../sidebarToggleButton";
import ContentCreationForm from "./contentCreationForm";

export const metadata: Metadata = {
    title: "Créer un contenu",
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

    const session = await hasRole(["EMPLOYEE", "ADMIN"]);
    if (!session) unauthorized();

    return (
        <div className="flex h-full flex-col">
            <SidebarToggleButton title={metadata.title as string} />
            <div className="flex flex-1 flex-col items-center py-8">
                <div className="flex w-full flex-col items-center justify-start">
                    <ContentCreationForm />
                </div>
            </div>
        </div>
    );
};
