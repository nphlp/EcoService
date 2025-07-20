"use client";

import { useBasketStore } from "@comps/basket/basketStore";
import Logout from "@comps/client/logout";
import { useHeaderStore } from "@comps/CORE/header/headerStore";
import Button from "@comps/ui/button";
import ImageProfile from "@comps/ui/imageProfile";
import Link from "@comps/ui/link";
import { useSession } from "@lib/authClient";
import { combo } from "@lib/combo";
import { motion } from "framer-motion";
import { LogOut, Moon, PanelsTopLeft, Search, ShoppingCart, Sun, UserRound } from "lucide-react";

export default function IconLinks() {
    const { data: session } = useSession();

    const { basket } = useBasketStore();
    const { searchOpen, setSearchOpen, basketOpen, setBasketOpen, isDarkMode, setIsDarkMode } = useHeaderStore();

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
                    setBasketOpen(false);
                }}
            >
                <Search />
            </Button>

            {/* Toogle mode */}
            <Button
                label="toggle-mode"
                variant="ghost"
                baseStyleOnly={["flex", "rounded"]}
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="w-10 overflow-hidden p-2"
            >
                <motion.div
                    initial={{ translateX: "20px" }}
                    animate={{ translateX: isDarkMode ? "20px" : "-20px" }}
                    transition={{ duration: 0.5, ease: "easeInOut", type: "spring" }}
                    className="flex flex-row gap-4"
                >
                    <Sun />
                    <Moon />
                </motion.div>
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
                        setBasketOpen(false);
                    }}
                >
                    <LogOut />
                </Logout>
            )}
        </div>
    );
}
