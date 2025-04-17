import LogoutClient from "@comps/client/logout";
import Card from "@comps/server/card";
import { Accordion, AccordionButton, AccordionContent } from "@comps/ui/accordion";
import { GetSession } from "@lib/auth";
import { CircleCheck, CircleX, LogOut } from "lucide-react";
import { unauthorized } from "next/navigation";
import ProfileClient from "./client";
import { BetterSessionClient } from "@lib/authClient";

export default async function Page() {
    const session = await GetSession();
    if (!session) {
        unauthorized();
    }

    return (
        <div className="h-full overflow-y-auto border-t-1 border-gray-300 bg-gray-50 p-6">
            <div className="flex min-h-full flex-col items-center justify-center">
                <div className="flex flex-col items-center space-y-5 w-full sm:w-2/3 lg:w-1/2">
                    <ProfileAccordion session={session} />
                    <SessionAccordion session={session} />
                    <ProfileClient />
                </div>
            </div>
        </div>
    );
}

const ProfileAccordion = (props: { session: NonNullable<BetterSessionClient> }) => {
    const { session } = props;

    const expirationDate = new Date(session.session.expiresAt);
    const expirationFormatted = expirationDate.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }).replace(":", "h");

    return <Accordion>
    <AccordionButton>
        <div className="text-lg font-bold">Profil</div>
        <div className="text-xs text-gray-500">Consulter vos informations personnelles.</div>
    </AccordionButton>
    <AccordionContent>
        <div className="space-y-2">
            <div>
                <div className="text-xs font-bold">Nom</div>
                <div className="text-sm text-gray-700">{session.user.name}</div>
            </div>
            <div>
                <div className="text-xs font-bold">Email</div>
                <div className="line-clamp-1 text-sm text-gray-700">{session.user.email}</div>
            </div>
            <div>
                <div className="text-xs font-bold">Vérifié</div>
                <div className="flex flex-row items-center gap-1 text-sm text-gray-700">
                    {session.user.emailVerified ? (
                        <>
                            <CircleCheck className="size-4 stroke-green-400" />
                            <span className="font-bold text-green-400">Oui</span>
                        </>
                    ) : (
                        <>
                            <CircleX className="size-4 stroke-red-400" />
                            <span className="font-bold text-red-400">Non</span>
                        </>
                    )}
                </div>
            </div>
            <div>
                <div className="text-xs font-bold">Image</div>
                <div className="text-sm text-gray-700">{session.user.image ?? "null"}</div>
            </div>
            <div>
                <div className="text-xs font-bold">Session</div>
                <div className="text-sm text-gray-700">Expire à {expirationFormatted}</div>
            </div>
        </div>
    </AccordionContent>
</Accordion>
}

const SessionAccordion = (props: { session: NonNullable<BetterSessionClient> }) => {
    const { session } = props;

    return <Accordion>
        <AccordionButton>
            <div className="text-lg font-bold">Session</div>
            <div className="text-xs text-gray-500">Consulter vos informations personnelles.</div>
        </AccordionButton>
        <AccordionContent>
            <div className="space-y-2">
                <div>
                    <div className="text-xs font-bold">Session</div>
                </div>
            </div>
        </AccordionContent>
    </Accordion>
}
