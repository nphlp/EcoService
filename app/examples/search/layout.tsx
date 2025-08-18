import Section from "@app/examples/search/section";
import { CornerRightDown, ListTodo, Shuffle, SquareCheckBig } from "lucide-react";
import { ReactNode } from "react";

type LayoutProps = {
    singleCombo: ReactNode;
    multiCombo: ReactNode;
    singleSelectSingleSource: ReactNode;
    singleSelectMultiSource: ReactNode;
    multiSelectSingleSource: ReactNode;
    multiSelectMultiSource: ReactNode;
};

export default function Layout(props: LayoutProps) {
    const {
        singleCombo,
        multiCombo,
        singleSelectSingleSource,
        singleSelectMultiSource,
        multiSelectSingleSource,
        multiSelectMultiSource,
    } = props;

    return (
        <div className="mb-[300px] space-y-8 p-7">
            <div className="space-y-1">
                <div className="text-4xl font-bold">Search Comboboxes</div>
                <div className="text-sm text-gray-500">
                    This is a collection of search comboboxes with different configurations.
                </div>
            </div>

            <Section
                title="Liste fixe"
                BadgeIcon={CornerRightDown}
                badgeText="Single Source"
                cards={[
                    {
                        title: "Combobox",
                        description: "Sélectionner un seul élément parmis un seul type d'élément.",
                        badge: { Icon: SquareCheckBig, text: "Single Select" },
                        children: singleCombo,
                    },
                    {
                        title: "Combobox",
                        description: "Sélectionner plusieurs éléments parmis un seul type d'élément.",
                        badge: { Icon: ListTodo, text: "Multi Select" },
                        children: multiCombo,
                    },
                ]}
            />

            {/* <Section
                title="Liste fixe"
                BadgeIcon={Shuffle}
                badgeText="Multi Source"
                cards={[
                    {
                        title: "Multi Combobox",
                        description: "Sélectionner un seul élément parmis plusieurs types d'éléments.",
                        badge: { Icon: SquareCheckBig, text: "Single Select" },
                        // children: singleCombo,
                    },
                    {
                        title: "Multi Combobox",
                        description: "Sélectionner plusieurs éléments parmis plusieurs types d'éléments.",
                        badge: { Icon: ListTodo, text: "Multi Select" },
                        // children: multiCombo,
                    },
                ]}
            /> */}

            <Section
                title="Liste dynamique"
                BadgeIcon={CornerRightDown}
                badgeText="Single Source"
                cards={[
                    {
                        title: "Searchbox",
                        description: "Rechercher et sélectionner un seul élément parmis un seul type d'élément.",
                        badge: { Icon: SquareCheckBig, text: "Single Select" },
                        children: singleSelectSingleSource,
                    },
                    {
                        title: "Searchbox",
                        description: "Rechercher et sélectionner plusieurs éléments parmis un seul type d'élément.",
                        badge: { Icon: ListTodo, text: "Multi Select" },
                        children: multiSelectSingleSource,
                    },
                ]}
            />

            <Section
                title="Liste dynamique"
                BadgeIcon={Shuffle}
                badgeText="Multi Source"
                cards={[
                    {
                        title: "Multi Searchbox",
                        description: "Rechercher et sélectionner un seul élément parmis plusieurs types d'éléments.",
                        badge: { Icon: SquareCheckBig, text: "Single Select" },
                        children: singleSelectMultiSource,
                    },
                    {
                        title: "Multi Searchbox",
                        description: "Rechercher et sélectionner plusieurs éléments parmis plusieurs types d'éléments.",
                        badge: { Icon: ListTodo, text: "Multi Select" },
                        children: multiSelectMultiSource,
                    },
                ]}
            />
        </div>
    );
}
