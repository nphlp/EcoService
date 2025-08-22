"use client";

import Button from "@comps/UI/button/button";
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

    const lastPageNumber = Math.ceil((productAmount ?? 1) / take);

    const onlyOnePage = lastPageNumber === 1;

    if (productAmount === 0 || onlyOnePage) return <></>;

    const triggerScroll = () => {
        const mainEl = document.getElementById("main");
        setTimeout(() => mainEl?.scrollTo({ top: 0, behavior: "smooth" }), 50);
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
            <Button
                type="button"
                label="previous"
                variant="outline"
                className={{
                    button: "scale-100 rounded-full p-2 hover:scale-105 hover:bg-white disabled:hover:scale-100",
                }}
                disabled={page === 1}
                onClick={handleBack}
            >
                <ChevronLeftIcon />
            </Button>
            <div className="font-semibold">Page {page}</div>
            <Button
                type="button"
                label="next"
                variant="outline"
                className={{
                    button: "scale-100 rounded-full p-2 hover:scale-105 hover:bg-white disabled:hover:scale-100",
                }}
                disabled={page >= lastPageNumber}
                onClick={handleNext}
            >
                <ChevronRightIcon />
            </Button>
        </div>
    );
}
