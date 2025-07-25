"use client";

import ButtonClient from "@comps/client/button";
import { combo } from "@lib/combo";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useContext } from "react";
import { Context } from "./context";
import { useCatalogParams } from "./queryParamsHook";

type PaginationProps = {
    className?: string;
};

export default function Pagination(props: PaginationProps) {
    const { className } = props;

    const { setPage } = useCatalogParams();
    const { page, take } = useCatalogParams();

    const { productAmount } = useContext(Context);

    const triggerScroll = () => {
        const scrollableTarget = document.getElementById("scrollable-target");
        if (scrollableTarget) setTimeout(() => scrollableTarget.scrollTo({ top: 0, behavior: "smooth" }), 100);
    };

    return (
        <div className={combo("flex h-12 items-center justify-center gap-3", className)}>
            <ButtonClient
                type="button"
                label="previous"
                variant="outline"
                padding="none"
                className="scale-100 rounded-full p-2 transition-all duration-150 hover:scale-105 hover:bg-white disabled:hover:scale-100"
                disabled={page === 1}
                onClick={() => {
                    setPage(page - 1);
                    triggerScroll();
                }}
            >
                <ChevronLeftIcon />
            </ButtonClient>
            <div className="font-semibold">Page {page}</div>
            <ButtonClient
                type="button"
                label="next"
                variant="outline"
                padding="none"
                className="scale-100 rounded-full p-2 transition-all duration-150 hover:scale-105 hover:bg-white disabled:hover:scale-100"
                disabled={page >= Math.ceil((productAmount ?? 1) / take)}
                onClick={() => {
                    setPage(page + 1);
                    triggerScroll();
                }}
            >
                <ChevronRightIcon />
            </ButtonClient>
        </div>
    );
}
