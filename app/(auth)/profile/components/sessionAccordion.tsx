import Logout from "@comps/client/logout";
import { Accordion, AccordionButton, AccordionContent } from "@comps/ui/accordion";
import { BetterSessionListServer, BetterSessionServer, GetSessionList } from "@lib/auth";
import { Fetch } from "@utils/Fetch/Fetch";
import { FetchParallelized } from "@utils/Fetch/FetchParallelized";
import { LogOut } from "lucide-react";
import LocationMap from "./LocationMap";
import SessionManager, { SessionAndLocation } from "./sessionManager";
import { getBrowser, getOs, locationString } from "./utils";

export default async function SessionAccordion(props: { session: NonNullable<BetterSessionServer> }) {
    const { session } = props;

    const sessionList = await GetSessionList();

    const sessionListWithoutCurrentSession = sessionList.filter(
        (sessionFromList) => sessionFromList.token !== session.session.token,
    );

    return (
        <Accordion openByDefault={true}>
            <AccordionButton>
                <div className="text-lg font-bold">Sessions</div>
                <div className="text-xs text-gray-500">Gérer vos sessions actives.</div>
            </AccordionButton>
            <AccordionContent>
                <div className="space-y-5">
                    <CurrentSession session={session} />
                    <OtherSessions sessionList={sessionListWithoutCurrentSession} />
                </div>
            </AccordionContent>
        </Accordion>
    );
}

type CurrentSessionProps = {
    session: NonNullable<BetterSessionServer>;
};

const CurrentSession = async (props: CurrentSessionProps) => {
    const { session } = props;

    const userAgent = session.session.userAgent ?? "";
    const ipAddress = session.session.ipAddress ?? "";

    const location = ipAddress ? await Fetch({ route: "/external/location", params: { ipAddress } }) : null;

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
                        <div className="text-xxs line-clamp-1 text-gray-500">{locationString(location)}</div>
                    </div>
                </div>
                <Logout
                    variant="outline"
                    className="rounded-md px-3 py-1.5 text-xs"
                    baseStyleOnly={["flex", "outline"]}
                >
                    <span>Déconnexion</span>
                    <LogOut className="size-4" />
                </Logout>
            </div>
            <LocationMap location={location} />
        </div>
    );
};

type OtherSessionsProps = {
    sessionList: BetterSessionListServer;
};

const OtherSessions = async (props: OtherSessionsProps) => {
    const { sessionList } = props;

    const orderedSessionList = sessionList.sort(
        (a, b) => new Date(b.expiresAt).getTime() - new Date(a.expiresAt).getTime(),
    );

    const location = await FetchParallelized(
        orderedSessionList.map(({ ipAddress }) => ({
            route: "/external/location",
            params: { ipAddress: ipAddress ?? "" },
        })),
    );

    const sessionAndLocationList: SessionAndLocation[] = orderedSessionList.map((session, index) => ({
        session,
        location: location[index],
    }));

    return <SessionManager sessionAndLocationList={sessionAndLocationList} />;
};
