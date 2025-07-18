"use client";

import { useBasketStore } from "@comps/basket/basketStore";
import Logout from "@comps/client/logout";
import { useHeaderStore } from "@comps/header/headerStore";
import Logo from "@comps/server/logo";
import Button from "@comps/ui/button";
import ImageProfile from "@comps/ui/imageProfile";
import Link from "@comps/ui/link";
import { useSession } from "@lib/authClient";
import { combo } from "@lib/combo";
import { motion } from "framer-motion";
import { ChevronUp, LogOut, PanelsTopLeft, Search, ShoppingCart, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
    const [isHomeHovered, setIsHomeHovered] = useState(false);

    return (
        <motion.div onHoverStart={() => setIsHomeHovered(true)} onHoverEnd={() => setIsHomeHovered(false)}>
            <Link type="link" href="/" label="home" variant="none" baseStyleOnly={["flex"]}>
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
            </Link>
        </motion.div>
    );
};

const CentralNav = () => {
    const path = usePathname();
    const { setCategorieOpen, categorieOpen, setSearchOpen, setBasketOpen } = useHeaderStore();

    return (
        <div className="flex flex-row items-center justify-center gap-5">
            <Button
                type="button"
                label="catalog"
                variant="ghost"
                baseStyleOnly={["flex", "padding", "rounded"]}
                className={combo(path.includes("/catalog") && "font-bold")}
                onClick={() => {
                    setCategorieOpen(!categorieOpen);
                    setSearchOpen(false);
                    setBasketOpen(false);
                }}
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
            </Button>
            <Link
                type="link"
                href="/article"
                label="article"
                variant="ghost"
                baseStyleOnly={["padding", "rounded"]}
                className={combo(path.includes("/article") && "font-bold")}
            >
                Articles
            </Link>
            <Link
                type="link"
                href="/diy"
                label="diy"
                variant="ghost"
                baseStyleOnly={["padding", "rounded"]}
                className={combo(path.includes("/diy") && "font-bold")}
            >
                DIY
            </Link>
            <Link
                label="Examples"
                href="/examples"
                variant="ghost"
                baseStyleOnly={["padding", "rounded"]}
                className={combo(path.includes("/examples") && "font-bold")}
            />
        </div>
    );
};

const RightNav = () => {
    const { setSearchOpen, setCategorieOpen, searchOpen, basketOpen, setBasketOpen } = useHeaderStore();
    const { basket } = useBasketStore();
    const { data: session } = useSession();

    const role = session?.user.role;

    return (
        <div className="flex flex-row items-center justify-center gap-3">
            {/* Search button */}
            <Button
                label="toggle-search-section-visibility"
                variant="ghost"
                className="p-2"
                baseStyleOnly={["flex", "rounded"]}
                onClick={() => {
                    setSearchOpen(!searchOpen);
                    setCategorieOpen(false);
                    setBasketOpen(false);
                }}
            >
                <Search />
            </Button>

            {/* Account button */}
            {session ? (
                <Link
                    label="profile"
                    href="/profile"
                    variant="ghost"
                    className={combo(session.user.image ? "p-1.5" : "p-2")}
                    baseStyleOnly={["flex", "rounded"]}
                    onClick={() => {
                        setSearchOpen(false);
                        setCategorieOpen(false);
                        setBasketOpen(false);
                    }}
                >
                    {session.user.image ? (
                        <ImageProfile imageBase64={session.user.image} name={session.user.name} />
                    ) : (
                        <UserRound />
                    )}
                </Link>
            ) : (
                <Link
                    label="auth"
                    href="/auth"
                    variant="ghost"
                    className="p-2"
                    baseStyleOnly={["flex", "rounded"]}
                    onClick={() => {
                        setSearchOpen(false);
                        setCategorieOpen(false);
                        setBasketOpen(false);
                    }}
                >
                    <UserRound />
                </Link>
            )}

            {/* Dashboard button */}
            {(role === "ADMIN" || role === "EMPLOYEE" || role === "VENDOR") && (
                <Link
                    label="dashboard"
                    href="/dashboard"
                    variant="ghost"
                    className="p-2"
                    baseStyleOnly={["flex", "rounded"]}
                    onClick={() => {
                        setSearchOpen(false);
                        setCategorieOpen(false);
                        setBasketOpen(false);
                    }}
                >
                    <PanelsTopLeft />
                </Link>
            )}

            {/* Basket button */}
            <Button
                label="toggle-basket-section-visibility"
                variant="ghost"
                className="relative p-2"
                baseStyleOnly={["flex", "rounded"]}
                onClick={() => {
                    setSearchOpen(false);
                    setCategorieOpen(false);
                    setBasketOpen(!basketOpen);
                }}
            >
                <div className="absolute translate-x-[40%] translate-y-[-35%] scale-[0.7] rounded-full bg-black px-[7px] font-bold text-white">
                    {basket?.items.length ?? 0}
                </div>
                <ShoppingCart />
            </Button>

            {/* Logout button */}
            {session && (
                <Logout
                    variant="ghost"
                    baseStyleOnly={["flex", "rounded"]}
                    className="p-2"
                    onClick={() => {
                        setSearchOpen(false);
                        setCategorieOpen(false);
                        setBasketOpen(false);
                    }}
                >
                    <LogOut />
                </Logout>
            )}
        </div>
    );
};
