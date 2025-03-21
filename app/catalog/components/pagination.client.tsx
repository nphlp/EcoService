"use client";

import ButtonClient from "@comps/client/Button";
import { combo } from "@lib/combo";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useContext } from "react";
import { CatalogContext } from "./catalog.provider";
import { useCatalogParams } from "./useCatalogParams";

type PaginationClientProps = {
    className?: string;
};

export default function PaginationClient(props: PaginationClientProps) {
    const { className } = props;

    const { setPage } = useCatalogParams();
    const { productAmount: productAmountLocal } = useContext(CatalogContext);
    const { page, take } = useCatalogParams();

    return (
        <div className={combo("flex h-12 items-center justify-center gap-3", className)}>
            <ButtonClient
                type="button"
                label="previous"
                variant="outline"
                padding="none"
                className="scale-100 rounded-full p-2 transition-all duration-150 hover:scale-105 hover:bg-white disabled:hover:scale-100"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
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
                disabled={page >= Math.ceil((productAmountLocal ?? 1) / take)}
                onClick={() => setPage(page + 1)}
            >
                <ChevronRightIcon />
            </ButtonClient>
        </div>
    );
}
