import Section from "@app/examples/search/section";
import { CornerRightDown, ListTodo, Shuffle, SquareCheckBig } from "lucide-react";
import { ReactNode } from "react";

type LayoutProps = {
    comboboxSingleSelectSingleSource: ReactNode;
    comboboxMultiSelectSingleSource: ReactNode;
    comboboxSingleSelectMultiSource: ReactNode;
    comboboxMultiSelectMultiSource: ReactNode;
    searchboxSingleSelectSingleSource: ReactNode;
    searchboxSingleSelectMultiSource: ReactNode;
    searchboxMultiSelectSingleSource: ReactNode;
    searchboxMultiSelectMultiSource: ReactNode;
};

export default function Layout(props: LayoutProps) {
    const {
        comboboxSingleSelectSingleSource,
        comboboxMultiSelectSingleSource,
        comboboxSingleSelectMultiSource,
        comboboxMultiSelectMultiSource,
        searchboxSingleSelectSingleSource,
        searchboxSingleSelectMultiSource,
        searchboxMultiSelectSingleSource,
        searchboxMultiSelectMultiSource,
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
                        children: comboboxSingleSelectSingleSource,
                    },
                    {
                        title: "Combobox",
                        description: "Sélectionner plusieurs éléments parmis un seul type d'élément.",
                        badge: { Icon: ListTodo, text: "Multi Select" },
                        children: comboboxMultiSelectSingleSource,
                    },
                ]}
            />

            <Section
                title="Liste fixe"
                BadgeIcon={Shuffle}
                badgeText="Multi Source"
                cards={[
                    {
                        title: "Multi Combobox",
                        description: "Sélectionner un seul élément parmis plusieurs types d'éléments.",
                        badge: { Icon: SquareCheckBig, text: "Single Select" },
                        children: comboboxSingleSelectMultiSource,
                    },
                    {
                        title: "Multi Combobox",
                        description: "Sélectionner plusieurs éléments parmis plusieurs types d'éléments.",
                        badge: { Icon: ListTodo, text: "Multi Select" },
                        children: comboboxMultiSelectMultiSource,
                    },
                ]}
            />

            <Section
                title="Liste dynamique"
                BadgeIcon={CornerRightDown}
                badgeText="Single Source"
                cards={[
                    {
                        title: "Searchbox",
                        description: "Rechercher et sélectionner un seul élément parmis un seul type d'élément.",
                        badge: { Icon: SquareCheckBig, text: "Single Select" },
                        children: searchboxSingleSelectSingleSource,
                    },
                    {
                        title: "Searchbox",
                        description: "Rechercher et sélectionner plusieurs éléments parmis un seul type d'élément.",
                        badge: { Icon: ListTodo, text: "Multi Select" },
                        children: searchboxMultiSelectSingleSource,
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
                        children: searchboxSingleSelectMultiSource,
                    },
                    {
                        title: "Multi Searchbox",
                        description: "Rechercher et sélectionner plusieurs éléments parmis plusieurs types d'éléments.",
                        badge: { Icon: ListTodo, text: "Multi Select" },
                        children: searchboxMultiSelectMultiSource,
                    },
                ]}
            />
        </div>
    );
}
