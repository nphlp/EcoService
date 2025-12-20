import { AccordionGroup } from "@comps/UI/accordion";
import { getSession } from "@lib/auth-server";
import { unauthorized } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import EditionAccordion from "./components/editionAccordion";
import EmailConfirmModal from "./components/emailConfirmModal";
import OrdersAccordion from "./components/ordersAccordion";
import ProfileAccordion from "./components/profileAccordion";
import SessionAccordion from "./components/sessionAccordion";

export default async function Page() {
    return (
        <Suspense>
            <SuspendedPage />
        </Suspense>
    );
}

const SuspendedPage = async () => {
    await connection();

    const session = await getSession();
    if (!session) unauthorized();

    return (
        <div className="flex w-full flex-1 flex-col justify-center overflow-y-auto border-t border-gray-300 bg-gray-50 p-6">
            <EmailConfirmModal session={session} />
            <AccordionGroup openByDefaultIndex={1}>
                <div className="flex min-h-full flex-col items-center justify-center">
                    <div className="flex w-full flex-col items-center space-y-5 sm:w-2/3 lg:w-1/2">
                        <OrdersAccordion session={session} />
                        <ProfileAccordion session={session} />
                        <SessionAccordion session={session} />
                        <EditionAccordion session={session} />
                    </div>
                </div>
            </AccordionGroup>
        </div>
    );
};
