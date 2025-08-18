"use client";

import Input from "@comps/ui/input";
import { usePageQueryParams, useSearchQueryParams } from "./queryParamsClientHooks";

export default function SearchFilter() {
    const { search, setSearch } = useSearchQueryParams();

    const { setPage } = usePageQueryParams();

    const handleChange = () => {
        setPage(1);
    };

    return (
        <Input
            label="Rechercher"
            placeholder="Rechercher"
            classLabel="text-white"
            afterChange={handleChange}
            setValue={setSearch}
            value={search}
        />
    );
}
