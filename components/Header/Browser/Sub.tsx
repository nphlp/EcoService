"use client";

import { urlSerializer } from "@app/catalog/components/FilterTypes";
import { useCatalogParams } from "@app/catalog/components/useCatalogParams";
import ImageRatio from "@comps/server/ImageRatio";
import { useSession } from "@lib/client";
import { combo } from "@lib/combo";
import { Category } from "@prisma/client";
import { motion } from "framer-motion";
import { CircleChevronRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, MouseEvent, useEffect, useRef, useState } from "react";
import ButtonClient from "../../client/Button";
import InputClient from "../../client/Input";
import LogoutClient from "../../client/Logout";
import { SearchKeywords } from "../Header";
import { useHeaderStore } from "../HeaderStore";
import MotionSection from "./Section";

type SubProps = {
    keywords: SearchKeywords[];
    categorieList: Category[];
};

export default function Sub(props: SubProps) {
    const { keywords, categorieList } = props;
    const { data: session } = useSession();

    const path = usePathname();
    const router = useRouter();

    const { categorieOpen, searchOpen, accountOpen, setSearchOpen, setCategorieOpen, setAccountOpen, setBasketOpen } =
        useHeaderStore();

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

    const handleSearch = () => {
        if (path === "/catalog") {
            setSearch(searchValue);
            setSearchOpen(false);
            setTimeout(() => setSearchValue(""), 300);
            return;
        }

        // Close search panel and await panel closing animation to finish
        setSearchOpen(false);
        setTimeout(() => setSearchValue(""), 300);
        router.push(urlSerializer("/catalog", { search: searchValue }));
    };

    const handleCategorySearch = (id: string) => {
        if (path === "/catalog") {
            setCategory(id);
            setSearchOpen(false);
            setTimeout(() => setSearchValue(""), 300);
            return;
        }

        // Close search panel and await panel closing animation to finish
        setSearchOpen(false);
        setTimeout(() => setSearchValue(""), 300);
        router.push(urlSerializer("/catalog", { category: id }));
    };

    const handleProductSearch = (id: string) => {
        // Close search panel and await panel closing animation to finish
        setSearchOpen(false);
        setTimeout(() => setSearchValue(""), 300);
        router.push(`/product/${id}`);
    };

    // Focus on search input when search panel is open
    const inputSearchRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (inputSearchRef.current && searchOpen) {
            inputSearchRef.current.focus();
        }
    }, [searchOpen]);

    // Filter keywords based on search value
    const keywordsFiltered = keywords
        // Filter by search value
        .filter(({ keyword }) => {
            const searchValueLower = searchValue.toLowerCase();
            const keywordLower = keyword.toLowerCase();
            return keywordLower.includes(searchValueLower);
        })
        // Order alphabetically
        .sort((a, b) => {
            if (a.keyword < b.keyword) {
                return -1;
            }
            if (a.keyword > b.keyword) {
                return 1;
            }
            return 0;
        })
        // Limit to 5 results
        .slice(0, 7)
        // Order by type : category -> product
        .sort((a, b) => {
            if (a.type === "category" && b.type === "product") {
                return -1;
            }
            if (a.type === "product" && b.type === "category") {
                return 1;
            }
            return 0;
        });

    // Calculate content height for transition animation
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState(0);
    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        }
    }, [keywordsFiltered]);

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
                <div className="flex w-1/2 flex-row gap-3">
                    <InputClient
                        ref={inputSearchRef}
                        type="text"
                        label="search"
                        classLabel="sr-only"
                        classInput="py-1 px-3 bg-white focus:ring-secondary focus:ring-offset-0"
                        placeholder="Rechercher un produit, une catégorie, etc..."
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                        value={searchValue}
                    />
                    <ButtonClient
                        type="link"
                        label="search"
                        variant="none"
                        className="rounded-md border border-gray-300 bg-white p-1 focus:ring-secondary focus:ring-offset-0"
                        href={urlSerializer("/catalog", { search: searchValue })}
                        onClick={handleSearch}
                    >
                        <CircleChevronRight />
                    </ButtonClient>
                </div>
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

            {/* Search results */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: searchOpen && searchValue && keywordsFiltered.length ? 1 : 0,
                }}
                transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                }}
                className={combo(
                    "absolute z-20 flex size-full flex-col items-center justify-start",
                    searchOpen && searchValue && keywordsFiltered.length
                        ? "pointer-events-auto"
                        : "pointer-events-none",
                )}
            >
                <button
                    type="button"
                    onClick={() => {
                        setSearchOpen(false);
                        setTimeout(() => setSearchValue(""), 300);
                    }}
                    className="absolute size-full bg-black/20"
                ></button>
                <motion.div
                    initial={{ height: 0 }}
                    animate={{
                        height: keywordsFiltered.length ? contentHeight : 0,
                    }}
                    transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                    }}
                    className="relative z-30 mt-4 w-1/2 overflow-hidden rounded-xl border border-gray-300 bg-white shadow-md"
                >
                    <div ref={contentRef} className="space-y-2 p-3">
                        {keywordsFiltered.map(({ id, type, keyword, image, price }, index) => (
                            <Fragment key={index}>
                                {index !== 0 && <hr className="mx-4" />}
                                {type === "product" && (
                                    <ButtonClient
                                        type="link"
                                        label={keyword}
                                        variant="ghost"
                                        className="w-full px-1 hover:bg-gray-100"
                                        href={`/product/${id}`}
                                        onClick={() => handleProductSearch(id)}
                                    >
                                        <div className="flex w-full flex-row items-center gap-4">
                                            <ImageRatio className="w-1/6 rounded" src={image} alt="Product" />
                                            <div className="text-left">
                                                <div className="font-semibold">{keyword}</div>
                                                <div className="text-sm text-gray-500">{price}€</div>
                                            </div>
                                        </div>
                                    </ButtonClient>
                                )}
                                {type === "category" && (
                                    <ButtonClient
                                        type="link"
                                        label={keyword}
                                        variant="ghost"
                                        className="w-full"
                                        href={urlSerializer("/catalog", { category: id })}
                                        onClick={() => handleCategorySearch(id)}
                                    >
                                        <span className="rounded bg-gray-100 px-2 py-0.5 text-xxs font-bold text-gray-500">
                                            CATEGORY
                                        </span>
                                        <span>{keyword}</span>
                                    </ButtonClient>
                                )}
                            </Fragment>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
}
