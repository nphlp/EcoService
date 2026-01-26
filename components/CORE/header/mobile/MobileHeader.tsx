"use client";

import { useBasketStore } from "@comps/CORE/basket/basketStore";
import Button from "@comps/UI/button/button";
import Link from "@comps/UI/button/link";
import LogoutClient from "@comps/UI/logout";
import { useSession } from "@lib/auth-client";
import { combo } from "@lib/combo";
import { BookOpen, Home, Leaf, LogIn, LogOut, Search, ShoppingBag, ShoppingCart, User, Wrench } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useHeaderStore } from "../headerStore";

type MobileHeaderProps = {
    className?: string;
};

export default function MobileHeader(props: MobileHeaderProps) {
    const { className } = props;

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    return (
        <header className={className}>
            {/* Open menu */}
            <Button
                type="button"
                label="show-menu"
                variant="none"
                className={{
                    button: combo(
                        "fixed right-5 bottom-5 z-50 rounded-full border border-gray-500 bg-white p-3 shadow-md",
                        isMenuOpen && "hidden",
                    ),
                }}
                onClick={() => setIsMenuOpen(true)}
            >
                <Leaf />
            </Button>

            <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </header>
    );
}

type MenuProps = {
    isMenuOpen: boolean;
    setIsMenuOpen: (visible: boolean) => void;
};

const Menu = (props: MenuProps) => {
    const { isMenuOpen, setIsMenuOpen } = props;

    const { data: session } = useSession();
    const { basket } = useBasketStore();
    const { basketOpen, setBasketOpen, searchOpen, setSearchOpen } = useHeaderStore();

    const buttonClass = "w-full py-3 justify-start gap-3";
    const iconButtonClass = "py-3 gap-2";
    const animationDuration = 0.3;

    return (
        <AnimatePresence>
            {isMenuOpen && (
                <>
                    {/* Background Blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: animationDuration / 6 }}
                        className="fixed inset-0 z-40 backdrop-blur-[1.5px]"
                    />

                    {/* Background Color */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: animationDuration / 2 }}
                        className="fixed inset-0 z-40 bg-black/50"
                    />

                    {/* Background Button */}
                    <motion.button
                        type="button"
                        aria-label="close-menu"
                        onClick={() => setIsMenuOpen(false)}
                        className="fixed inset-0 z-40"
                    />

                    {/* Menu */}
                    <motion.div
                        initial={{ y: 16, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 16, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed bottom-0 left-0 z-50 w-full px-4 pb-4"
                    >
                        <nav className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-gray-300 bg-white p-4 shadow-md">
                            {/* Search & Basket row */}
                            <div className="flex w-full gap-2">
                                <Button
                                    label="search"
                                    variant="outline"
                                    className={{ button: combo(iconButtonClass, "flex-1") }}
                                    onClick={() => {
                                        setSearchOpen(!searchOpen);
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    <Search size={20} />
                                    Rechercher
                                </Button>
                                <Button
                                    label="basket"
                                    variant="outline"
                                    className={{ button: combo(iconButtonClass, "relative min-[340px]:flex-1") }}
                                    onClick={() => {
                                        setBasketOpen(!basketOpen);
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    <ShoppingCart size={20} />
                                    <span className="max-[340px]:hidden">Panier</span>
                                    {(basket?.items.length ?? 0) > 0 && (
                                        <span className="absolute -top-2 -right-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                                            {basket?.items.length}
                                        </span>
                                    )}
                                </Button>
                            </div>

                            {/* Navigation links */}
                            <Link
                                href="/"
                                label="home"
                                variant="outline"
                                className={buttonClass}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Home size={20} />
                                Accueil
                            </Link>
                            <Link
                                href="/catalog"
                                label="catalog"
                                variant="outline"
                                className={buttonClass}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <ShoppingBag size={20} />
                                Catalogue
                            </Link>
                            <Link
                                href="/article"
                                label="articles"
                                variant="outline"
                                className={buttonClass}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <BookOpen size={20} />
                                Articles
                            </Link>
                            <Link
                                href="/diy"
                                label="diy"
                                variant="outline"
                                className={buttonClass}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Wrench size={20} />
                                DIY
                            </Link>

                            {/* Auth buttons row (not logged in) */}
                            {!session && (
                                <div className="flex w-full gap-2">
                                    <Link
                                        href="/auth"
                                        label="login"
                                        className={combo(iconButtonClass, "flex-1")}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <LogIn size={20} />
                                        Connexion
                                    </Link>
                                </div>
                            )}

                            {/* Profile & Logout (logged in) */}
                            {session && (
                                <div className="flex w-full gap-2">
                                    <Link
                                        href="/profile"
                                        label="profile"
                                        className={combo(iconButtonClass, "flex-1")}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <User size={20} />
                                        Profil
                                    </Link>
                                    <LogoutClient
                                        variant="outline"
                                        onClick={() => setIsMenuOpen(false)}
                                        className={{ button: combo(iconButtonClass, "min-[380px]:flex-1") }}
                                    >
                                        <LogOut size={20} />
                                        <span className="max-[380px]:hidden">Déconnexion</span>
                                    </LogoutClient>
                                </div>
                            )}
                        </nav>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
