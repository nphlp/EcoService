"use client";

import Select from "@comps/ui/select/select";
import { useQueryState } from "nuqs";
import { usePageQueryParams } from "./PaginationFilter";
import { takeQueryParser } from "./serverQueryParsers";

export const useTakeQueryParams = () => {
    const [take, setTake] = useQueryState("take", takeQueryParser);
    return { take, setTake };
};

export default function TakeFilter() {
    const { take, setTake } = useTakeQueryParams();
    const { setPage } = usePageQueryParams();

    return (
        <Select
            label="Produits par page"
            className={{ label: "text-white" }}
            options={[
                { label: "10", slug: "10" },
                { label: "20", slug: "20" },
                { label: "50", slug: "50" },
                { label: "100", slug: "100" },
            ]}
            setSelected={(value) => {
                setTake(Number(value) as 10 | 20 | 50 | 100);
                setPage(1);
            }}
            selected={String(take)}
            canNotBeEmpty
        />
    );
}
