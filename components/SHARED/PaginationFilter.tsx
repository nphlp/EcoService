"use client";

import Link from "@comps/UI/button/link";
import { combo } from "@lib/combo";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Route } from "next";
import { useSearchParams } from "next/navigation";
import { Context, MouseEvent, useContext } from "react";
import { usePageQueryParams, useTakeQueryParams } from "./queryParamsClientHooks";

type ContextType = {
    itemsAmount: number | undefined;
    isLoading: boolean;
};

type PaginationProps = {
    path: string;
    context: Context<ContextType>;
    takeOverride?: number;
    className?: string;
};

export default function Pagination(props: PaginationProps) {
    const { className, path, takeOverride, context } = props;

    const { page, setPage } = usePageQueryParams();
    const { take } = useTakeQueryParams();
    const searchParams = useSearchParams();

    const { itemsAmount } = useContext(context);

    const lastPageNumber = Math.ceil((itemsAmount ?? 1) / (takeOverride ?? take));

    const onlyOnePage = lastPageNumber === 1;

    if (itemsAmount === 0 || onlyOnePage) return <></>;

    const paginationUrl = (pageNumber: number): Route => {
        // eslint-disable-next-line
        const { page, ...paramsWithoutPage } = Object.fromEntries(searchParams.entries());
        const numberOfParams = Object.keys(paramsWithoutPage).length;

        let newParams;

        if (pageNumber === 1 && numberOfParams === 0) return path as Route;
        if (pageNumber === 1 && numberOfParams > 0) newParams = new URLSearchParams({ ...paramsWithoutPage });
        if (pageNumber > 1) newParams = new URLSearchParams({ ...paramsWithoutPage, page: String(pageNumber) });

        return `${path}?${newParams}` as Route;
    };

    const triggerScroll = () => {
        const mainEl = document.getElementById("main");
        setTimeout(() => mainEl?.scrollTo({ top: 0, behavior: "smooth" }), 50);
    };

    const handleBack = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setPage(page - 1);
        triggerScroll();
    };

    const handleNext = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setPage(page + 1);
        triggerScroll();
    };

    return (
        <div className={combo("flex h-12 items-center justify-center gap-3", className)}>
            <Link
                label="previous"
                href={paginationUrl(page - 1)}
                variant="outline"
                className={combo(
                    "scale-100 rounded-full p-2 hover:scale-105 hover:bg-white",
                    // Is disabled
                    page === 1 && "text-gray-300 hover:scale-100 hover:border-gray-300",
                )}
                isDisabled={page === 1}
                onClick={handleBack}
            >
                <ChevronLeftIcon />
            </Link>
            <div className="font-semibold">Page {page}</div>
            <Link
                label="next"
                href={paginationUrl(page + 1)}
                variant="outline"
                className={combo(
                    "scale-100 rounded-full p-2 hover:scale-105 hover:bg-white",
                    // Is disabled
                    page >= lastPageNumber && "text-gray-300 hover:scale-100 hover:border-gray-300",
                )}
                isDisabled={page >= lastPageNumber}
                onClick={handleNext}
            >
                <ChevronRightIcon />
            </Link>
        </div>
    );
}
