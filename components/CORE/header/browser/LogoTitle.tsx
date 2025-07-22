"use client";

import Logo from "@comps/server/logo";
import Link from "@comps/ui/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function LogoTitle() {
    const [isHomeHovered, setIsHomeHovered] = useState(false);

    return (
        <motion.div onHoverStart={() => setIsHomeHovered(true)} onHoverEnd={() => setIsHomeHovered(false)}>
            <Link type="link" href="/" label="home" variant="none" baseStyleOnly={["flex"]}>
                <Logo className="size-9" />
                <span className="relative">
                    <div className="text-2xl font-semibold text-black uppercase">Circle</div>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: isHomeHovered ? "75%" : 0 }}
                        transition={{
                            duration: 0.3,
                            ease: "easeInOut",
                            type: "spring",
                        }}
                        className="absolute bottom-0 left-0.5 h-0.5 rounded bg-black"
                    />
                </span>
            </Link>
        </motion.div>
    );
}
