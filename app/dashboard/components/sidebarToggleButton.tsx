"use client";

import Button from "@comps/UI/button/button";
import { combo } from "@lib/combo";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useSidebarStore } from "./sidebarStore";

type SidebarToggleProps = {
    title: string;
    className?: string;
};

export default function SidebarToggleButton(props: SidebarToggleProps) {
    const { title, className } = props;
    const { isOpen, setIsOpen } = useSidebarStore();
    return (
        <div className={combo("flex flex-row items-center gap-4", "px-4 pt-4 md:px-7 md:pt-5", className)}>
            <Button label="Ouvrir" variant="outline" className={{ button: "p-1.5" }} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
            </Button>
            <div className="text-2xl font-bold">{title}</div>
        </div>
    );
}
