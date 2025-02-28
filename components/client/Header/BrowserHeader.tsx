"use client";

import { urlSerializer } from "@app/catalogue/components/FilterTypes";
import Logo from "@comps/server/Logo";
import { BetterSessionClient } from "@lib/client";
import { combo } from "@lib/combo";
import { Category } from "@prisma/client";
import { motion } from "framer-motion";
import {
    ChevronUp,
    CircleChevronRight,
    Search,
    ShoppingCart,
    UserRound,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import ButtonClient from "../Button";
import InputClient from "../Input";
import LogoutClient from "../Logout";
import { useHeaderStore } from "./HeaderStore";

type BrowserHeaderProps = {
    session: BetterSessionClient | null;
    categorieList: Category[];
};

export default function BrowserHeader(props: BrowserHeaderProps) {
    const { session, categorieList } = props;

    return (
        <>
            <NavSection />
            <SubSection categorieList={categorieList} session={session} />
        </>
    );
}

const NavSection = () => {
    const path = usePathname();

    const {
        categorieOpen,
        setCategorieOpen,
        searchOpen,
        setSearchOpen,
        accountOpen,
        setAccountOpen,
    } = useHeaderStore();

    const [isHomeHovered, setIsHomeHovered] = useState(false);

    return (
        <nav className="flex flex-row items-center justify-between gap-5 p-5 py-4">
            {/* Home button */}
            <motion.div
                onHoverStart={() => setIsHomeHovered(true)}
                onHoverEnd={() => setIsHomeHovered(false)}
            >
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
                        <div className="text-2xl font-semibold uppercase">
                            Circle
                        </div>
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

            <div className="flex flex-row items-center justify-center gap-5">
                <ButtonClient
                    type="link"
                    href="/catalogue"
                    label="catalogue"
                    variant="ghost"
                    onMouseEnter={() => {
                        setAccountOpen(false);
                        setSearchOpen(false);
                        setCategorieOpen(false);
                    }}
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
                    onMouseEnter={() => {
                        setCategorieOpen(true);
                        setSearchOpen(false);
                        setAccountOpen(false);
                    }}
                    onFocus={() => {
                        setCategorieOpen(true);
                        setSearchOpen(false);
                        setAccountOpen(false);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            const el = document.querySelector(
                                "#categorie-1",
                            ) as HTMLElement;
                            el.focus();
                        }
                    }}
                >
                    <span>Categories</span>
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
                    type="button"
                    label="toggle-subheader-visibility"
                    variant="ghost"
                    onMouseEnter={() => {
                        setAccountOpen(false);
                        setSearchOpen(true);
                        setCategorieOpen(false);
                    }}
                    onFocus={() => {
                        setAccountOpen(false);
                        setSearchOpen(true);
                        setCategorieOpen(false);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault(); // Prevent submitting the form
                            const el = document.querySelector(
                                "#search",
                            ) as HTMLElement;
                            el.focus();
                        }
                    }}
                >
                    <Search />
                    <motion.span
                        initial={{ rotate: 0 }}
                        animate={{ rotate: searchOpen ? -180 : 0 }}
                        transition={{
                            duration: 0.2,
                            ease: "easeInOut",
                        }}
                    >
                        <ChevronUp className="text-gray-700" />
                    </motion.span>
                </ButtonClient>
            </div>

            {/* Account and basket buttons */}
            <div className="flex flex-row gap-3">
                <ButtonClient
                    type="button"
                    label="toggle-account-section-visibility"
                    variant="ghost"
                    className="p-[4px]"
                    onMouseEnter={() => {
                        setAccountOpen(true);
                        setSearchOpen(false);
                        setCategorieOpen(false);
                    }}
                    onFocus={() => {
                        setSearchOpen(false);
                        setCategorieOpen(false);
                        setAccountOpen(true);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            const el = document.querySelector(
                                "#account",
                            ) as HTMLElement;
                            el.focus();
                        }
                    }}
                >
                    <UserRound />
                    <motion.span
                        initial={{ rotate: 0 }}
                        animate={{ rotate: accountOpen ? -180 : 0 }}
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
                    label="toggle-basket-section-visibility"
                    variant="ghost"
                    className="p-[4px]"
                    onMouseEnter={() => {
                        setAccountOpen(false);
                        setSearchOpen(false);
                        setCategorieOpen(false);
                    }}
                >
                    <ShoppingCart />
                </ButtonClient>
            </div>
        </nav>
    );
};

