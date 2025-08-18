"use client";

import ButtonClient from "@comps/client/button";
import { combo } from "@lib/combo";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useContext } from "react";
import { Context } from "../../app/catalog/components/context";
import { usePageQueryParams, useTakeQueryParams } from "./queryParamsClientHooks";

type PaginationProps = {
    className?: string;
};

export default function Pagination(props: PaginationProps) {
    const { className } = props;

    const { page, setPage } = usePageQueryParams();
    const { take } = useTakeQueryParams();

    const { productAmount } = useContext(Context);

    const onlyOnePage = page >= Math.ceil((productAmount ?? 1) / take);

    if (productAmount === 0 || onlyOnePage) return <></>;

    const triggerScroll = () => {
        const headerEl = document.querySelector("header");
        const mainEl = headerEl?.nextElementSibling;
        setTimeout(() => mainEl?.scrollTo({ top: 0, behavior: "smooth" }), 100);
    };

    const handleBack = () => {
        setPage(page - 1);
        triggerScroll();
    };

    const handleNext = () => {
        setPage(page + 1);
        triggerScroll();
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
                onClick={handleBack}
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
                disabled={onlyOnePage}
                onClick={handleNext}
            >
                <ChevronRightIcon />
            </ButtonClient>
        </div>
    );
}
