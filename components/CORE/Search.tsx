"use client";

import Button from "@comps/ui/button";
import { combo } from "@lib/combo";
import { motion } from "framer-motion";
import { SearchIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { PortalContext } from "./Portal";
import { useHeaderStore } from "./header/headerStore";

const DURATION = 0.2;

export default function Search() {
    const { searchOpen } = useHeaderStore();

    const { setIsOpen, setSize, setContent } = useContext(PortalContext);

    useEffect(() => {
        let timeout: NodeJS.Timeout | undefined;

        if (searchOpen) {
            setIsOpen(true);
            setSize({ w: "100vw", h: "100vh" });
            setContent(<SearchContent />);
        } else {
            timeout = setTimeout(() => {
                setIsOpen(false);
                setSize({ w: 0, h: 0 });
                setContent(null);
            }, DURATION * 1000);
        }

        return () => clearTimeout(timeout);
    }, [searchOpen, setIsOpen, setSize, setContent]);

    return <></>;
}

const SearchContent = () => {
    const { searchOpen, setSearchOpen } = useHeaderStore();

    const [search, setSearch] = useState("");

    return (
        <div className="flex size-full items-center justify-center">
            {/* Background */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: searchOpen ? 0.2 : 0,
                    transition: { duration: DURATION },
                }}
                className="absolute size-full bg-black"
            />

            {/* Background close button */}
            <button type="button" onClick={() => setSearchOpen(false)} className="absolute size-full" />

            {/* Content */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: searchOpen ? 1 : 0 }}
                transition={{
                    duration: DURATION,
                    ease: "easeInOut",
                }}
                className="relative w-1/2 overflow-hidden rounded-xl border border-gray-300 bg-white opacity-100 shadow-[2px_2px_8px_rgba(0,0,0,0.2)]"
            >
                <div className="m-7 space-y-3">
                    <h3 className="text-2xl font-bold">Search</h3>
                    <form className="flex flex-row items-center justify-center gap-2">
                        <input
                            type="text"
                            placeholder="Produit, catégorie, article, DIY..."
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            className={combo(
                                "w-full rounded-lg border border-black/20 bg-white px-4 py-1.5",
                                "ring-0 outline-none focus:ring-2 focus:ring-teal-300",
                                "transition-all duration-150",
                            )}
                        />
                        <Button label="search" variant="outline" className="p-2" baseStyleOnly={["flex", "rounded"]}>
                            <SearchIcon />
                        </Button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};
