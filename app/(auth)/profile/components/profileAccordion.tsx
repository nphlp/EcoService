import { Accordion, AccordionButton, AccordionContent } from "@comps/ui/accordion";
import ImageProfile from "@comps/ui/imageProfile";
import { BetterSessionServer } from "@lib/authServer";
import { CircleCheck, CircleX } from "lucide-react";

type ProfileAccordionProps = {
    session: NonNullable<BetterSessionServer>;
    index?: number;
};

export default function ProfileAccordion(props: ProfileAccordionProps) {
    const { session } = props;

    return (
        <Accordion>
            <AccordionButton>
                <div className="text-lg font-bold">Profil</div>
                <div className="text-xs text-gray-500">Consulter vos informations personnelles.</div>
            </AccordionButton>
            <AccordionContent>
                <div className="space-y-4">
                    <div className="flex flex-row items-center gap-5">
                        <ImageProfile
                            image={null}
                            name={session.user.name}
                            className="size-16"
                            classTemplate="stroke-[1.2px]"
                        />
                        <div>
                            <div className="text-md font-bold text-gray-700">
                                <span>{session.user.name}</span>
                                <span> </span>
                                <span>{session.user.lastname}</span>
                            </div>
                            <div className="line-clamp-1 flex flex-row items-center gap-1 text-sm text-gray-700">
                                <div>{session.user.email}</div>
                                <div>
                                    {session.user.emailVerified ? (
                                        <CircleCheck className="size-4 stroke-green-400" />
                                    ) : (
                                        <CircleX className="size-4 stroke-red-400" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
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
            </AccordionContent>
        </Accordion>
    );
}
