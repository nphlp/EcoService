import { AccordionGroup } from "@comps/ui/accordion";
import { GetSession } from "@lib/authServer";
import { unauthorized } from "next/navigation";
import EditionAccordion from "./components/editionAccordion";
import EmailConfirmModal from "./components/emailConfirmModal";
import ProfileAccordion from "./components/profileAccordion";
import SessionAccordion from "./components/sessionAccordion";
import OrdersAccordion from "./components/ordersAccordion";

export default async function Page() {
    const session = await GetSession();
    if (!session) unauthorized();

    return (
        <div className="flex w-full flex-1 flex-col justify-center overflow-y-auto border-t-1 border-gray-300 bg-gray-50 p-6">
            <AccordionGroup openByDefaultIndex={0}>
                <div className="flex min-h-full flex-col items-center justify-center">
                    <div className="flex w-full flex-col items-center space-y-5 sm:w-2/3 lg:w-1/2">
                        <EmailConfirmModal session={session} />
                        <OrdersAccordion session={session} />
                        <ProfileAccordion session={session} />
                        <SessionAccordion session={session} />
                        <EditionAccordion session={session} />
                    </div>
                </div>
            </AccordionGroup>
        </div>
    );
}
