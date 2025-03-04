"use client";

import { useBasketStore } from "@comps/Basket/BasketStore";
import Logo from "@comps/server/Logo";
import { combo } from "@lib/combo";
import { motion } from "framer-motion";
import { ChevronUp, Search, ShoppingCart, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ButtonClient from "../../client/Button";
import { useHeaderStore } from "../HeaderStore";

export default function Main() {
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
    const { setCategorieOpen, categorieOpen, setSearchOpen, setAccountOpen, setBasketOpen } = useHeaderStore();

    return (
        <div className="flex flex-row items-center justify-center gap-5">
            <ButtonClient
                type="button"
                label="catalog"
                variant="ghost"
                onClick={() => {
                    setCategorieOpen(true);
                    setSearchOpen(false);
                    setAccountOpen(false);
                    setBasketOpen(false);
                }}
                className={combo(path === "/catalog" && "font-bold")}
            >
                <span>Catalog</span>
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
                href="/"
                label="articles"
                variant="ghost"
                className={combo("px-8", path === "/catalog" && "font-bold")}
            >
                Articles
            </ButtonClient>
        </div>
    );
};

const RightNav = () => {
    const { setAccountOpen, setSearchOpen, setCategorieOpen, accountOpen, searchOpen, basketOpen, setBasketOpen } =
        useHeaderStore();
    const { basketProductList } = useBasketStore();

    return (
        <div className="flex flex-row gap-3">
            {/* Search button */}
            <ButtonClient
                type="button"
                label="toggle-search-section-visibility"
                variant="ghost"
                className="p-2"
                onClick={() => {
                    setAccountOpen(false);
                    setSearchOpen(!searchOpen);
                    setCategorieOpen(false);
                    setBasketOpen(false);
                }}
            >
                <Search />
            </ButtonClient>

            {/* Account button */}
            <ButtonClient
                type="button"
                label="toggle-account-section-visibility"
                variant="ghost"
                className="p-2"
                onClick={() => {
                    setAccountOpen(!accountOpen);
                    setSearchOpen(false);
                    setCategorieOpen(false);
                    setBasketOpen(false);
                }}
            >
                <UserRound />
            </ButtonClient>

            {/* Basket button */}
            <ButtonClient
                type="button"
                label="toggle-basket-section-visibility"
                variant="ghost"
                className="relative p-2"
                onClick={() => {
                    setAccountOpen(false);
                    setSearchOpen(false);
                    setCategorieOpen(false);
                    setBasketOpen(!basketOpen);
                }}
            >
                <div className="absolute translate-x-[40%] translate-y-[-35%] scale-[0.7] rounded-full bg-black px-[7px] font-bold text-white">{basketProductList.length}</div>
                <ShoppingCart />
            </ButtonClient>
        </div>
    );
};
