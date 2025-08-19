import Card from "@comps/server/card";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

type SectionCard = {
    title: string;
    description: string;
    badge: {
        Icon: LucideIcon;
        text: string;
    };
    children: ReactNode;
};

type SectionProps = {
    title: string;
    BadgeIcon: LucideIcon;
    badgeText: string;
    cards: SectionCard[];
};

export default function Section(props: SectionProps) {
    const { title, BadgeIcon, badgeText, cards } = props;

    return (
        <section className="space-y-2">
            <div className="flex items-center gap-4">
                <div className="text-2xl font-bold">{title}</div>
                <div className="flex w-fit flex-row items-center gap-2 rounded-full border border-gray-400 px-3 py-1.5">
                    <BadgeIcon className="size-4 text-gray-600" />
                    <div className="text-sm font-medium text-gray-600">{badgeText}</div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {cards.map((card, index) => (
                    <Content key={index} card={card} />
                ))}
            </div>
        </section>
    );
}

type ContentProps = {
    card: SectionCard;
};

const Content = (props: ContentProps) => {
    const { card } = props;
    const { title, badge, description, children } = card;
    const { Icon, text } = badge;

    return (
        <Card className="h-full w-[450px] space-y-4">
            <div className="flex items-center gap-4">
                <div className="text-2xl font-bold">{title}</div>
                <div className="mt-1 flex w-fit flex-row items-center gap-2">
                    <Icon className="size-5 text-gray-500" />
                    <div className="text-lg font-medium text-gray-500">{text}</div>
                </div>
            </div>
            <div className="text-sm text-gray-500">{description}</div>
            {children}
        </Card>
    );
};
