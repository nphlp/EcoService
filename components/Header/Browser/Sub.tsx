"use client";

import { urlSerializer } from "@app/catalogue/components/FilterTypes";
import { useCatalogueParams } from "@app/catalogue/components/useCatalogueParams";
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
import { useHeaderStore } from "../HeaderStore";
import MotionSection from "./Section";

type SubProps = {
    categorieList: Category[];
};

export default function Sub(props: SubProps) {
    const { categorieList } = props;
    const { data: session } = useSession();

    const path = usePathname();
    const router = useRouter();

    const { categorieOpen, searchOpen, accountOpen, setSearchOpen, setCategorieOpen, setAccountOpen, setBasketOpen } =
        useHeaderStore();

    const [isHovered, setIsHovered] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const { setCategory, setSearch } = useCatalogueParams();

    const handleCategory = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>, id: string) => {
        e.preventDefault();

        if (path === "/catalogue") {
            setCategory(id);
            return;
        }

        router.push(urlSerializer("/catalogue", { category: id }));
    };

    const handleSearch = (formData: FormData) => {
        const search = String(formData.get("search"));

        if (path === "/catalogue") {
            setSearch(search);
            setSearchOpen(false);
            setTimeout(() => setSearchValue(""), 300);
            return;
        }

        // Close search panel and await panel closing animation to finish
        setSearchOpen(false);
        setTimeout(() => setSearchValue(""), 300);

        router.push(urlSerializer("/catalogue", { search }));
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
                {categorieList.map(({ id, name }, index) => (
                    <ButtonClient
                        key={index}
                        type="link"
                        label={name}
                        href={urlSerializer("/catalogue", { category: id })}
                        onClick={(e) => handleCategory(e, id)}
                        variant="outline"
                    >
                        {name}
                    </ButtonClient>
                    // TODO: make an underline animation when hover
                ))}
            </MotionSection>

            {/* Search section */}
            <MotionSection open={searchOpen}>
                <h3 className="w-full text-2xl font-bold text-primary">Rechercher</h3>
                <form action={handleSearch} className="flex w-1/2 flex-row gap-3">
                    <InputClient
                        type="text"
                        label="search"
                        classLabel="sr-only"
                        classInput="py-1 px-3 bg-white"
                        placeholder="Rechercher un produit, une catégorie, etc..."
                        onChange={(e) => setSearchValue(e.target.value)}
                        value={searchValue}
                    />
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
