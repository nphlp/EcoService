import { GetSession } from "@lib/auth";
import { unauthorized } from "next/navigation";
import EditionAccordion from "./components/editionAccordion";
import EmailConfirmModal from "./components/emailConfirmModal";
import ProfileAccordion from "./components/profileAccordion";
import SessionAccordion from "./components/sessionAccordion";

export default async function Page() {
    const session = await GetSession();
    if (!session) {
        unauthorized();
    }

    return (
        <div className="h-full overflow-y-auto border-t-1 border-gray-300 bg-gray-50 p-6">
            <div className="flex min-h-full flex-col items-center justify-center">
                <div className="flex flex-col items-center space-y-5 w-full sm:w-2/3 lg:w-1/2">
                    <EmailConfirmModal session={session} />
                    <ProfileAccordion session={session} />
                    <SessionAccordion session={session} />
                    <EditionAccordion session={session} />
                </div>
            </div>
        </div>
    );
}
