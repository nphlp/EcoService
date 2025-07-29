import Card from "@comps/server/card";
import { CornerRightDown, ListTodo, Shuffle, SquareCheckBig } from "lucide-react";
import { cloneElement, ReactNode } from "react";

type LayoutProps = {
    singleSelectSingleSource: ReactNode;
    singleSelectMultiSource: ReactNode;
    multiSelectSingleSource: ReactNode;
    multiSelectMultiSource: ReactNode;
};

export default function Layout(props: LayoutProps) {
    const { singleSelectSingleSource, singleSelectMultiSource, multiSelectSingleSource, multiSelectMultiSource } =
        props;

    return (
        <div className="mb-[300px] space-y-6 p-7">
            <div className="space-y-1">
                <div className="text-4xl font-bold">Search Comboboxes</div>
                <div className="text-sm text-gray-500">
                    This is a collection of search comboboxes with different configurations.
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <ComboCard
                    title="SSe-SSo"
                    description="Rechercher et sélectionner un seul élément parmis un seul type d'élément."
                    tagSelect="singleSelect"
                    tagSource="singleSource"
                >
                    {singleSelectSingleSource}
                </ComboCard>
                <ComboCard
                    title="SSe-MSo"
                    description="Rechercher et sélectionner un seul élément parmis plusieurs types d'éléments."
                    tagSelect="singleSelect"
                    tagSource="multiSource"
                >
                    {singleSelectMultiSource}
                </ComboCard>
                <ComboCard
                    title="MSe-SSo"
                    description="Rechercher et sélectionner plusieurs éléments parmis un seul type d'élément."
                    tagSelect="multiSelect"
                    tagSource="singleSource"
                >
                    {multiSelectSingleSource}
                </ComboCard>
                <ComboCard
                    title="MSe-MSo"
                    description="Rechercher et sélectionner plusieurs éléments parmis plusieurs types d'éléments."
                    tagSelect="multiSelect"
                    tagSource="multiSource"
                >
                    {multiSelectMultiSource}
                </ComboCard>
            </div>
        </div>
    );
}

type TagProps = {
    type: "singleSource" | "singleSelect" | "multiSource" | "multiSelect";
};

export const Tag = (props: TagProps) => {
    const { type } = props;

    const tagType = {
        singleSource: {
            name: "Single Source",
            icon: <CornerRightDown />,
        },
        singleSelect: {
            name: "Single Select",
            icon: <SquareCheckBig />,
        },
        multiSource: {
            name: "Multi Source",
            icon: <Shuffle />,
        },
        multiSelect: {
            name: "Multi Select",
            icon: <ListTodo />,
        },
    };

    return (
        <div className="flex w-fit flex-row items-center gap-2 rounded-full border border-gray-400 px-3 py-1.5">
            {cloneElement(tagType[type].icon, { className: "size-4 text-gray-600" })}
            <div className="text-sm font-medium text-gray-600">{tagType[type].name}</div>
        </div>
    );
};

type ComboCardProps = {
    title: string;
    description: string;
    tagSelect: "singleSelect" | "multiSelect";
    tagSource: "singleSource" | "multiSource";
    children: ReactNode;
};

export const ComboCard = (props: ComboCardProps) => {
    const { title, description, tagSelect, tagSource, children } = props;

    return (
        <Card className="h-full w-[450px]">
            <div className="text-2xl font-bold">{title}</div>
            <div className="mt-1 text-sm text-gray-500">{description}</div>
            <div className="mt-2.5 mb-6 flex gap-2">
                <Tag type={tagSelect} />
                <Tag type={tagSource} />
            </div>
            {children}
        </Card>
    );
};
