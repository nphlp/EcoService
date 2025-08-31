"use client";

import Button from "@comps/UI/button/button";
import Link from "@comps/UI/button/link";
import LogoutClient from "@comps/UI/logout";
import { useSession } from "@lib/authClient";
import { combo } from "@lib/combo";
import { Leaf } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useHeaderStore } from "../headerStore";

type MobileHeaderProps = {
    className?: string;
};

export default function MobileHeader(props: MobileHeaderProps) {
    const { className } = props;

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    return (
        <div className={className}>
            {/* Open menu */}
            <Button
                type="button"
                label="show-menu"
                variant="none"
                className={{
                    button: combo(
                        "absolute right-5 bottom-5 z-50 rounded-full border border-gray-500 bg-white p-3 shadow-md",
                        isMenuOpen && "hidden",
                    ),
                }}
                onClick={() => setIsMenuOpen(true)}
            >
                <Leaf />
            </Button>

            <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>
    );
}

type MenuProps = {
    isMenuOpen: boolean;
    setIsMenuOpen: (visible: boolean) => void;
};

const Menu = (props: MenuProps) => {
    const { isMenuOpen, setIsMenuOpen } = props;

    const { data: session } = useSession();
    const { basketOpen, setBasketOpen } = useHeaderStore();

    const buttonClass = "w-full py-2";
    const animationDuration = 0.3;

    return (
        <>
            {/* Background Blur */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    display: isMenuOpen ? "block" : "none",
                    opacity: isMenuOpen ? 1 : 0,
                    transition: { duration: animationDuration / 6 },
                }}
                className={combo("absolute inset-0 z-40 backdrop-blur-[1.5px]")}
            />

            {/* Background Color */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    display: isMenuOpen ? "block" : "none",
                    opacity: isMenuOpen ? 1 : 0,
                    transition: { duration: animationDuration / 2 },
                }}
                className={combo("absolute inset-0 z-40 bg-black/50")}
            />

            {/* Background Button */}
            <motion.button
                type="button"
                aria-label="close-menu"
                onClick={() => setIsMenuOpen(false)}
                className={combo("absolute inset-0 z-40", !isMenuOpen && "hidden")}
            />

            {/* Menu */}
            <nav className={combo("absolute bottom-0 left-0 z-50 w-full px-4 pb-4", !isMenuOpen && "hidden")}>
                <div className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-gray-300 bg-white p-4 shadow-md">
                    <Link
                        href="/"
                        label="home"
                        variant="outline"
                        className={buttonClass}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Accueil
                    </Link>
                    <Link
                        href="/catalog"
                        label="catalog"
                        variant="outline"
                        className={buttonClass}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Catalogue
                    </Link>
                    <Link
                        href="/article"
                        label="articles"
                        variant="outline"
                        className={buttonClass}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Articles
                    </Link>
                    <Link
                        href="/diy"
                        label="diy"
                        variant="outline"
                        className={buttonClass}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        DIY
                    </Link>
                    <Link
                        href="/examples"
                        label="examples"
                        variant="outline"
                        className={buttonClass}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Exemples
                    </Link>
                    {!session && (
                        <>
                            <Link
                                href="/auth"
                                label="auth"
                                variant="outline"
                                className={buttonClass}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Authentification
                            </Link>
                        </>
                    )}
                    {session && (
                        <>
                            <Link
                                href="/profile"
                                label="profile"
                                variant="outline"
                                className={buttonClass}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Profile
                            </Link>
                            <LogoutClient
                                variant="outline"
                                onClick={() => setIsMenuOpen(false)}
                                className={{ button: buttonClass }}
                            >
                                Déconnexion
                            </LogoutClient>
                        </>
                    )}
                    <Button
                        label="basket"
                        variant="outline"
                        className={{ button: buttonClass }}
                        onClick={() => {
                            setBasketOpen(!basketOpen);
                            setIsMenuOpen(false);
                        }}
                    >
                        Basket
                    </Button>
                    {/* Close button */}
                    <Button
                        className={{ button: buttonClass }}
                        type="button"
                        label="hide-menu"
                        variant="default"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Fermer
                    </Button>
                </div>
            </nav>
        </>
    );
};
