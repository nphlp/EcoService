"use client";

import { motion } from "framer-motion";
import { combo } from "@lib/combo";
import LogoutClient from "../Logout";
import ButtonClient from "../Button";
import { BetterSessionClient } from "@lib/client";
import { ChevronUp } from "lucide-react";
import { urlSerializer } from "@app/catalogue/components/FilterTypes";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Category } from "@prisma/client";

type BrowserHeaderProps = {
    session: BetterSessionClient | null;
    categorieList: Category[];
};

export default function BrowserHeader(props: BrowserHeaderProps) {
    const { session, categorieList } = props;

    const path = usePathname();

    const [categorieSectionVisible, setCategorieSectionVisible] =
        useState<boolean>(false);
    const [accountSectionVisible, setAccountSectionVisible] =
        useState<boolean>(false);

    return (
        <>
            <nav className="flex flex-row items-center justify-center gap-5 py-4">
                <ButtonClient
                    type="link"
                    pageTransition={true}
                    href="/"
                    label="home"
                    ring={false}
                    variant="ghost"
                    className={combo("px-8", path === "/" && "font-bold")}
                >
                    Home
                </ButtonClient>
                <ButtonClient
                    type="link"
                    href="/catalogue"
                    label="catalogue"
                    ring={false}
                    variant="ghost"
                    className={combo(
                        "px-8",
                        path === "/catalogue" && "font-bold",
                    )}
                >
                    Catalogue
                </ButtonClient>
                <ButtonClient
                    type="button"
                    label="toggle-subheader-visibility"
                    variant="ghost"
                    ring={false}
                    onMouseEnter={() => {
                        setCategorieSectionVisible(true);
                        setAccountSectionVisible(false);
                    }}
                >
                    <span>Categories</span>
                    <motion.span
                        initial={{ rotate: 0 }}
                        animate={{ rotate: categorieSectionVisible ? -180 : 0 }}
                        transition={{
                            duration: 0.2,
                            ease: "easeInOut",
                        }}
                    >
                        <ChevronUp className="text-gray-700" />
                    </motion.span>
                </ButtonClient>
                <ButtonClient
                    type="button"
                    label="toggle-account-section-visibility"
                    variant="ghost"
                    ring={false}
                    onMouseEnter={() => {
                        setAccountSectionVisible(true);
                        setCategorieSectionVisible(false);
                    }}
                >
                    <span>Account</span>
                    <motion.span
                        initial={{ rotate: 0 }}
                        animate={{ rotate: accountSectionVisible ? -180 : 0 }}
                        transition={{
                            duration: 0.2,
                            ease: "easeInOut",
                        }}
                    >
                        <ChevronUp className="text-gray-700" />
                    </motion.span>
                </ButtonClient>
            </nav>

            {/* Categorie section */}
            <motion.div
                initial={{ height: 0 }}
                animate={{
                    height: categorieSectionVisible ? "auto" : 0,
                }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                }}
                className="w-full overflow-hidden bg-white"
                onMouseLeave={() => setCategorieSectionVisible(false)}
            >
                <div className="flex h-full flex-row flex-wrap items-center justify-center gap-3 bg-gray-100 p-4">
                    {categorieList.map(({ id, name }) => {
                        const href = urlSerializer("catalogue", {
                            category: id,
                        });
                        return (
                            <ButtonClient
                                key={id}
                                type="link"
                                label={name}
                                href={href}
                                variant="ghost"
                                ring={false}
                                onClick={() =>
                                    setCategorieSectionVisible(false)
                                }
                            >
                                {name}
                            </ButtonClient>
                        );
                    })}
                </div>
            </motion.div>

            {/* Account section */}
            <motion.div
                initial={{ height: 0 }}
                animate={{
                    height: accountSectionVisible ? "auto" : 0,
                }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                }}
                className="w-full overflow-hidden bg-white"
                onMouseLeave={() => setAccountSectionVisible(false)}
            >
                <div className="flex h-full flex-row flex-wrap items-center justify-center gap-3 bg-gray-100 p-4">
                    {!session && (
                        <>
                            <ButtonClient
                                type="link"
                                href="/register"
                                label="register"
                                ring={false}
                                variant="ghost"
                                className={combo(
                                    "px-8",
                                    path === "/register" && "font-bold",
                                )}
                                onClick={() => setAccountSectionVisible(false)}
                            >
                                Register
                            </ButtonClient>
                            <ButtonClient
                                type="link"
                                href="/login"
                                label="login"
                                ring={false}
                                variant="ghost"
                                className={combo(
                                    "px-8",
                                    path === "/login" && "font-bold",
                                )}
                                onClick={() => setAccountSectionVisible(false)}
                            >
                                Login
                            </ButtonClient>
                        </>
                    )}
                    {session && (
                        <>
                            <ButtonClient
                                type="link"
                                href="/profile"
                                label="profile"
                                ring={false}
                                variant="ghost"
                                className={combo(
                                    "px-8",
                                    path === "/profile" && "font-bold",
                                )}
                                onClick={() => setAccountSectionVisible(false)}
                            >
                                Profile
                            </ButtonClient>
                            <LogoutClient
                                ring={false}
                                variant="ghost"
                                onClick={() => setAccountSectionVisible(false)}
                            />
                        </>
                    )}
                </div>
            </motion.div>
        </>
    );
};
