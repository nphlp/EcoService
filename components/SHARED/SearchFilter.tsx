"use client";

import Input, { InputClassName } from "@comps/UI/input/input";
import { usePageQueryParams, useSearchQueryParams } from "./queryParamsClientHooks";

type SearchFilterProps = {
    className?: InputClassName;
    noLabel?: boolean;
};

export default function SearchFilter(props: SearchFilterProps) {
    const { noLabel, className } = props;

    const { search, setSearch } = useSearchQueryParams();

    const { setPage } = usePageQueryParams();

    const handleChange = () => {
        setPage(1);
    };

    return (
        <Input
            label="Rechercher"
            placeholder="Rechercher"
            className={className}
            afterChange={handleChange}
            setValue={setSearch}
            value={search}
            noLabel={noLabel}
        />
    );
}
