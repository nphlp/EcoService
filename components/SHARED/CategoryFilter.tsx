"use client";

import Select from "@comps/UI/select/select";
import { SelectOptionType } from "@comps/UI/select/utils";
import { useCategoryQueryParams, usePageQueryParams } from "./queryParamsClientHooks";

type CategoryFilterProps = {
    categoryOptions: SelectOptionType[];
};

export default function CategoryFilter(props: CategoryFilterProps) {
    const { categoryOptions } = props;

    const { category, setCategory } = useCategoryQueryParams();
    const { setPage } = usePageQueryParams();

    return (
        <Select
            label="Catégorie"
            className={{ label: "text-white" }}
            options={categoryOptions}
            setSelected={(value) => {
                setCategory(value);
                setPage(1);
            }}
            selected={category}
        />
    );
}
