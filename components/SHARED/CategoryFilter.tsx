"use client";

import Select from "@comps/ui/select/select";
import { SelectOptionType } from "@comps/ui/select/utils";
import { useQueryState } from "nuqs";
import { usePageQueryParams } from "./PaginationFilter";
import { categoryQueryParser } from "./serverQueryParsers";

export const useCategoryQueryParams = () => {
    const [category, setCategory] = useQueryState("category", categoryQueryParser);
    return { category, setCategory };
};

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
