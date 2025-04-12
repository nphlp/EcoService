"use client";

import Button from "@comps/ui/button";
import { combo } from "@lib/combo";
import { motion } from "framer-motion";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { createContext, ReactNode, useContext, useState } from "react";

// Types
type SideBarContextType = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

// Context
const SideBarContext = createContext<SideBarContextType>({} as SideBarContextType);

// Provider
const SideBarProvider = (props: { children: ReactNode }) => {
    const { children } = props;

    const [isOpen, setIsOpen] = useState(true);

    return <SideBarContext.Provider value={{ isOpen, setIsOpen }}>{children}</SideBarContext.Provider>;
};

// SideBar
const SideBar = (props: {width?: number, className?: string; children: ReactNode }) => {
    const { width = 250, className, children } = props;
    const { isOpen } = useContext(SideBarContext);
    return (
            <motion.div
                initial={{ width }}
                animate={{ width: isOpen ? width : 0 }}
                transition={{ duration: 0.3 }}
                className={combo(className)}
            >
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: isOpen ? 0 : -width }}
                    transition={{ duration: 0.3 }}
                    style={{ width }}
                    className={combo("h-full overflow-hidden", "border-r-1 border-gray-300", "space-y-4 p-5")}
                >
                    <div className="text-2xl font-bold text-center text-gray-700">Side Bar</div>
                    <div className="space-y-1">{children}</div>
                </motion.div>
            </motion.div>
    );
};

// Button
const SideBarButton = () => {
    const { isOpen, setIsOpen } = useContext(SideBarContext);
    return (
        <Button
            label="Ouvrir"
            variant="outline"
            className="p-1.5"
            baseStyleWithout={["padding", "font"]}
            onClick={() => setIsOpen(!isOpen)}
        >
            {isOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
        </Button>
    );
};

export { SideBar, SideBarProvider, SideBarButton };
