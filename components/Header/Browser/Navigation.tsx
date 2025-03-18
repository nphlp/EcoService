"use client";

import { useBasketStore } from "@comps/Basket/BasketStore";
import LogoutClient from "@comps/client/Logout";
import Logo from "@comps/server/Logo";
import { useSession } from "@lib/authClient";
import { combo } from "@lib/combo";
import { motion } from "framer-motion";
import { ChevronUp, LogOut, Search, ShoppingCart, Store, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ButtonClient from "../../client/Button";
import { useHeaderStore } from "../HeaderStore";

export default function Navigation() {
    return (
        <nav className="flex flex-row items-center justify-between gap-5 px-5 py-3">
            <LeftNav />
            <CentralNav />
            <RightNav />
        </nav>
    );
}

const LeftNav = () => {
    const path = usePathname();
    const [isHomeHovered, setIsHomeHovered] = useState(false);

    return (
        <motion.div onHoverStart={() => setIsHomeHovered(true)} onHoverEnd={() => setIsHomeHovered(false)}>
            <ButtonClient
                type="link"
                // pageTransition={true}
                href="/"
                label="home"
                padding="none"
                variant="none"
                className={combo(path === "/" && "font-bold")}
            >
                <Logo className="size-9" />
                <span className="relative">
                    <div className="text-2xl font-semibold uppercase">Circle</div>
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
            </ButtonClient>
        </motion.div>
    );
};

const CentralNav = () => {
    const path = usePathname();
    const { setCategorieOpen, categorieOpen, setSearchOpen, setBasketOpen } = useHeaderStore();

    return (
        <div className="flex flex-row items-center justify-center gap-5">
            <ButtonClient
                type="button"
                label="catalog"
                variant="ghost"
                onClick={() => {
                    setCategorieOpen(!categorieOpen);
                    setSearchOpen(false);
                    setBasketOpen(false);
                }}
                className={combo(path === "/catalog" && "font-bold")}
            >
                <span>Catalogue</span>
                <motion.span
                    initial={{ rotate: 0 }}
                    animate={{ rotate: categorieOpen ? -180 : 0 }}
                    transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                    }}
                >
                    <ChevronUp className="text-gray-700" />
                </motion.span>
            </ButtonClient>
            <ButtonClient
                type="link"
                href="/article"
                label="article"
                variant="ghost"
                className={combo("px-8", path === "/article" && "font-bold")}
            >
                Articles
            </ButtonClient>
            <ButtonClient
                type="link"
                href="/do-it-yourself"
                label="do-it-yourself"
                variant="ghost"
                className={combo("px-8", path === "/do-it-yourself" && "font-bold")}
            >
                Do It Yourself
            </ButtonClient>
        </div>
    );
};

const RightNav = () => {
    const { setSearchOpen, setCategorieOpen, searchOpen, basketOpen, setBasketOpen } = useHeaderStore();
    const { basketProductList } = useBasketStore();
    const { data: session } = useSession();

    const role = session?.user.role;

    return (
        <div className="flex flex-row gap-3">
            {/* Search button */}
            <ButtonClient
                type="button"
                label="toggle-search-section-visibility"
                variant="ghost"
                className="p-2"
                onClick={() => {
                    setSearchOpen(!searchOpen);
                    setCategorieOpen(false);
                    setBasketOpen(false);
                }}
            >
                <Search />
            </ButtonClient>

            {/* Account button */}
            {session ? (
                <ButtonClient
                    type="link"
                    href="/profile"
                    label="profile"
                    variant="ghost"
                    className="p-2"
                    onClick={() => {
                        setSearchOpen(false);
                        setCategorieOpen(false);
                        setBasketOpen(false);
                    }}
                >
                    <UserRound />
                </ButtonClient>
            ) : (
                <ButtonClient
                    type="link"
                    href="/auth"
                    label="auth"
                    variant="ghost"
                    className="p-2"
                    onClick={() => {
                        setSearchOpen(false);
                        setCategorieOpen(false);
                        setBasketOpen(false);
                    }}
                >
                    <UserRound />
                </ButtonClient>
            )}

            {/* Dashboard button */}
            {(role === "ADMIN" ||
                role === "EMPLOYEE" ||
                role === "VENDOR") && (
                    <ButtonClient
                        type="link"
                        href="/dashboard"
                        label="dashboard"
                        variant="ghost"
                        className="p-2"
                        onClick={() => {
                            setSearchOpen(false);
                            setCategorieOpen(false);
                            setBasketOpen(false);
                        }}
                    >
                        <Store />
                    </ButtonClient>
                )}

            {/* Basket button */}
            <ButtonClient
                type="button"
                label="toggle-basket-section-visibility"
                variant="ghost"
                className="relative p-2"
                onClick={() => {
                    setSearchOpen(false);
                    setCategorieOpen(false);
                    setBasketOpen(!basketOpen);
                }}
            >
                <div className="absolute translate-x-[40%] translate-y-[-35%] scale-[0.7] rounded-full bg-black px-[7px] font-bold text-white">
                    {basketProductList.length}
                </div>
                <ShoppingCart />
            </ButtonClient>

            {/* Logout button */}
            {session && (
                <LogoutClient
                    variant="ghost"
                    className="p-2"
                    onClick={() => {
                        setSearchOpen(false);
                        setCategorieOpen(false);
                        setBasketOpen(false);
                    }}
                >
                    <LogOut />
                </LogoutClient>
            )}
        </div>
    );
};
