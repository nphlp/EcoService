"use client";

import { urlSerializer } from "@app/catalog/components/FilterTypes";
import { useCatalogParams } from "@app/catalog/components/useCatalogParams";
import { useSession } from "@lib/client";
import { combo } from "@lib/combo";
import { Category } from "@prisma/client";
import { motion } from "framer-motion";
import { CircleChevronRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";
import ButtonClient from "../../client/Button";
import InputClient from "../../client/Input";
import LogoutClient from "../../client/Logout";
import { SearchKeywords } from "../Header";
import { useHeaderStore } from "../HeaderStore";
import MotionSection from "./Section";

type SubProps = {
    keywords: SearchKeywords;
    categorieList: Category[];
};

export default function Sub(props: SubProps) {
    const { keywords, categorieList } = props;
    const { data: session } = useSession();

    const path = usePathname();
    const router = useRouter();

    const { categorieOpen, searchOpen, accountOpen, setSearchOpen, setCategorieOpen, setAccountOpen, setBasketOpen } =
        useHeaderStore();

    const [isHovered, setIsHovered] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const { setCategory, setSearch } = useCatalogParams();

    const handleCategory = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>, id: string) => {
        e.preventDefault();

        if (path === "/catalog") {
            setCategory(id);
            return;
        }

        router.push(urlSerializer("/catalog", { category: id }));
    };

    const handleSearch = (formData: FormData) => {
        const search = String(formData.get("search"));

        if (path === "/catalog") {
            setSearch(search);
            setSearchOpen(false);
            setTimeout(() => setSearchValue(""), 300);
            return;
        }

        // Close search panel and await panel closing animation to finish
        setSearchOpen(false);
        setTimeout(() => setSearchValue(""), 300);

        router.push(urlSerializer("/catalog", { search }));
    };

    return (
        <>
            {/* Categorie section */}
            <MotionSection
                open={categorieOpen}
                onMouseLeave={() => {
                    setCategorieOpen(false);
                    setSearchOpen(false);
                    setAccountOpen(false);
                    setBasketOpen(false);
                }}
            >
                <h3 className="w-full text-2xl font-bold text-primary">Catégories</h3>
                <ButtonClient
                    type="link"
                    label="all"
                    href="/catalog"
                    onClick={(e) => handleCategory(e, "")}
                    variant="outline"
                >
                    Toutes les catégories
                </ButtonClient>
                {categorieList.map(({ id, name }, index) => (
                    <ButtonClient
                        key={index}
                        type="link"
                        label={name}
                        href={urlSerializer("/catalog", { category: id })}
                        onClick={(e) => handleCategory(e, id)}
                        variant="outline"
                    >
                        {name}
                    </ButtonClient>
                ))}
            </MotionSection>

            {/* Search section */}
            <MotionSection open={searchOpen}>
                <h3 className="w-full text-2xl font-bold text-primary">Rechercher</h3>
                <form action={handleSearch} className="flex w-1/2 flex-row gap-3">
                    <InputClient
                        type="text"
                        label="search"
                        list="keywords"
                        classLabel="sr-only"
                        classInput="py-1 px-3 bg-white focus:ring-secondary focus:ring-offset-0"
                        placeholder="Rechercher un produit, une catégorie, etc..."
                        onChange={(e) => setSearchValue(e.target.value)}
                        value={searchValue}
                    />
                    <datalist id="keywords">
                        {keywords.map(({ id, keyword }) => (
                            <option key={id} value={keyword} />
                        ))}
                    </datalist>
                    <motion.div onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)}>
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
                        <h3 className="w-full text-2xl font-bold text-primary">Mon compte</h3>

                        <ButtonClient
                            type="link"
                            href="/register"
                            label="register"
                            variant="outline"
                            className={combo("px-8", path === "/register" && "font-bold")}
                        >
                            Register
                        </ButtonClient>
                        <ButtonClient
                            type="link"
                            href="/login"
                            label="login"
                            variant="outline"
                            className={combo("px-8", path === "/login" && "font-bold")}
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
                            variant="outline"
                            className={combo("px-8", path === "/profile" && "font-bold")}
                        >
                            Profile
                        </ButtonClient>
                        <LogoutClient variant="outline" />
                    </>
                )}
            </MotionSection>
        </>
    );
}
