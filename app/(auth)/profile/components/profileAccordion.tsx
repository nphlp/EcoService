import { Accordion, AccordionButton, AccordionContent } from "@comps/ui/accordion";
import { BetterSessionServer } from "@lib/authServer";
import ProfileInfo from "./profileInfo";

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
            </AccordionContent>
        </Accordion>
    );
}