type SubSectionProps = {
    categorieList: Category[];
    session: BetterSessionClient | null;
};
const SubSection = (props: SubSectionProps) => {
    const path = usePathname();
    const router = useRouter();

    const { categorieList, session } = props;
    const { categorieOpen, searchOpen, accountOpen, setSearchOpen } =
        useHeaderStore();

    const [isHovered, setIsHovered] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (formData: FormData) => {
        const search = String(formData.get("search"));

        const url = urlSerializer("/catalogue", {
            search,
        });

        setSearchOpen(false);
        setTimeout(() => setSearchValue(""), 300);
        router.push(url);
    };

    return (
        <>
            {/* Categorie section */}
            <MotionSection open={categorieOpen}>
                <h3 className="w-full text-2xl font-bold text-primary">
                    Catégories
                </h3>
                {categorieList.map(({ id, name }, index) => (
                    <ButtonClient
                        {...(index === 0 && { id: "categorie-1" })}
                        key={index}
                        type="link"
                        label={name}
                        href={urlSerializer("/catalogue", { category: id })}
                        variant="outline"
                    >
                        {name}
                    </ButtonClient>
                    // TODO: make an underline animation when hover
                ))}
            </MotionSection>

            {/* Search section */}
            <MotionSection open={searchOpen}>
                <h3 className="w-full text-2xl font-bold text-primary">
                    Rechercher
                </h3>
                <form
                    action={handleSearch}
                    className="flex w-1/2 flex-row gap-3"
                >
                    <InputClient
                        type="text"
                        label="search"
                        classLabel="sr-only"
                        classInput="py-1 px-3 bg-white"
                        placeholder="Rechercher un produit, une catégorie, etc..."
                        onChange={(e) => setSearchValue(e.target.value)}
                        value={searchValue}
                    />
                    <motion.div
                        onHoverStart={() => setIsHovered(true)}
                        onHoverEnd={() => setIsHovered(false)}
                    >
                        <ButtonClient
                            type="submit"
                            label="search"
                            variant="none"
                            className="rounded-md border border-gray-300 bg-white p-1"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <motion.span
                                initial={{ rotate: 0 }}
                                animate={{ rotate: isHovered ? -360 : 0 }}
                                transition={{
                                    duration: 1,
                                    ease: "easeInOut",
                                    type: "spring",
                                }}
                            >
                                <CircleChevronRight />
                            </motion.span>
                        </ButtonClient>
                    </motion.div>
                </form>
            </MotionSection>

            {/* Account section */}
            <MotionSection open={accountOpen}>
                {!session && (
                    <>
                        <h3 className="w-full text-2xl font-bold text-primary">
                            Mon compte
                        </h3>

                        <ButtonClient
                            id="account"
                            type="link"
                            href="/register"
                            label="register"
                            variant="outline"
                            className={combo(
                                "px-8",
                                path === "/register" && "font-bold",
                            )}
                        >
                            Register
                        </ButtonClient>
                        <ButtonClient
                            type="link"
                            href="/login"
                            label="login"
                            variant="outline"
                            className={combo(
                                "px-8",
                                path === "/login" && "font-bold",
                            )}
                        >
                            Login
                        </ButtonClient>
                    </>
                )}
                {session && (
                    <>
                        <ButtonClient
                            id="account"
                            type="link"
                            href="/profile"
                            label="profile"
                            variant="outline"
                            className={combo(
                                "px-8",
                                path === "/profile" && "font-bold",
                            )}
                        >
                            Profile
                        </ButtonClient>
                        <LogoutClient variant="outline" />
                    </>
                )}
            </MotionSection>
        </>
    );
};

type MotionSectionProps = {
    open: boolean;
    children: ReactNode;
};

const MotionSection = (props: MotionSectionProps) => {
    const { children, open } = props;

    const { setAccountOpen, setSearchOpen, setCategorieOpen } = useHeaderStore();

    return (
        <motion.div
            initial={{ height: 0 }}
            animate={{
                height: open ? "auto" : 0,
            }}
            transition={{
                duration: 0.3,
                ease: "easeInOut",
            }}
            className={combo("w-full overflow-hidden bg-white")}
            onMouseLeave={() => {
                setAccountOpen(false);
                setSearchOpen(false);
                setCategorieOpen(false);
            }}
        >
            <div className="flex h-full flex-row flex-wrap items-center justify-center gap-3 bg-gray-100 p-4">
                {children}
            </div>
        </motion.div>
    );
};
