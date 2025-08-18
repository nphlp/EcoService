import {
    categoryQueryParser,
    pageQueryParser,
    priceOrderQueryParser,
    searchQueryParser,
    takeQueryParser,
} from "@comps/SHARED/queryParamsServerParsers";
import { useQueryState } from "nuqs";

export const usePriceOrderQueryParams = () => {
    const [priceOrder, setPriceOrder] = useQueryState("priceOrder", priceOrderQueryParser);
    return { priceOrder, setPriceOrder };
};

export const useCategoryQueryParams = () => {
    const [category, setCategory] = useQueryState("category", categoryQueryParser);
    return { category, setCategory };
};

export const usePageQueryParams = () => {
    const [page, setPage] = useQueryState("page", pageQueryParser);
    return { page, setPage };
};

export const useSearchQueryParams = () => {
    const [search, setSearch] = useQueryState("search", searchQueryParser);
    return { search, setSearch };
};

export const useTakeQueryParams = () => {
    const [take, setTake] = useQueryState("take", takeQueryParser);
    return { take, setTake };
};
