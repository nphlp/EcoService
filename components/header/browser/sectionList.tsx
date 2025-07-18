"use client";

import { urlSerializer } from "@app/catalog/components/queryParamsConfig";
import { useCatalogParams } from "@app/catalog/components/queryParamsHook";
import ButtonClient from "@comps/client/button";
import InputClient from "@comps/client/input";
import MotionSection from "@comps/header/browser/motionSection";
import { SearchKeywords } from "@comps/header/header";
import { useHeaderStore } from "@comps/header/headerStore";
import ImageRatio from "@comps/server/imageRatio";
import { combo } from "@lib/combo";
import { Category } from "@prisma/client";
import { motion } from "framer-motion";
import { CircleChevronRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, MouseEvent, useEffect, useRef, useState } from "react";

type SubProps = {
    keywords: SearchKeywords[];
    categorieList: Category[];
};

export default function SectionList(props: SubProps) {
    const { keywords, categorieList } = props;

    const path = usePathname();
    const router = useRouter();

    const { categorieOpen, searchOpen, setSearchOpen, setCategorieOpen, setBasketOpen } = useHeaderStore();

    const [searchValue, setSearchValue] = useState("");

    const { setCategory, setSearch } = useCatalogParams();

    const handleCategory = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>, slug: string) => {
        e.preventDefault();

        if (path === "/catalog") {
            setCategory(slug);
            return;
        }

        router.push(urlSerializer("/catalog", { category: slug }));
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

    const handleCategorySearch = (slug: string) => {
        if (path === "/catalog") {
            setCategory(slug);
            setSearchOpen(false);
            setTimeout(() => setSearchValue(""), 300);
            return;
        }

        // Close search panel and await panel closing animation to finish
        setSearchOpen(false);
        setTimeout(() => setSearchValue(""), 300);
        router.push(urlSerializer("/catalog", { category: slug }));
    };

    const handleProductSearch = (slug: string) => {
        // Close search panel and await panel closing animation to finish
        setSearchOpen(false);
        setTimeout(() => setSearchValue(""), 300);
        router.push(`/product/${slug}`);
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
                    setBasketOpen(false);
                }}
            >
                <h3 className="text-eco w-full text-2xl font-bold">Catégories</h3>
                <div className="flex w-full flex-row flex-wrap items-center justify-center gap-x-5 gap-y-3 xl:w-3/4">
                    <ButtonClient
                        type="link"
                        label="all"
                        href="/catalog"
                        padding="lg"
                        className="rounded-full"
                        onClick={(e) => handleCategory(e, "")}
                    >
                        Toutes les catégories
                    </ButtonClient>
                    {categorieList.map(({ slug, name }, index) => (
                        <ButtonClient
                            key={index}
                            type="link"
                            label={name}
                            href={urlSerializer("/catalog", { category: slug })}
                            onClick={(e) => handleCategory(e, slug)}
                            className="rounded-full hover:border-gray-400 hover:bg-gray-200"
                            padding="lg"
                            variant="outline"
                        >
                            {name}
                        </ButtonClient>
                    ))}
                </div>
            </MotionSection>

            {/* Search section */}
            <MotionSection open={searchOpen}>
                <h3 className="text-eco w-full text-2xl font-bold">Rechercher</h3>
                <div className="flex w-1/2 flex-row gap-3">
                    <InputClient
                        ref={inputSearchRef}
                        type="text"
                        label="search"
                        classLabel="sr-only"
                        classInput="py-1 px-3 bg-white focus:ring-ecoco focus:ring-offset-0"
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
                        className="focus:ring-ecoco rounded-md border border-gray-300 bg-white p-1 focus:ring-offset-0"
                        href={urlSerializer("/catalog", { search: searchValue })}
                        onClick={handleSearch}
                    >
                        <CircleChevronRight />
                    </ButtonClient>
                </div>
            </MotionSection>

            {/* Search results */}
            <div
                className={combo(
                    "absolute z-20 flex size-full flex-col items-center justify-start",
                    searchOpen ? "pointer-events-auto" : "pointer-events-none",
                )}
            >
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: searchOpen ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    type="button"
                    onClick={() => {
                        setSearchOpen(false);
                        setTimeout(() => setSearchValue(""), 300);
                    }}
                    className="absolute size-full bg-black/20"
                ></motion.button>
                <motion.div
                    initial={{
                        height: 0,
                        opacity: 0,
                    }}
                    animate={{
                        height: keywordsFiltered.length ? contentHeight : 0,
                        opacity: searchValue && keywordsFiltered.length ? 1 : 0,
                    }}
                    transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                    }}
                    className={combo(
                        "relative z-30 mt-4 w-1/2 overflow-hidden rounded-xl border border-gray-300 bg-white shadow-md",
                        searchValue.length ? "pointer-events-auto" : "pointer-events-none",
                    )}
                >
                    <div ref={contentRef} className="space-y-2 p-3">
                        {keywordsFiltered.map(({ slug, type, keyword, image, price }, index) => (
                            <Fragment key={index}>
                                {index !== 0 && <hr className="mx-4" />}
                                {type === "product" && (
                                    <ButtonClient
                                        type="link"
                                        label={keyword}
                                        variant="ghost"
                                        className="w-full px-1 hover:bg-gray-100"
                                        href={`/product/${slug}`}
                                        onClick={() => handleProductSearch(slug)}
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
                                        href={urlSerializer("/catalog", { category: slug })}
                                        onClick={() => handleCategorySearch(slug)}
                                    >
                                        <span className="text-2xs rounded bg-gray-100 px-2 py-0.5 font-bold text-gray-500">
                                            CATEGORY
                                        </span>
                                        <span>{keyword}</span>
                                    </ButtonClient>
                                )}
                            </Fragment>
                        ))}
                    </div>
                </motion.div>
            </div>
        </>
    );
}
