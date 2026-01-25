import { Accordion, AccordionButton, AccordionContent } from "@comps/UI/accordion";
import Logout from "@comps/UI/logout";
import { Session, SessionList, getSessionList } from "@lib/auth-server";
import { LogOut } from "lucide-react";
import ProfileInfo from "./profileInfo";
import SessionManager from "./sessionManager";
import { getBrowser, getOs } from "./utils";

type SessionAccordionProps = {
    session: NonNullable<Session>;
    index?: number;
};

export default async function SessionAccordion(props: SessionAccordionProps) {
    const { session } = props;

    const sessionList = await getSessionList();

    const sessionListWithoutCurrentSession = sessionList.filter(
        (sessionFromList) => sessionFromList.token !== session.session.token,
    );

    return (
        <Accordion>
            <AccordionButton>
                <div className="text-lg font-bold">Profile & Sessions</div>
                <div className="text-xs text-gray-500">
                    Consulter vos informations personnelles et gérer vos sessions actives.
                </div>
            </AccordionButton>
            <AccordionContent className="space-y-4">
                <div className="space-y-4">
                    <ProfileInfo session={session} />
                    <div className="flex flex-row items-center justify-between gap-2">
                        <div className="flex flex-1 flex-col gap-2">
                            <div className="text-xs font-bold text-gray-700">Expédiés</div>
                            <div className="text-xl text-gray-500">3</div>
                        </div>
                        <div className="flex flex-1 flex-col gap-2">
                            <div className="text-xs font-bold text-gray-700">En livraison</div>
                            <div className="text-xl text-gray-500">2</div>
                        </div>
                        <div className="flex flex-1 flex-col gap-2">
                            <div className="text-xs font-bold text-gray-700">Livrés</div>
                            <div className="text-xl text-gray-500">47</div>
                        </div>
                        <div className="flex flex-1 flex-col gap-2">
                            <div className="text-xs font-bold text-gray-700">Retournés</div>
                            <div className="text-xl text-gray-500">5</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-5">
                    <CurrentSession session={session} />
                    <OtherSessions sessionList={sessionListWithoutCurrentSession} />
                </div>
            </AccordionContent>
        </Accordion>
    );
}

type CurrentSessionProps = {
    session: NonNullable<Session>;
};

const CurrentSession = async (props: CurrentSessionProps) => {
    const { session } = props;

    const userAgent = session.session.userAgent ?? "";

    return (
        <div className="space-y-2 rounded-lg border border-gray-300 px-5 py-3">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-3">
                    <div className="min-h-2 min-w-2 rounded-full bg-green-500" />
                    <div>
                        <div className="line-clamp-1">
                            <span className="text-sm font-bold">Current Session</span>
                            <span className="text-xs text-gray-500"> • </span>
                            <span className="text-xs text-gray-500">{`${getBrowser(userAgent)}, ${getOs(userAgent)}`}</span>
                        </div>
                    </div>
                </div>
                <Logout variant="outline" className={{ button: "rounded-md px-3 py-1.5 text-xs" }}>
                    <span>Déconnexion</span>
                    <LogOut className="size-4" />
                </Logout>
            </div>
        </div>
    );
};

type OtherSessionsProps = {
    sessionList: SessionList;
};

const OtherSessions = async (props: OtherSessionsProps) => {
    const { sessionList } = props;

    const orderedSessionList = sessionList.sort(
        (a, b) => new Date(b.expiresAt).getTime() - new Date(a.expiresAt).getTime(),
    );

    return <SessionManager sessionList={orderedSessionList} />;
};
