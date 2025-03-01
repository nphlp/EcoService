"use client";

import { ProductType } from "@actions/types/Product";
import { Options, useQueryState } from "nuqs";
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useEffect,
    useState
} from "react";
import { useCatalogueStore } from "./CatalogueStore";
import {
    CategoryParam,
    CategoryParamType,
    ItemsPerPageParam,
    ItemsPerPageParamType,
    PageParam,
    PageParamType,
    PriceOrderParam,
    PriceOrderParamType,
    SearchParam,
    SearchParamType,
} from "./FilterTypes";

/** UseQueryState setter function type */
type SetterFunction<T> = (
    value: T | ((old: T) => T),
    options?: Options | undefined,
) => Promise<URLSearchParams>;

export type FilterState = {
    // Use State
    productList: ProductType[] | "isLoading" | null;
    productAmount: number;

    // Use Query State
    priceOrder: PriceOrderParamType["priceOrder"];
    page: PageParamType["page"];
    take: ItemsPerPageParamType["take"];
    category: CategoryParamType["category"];
    search: SearchParamType["search"];
};

export type FilterActions = {
    // Use State
    setProductList: Dispatch<
        SetStateAction<ProductType[] | "isLoading" | null>
    >;
    setProductAmount: Dispatch<SetStateAction<number>>;

    // Use Query State
    setPriceOrder: SetterFunction<PriceOrderParamType["priceOrder"]>;
    setPage: SetterFunction<PageParamType["page"]>;
    setTake: SetterFunction<ItemsPerPageParamType["take"]>;
    setCategory: SetterFunction<CategoryParamType["category"]>;
    setSearch: SetterFunction<SearchParamType["search"]>;
};

export type FilterContextType = FilterState & FilterActions;

export const FilterContext = createContext<FilterContextType>(
    {} as FilterContextType,
);

type FilterProviderProps = {
    productList: ProductType[] | null;
    productAmount: number;
    children: ReactNode;
};

export default function FilterProvider(props: FilterProviderProps) {
    const {
        productList: productListInit,
        productAmount: productAmountInit,
        children,
    } = props;

    // Use State (Context)
    const [productList, setProductList] = useState<
        ProductType[] | null | "isLoading"
    >(productListInit);
    const [productAmount, setProductAmount] =
        useState<number>(productAmountInit);

    // Use Query State (Context)
    const [priceOrder, setPriceOrder] = useQueryState(
        "priceOrder",
        PriceOrderParam["priceOrder"],
    );
    const [page, setPage] = useQueryState("page", PageParam["page"]);
    const [take, setTake] = useQueryState("take", ItemsPerPageParam["take"]);
    const [category, setCategory] = useQueryState(
        "category",
        CategoryParam["category"],
    );
    const [search, setSearch] = useQueryState("search", SearchParam["search"]);

    const {
        // Use State (Store)
        productListStore,
        productAmountStore,
        setProductListStore,
        setProductAmountStore,

        // Use Query State (Store)
        priceOrderStore,
        pageStore,
        takeStore,
        categoryStore,
        searchStore,
        setPriceOrderStore,
        setPageStore,
        setTakeStore,
        setCategoryStore,
        setSearchStore,
    } = useCatalogueStore();

    // Initialize store values on first context render
    useEffect(() => {
        if (
            productListStore === undefined ||
            productAmountStore === undefined ||
            priceOrderStore === undefined ||
            pageStore === undefined ||
            takeStore === undefined ||
            categoryStore === undefined ||
            searchStore === undefined
        ) {
            console.log("Initializing store values on first context render...");
            setProductListStore(productListInit);
            setProductAmountStore(productAmountInit);
            setPriceOrderStore(priceOrder);
            setPageStore(page);
            setTakeStore(take);
            setCategoryStore(category);
            setSearchStore(search);
        }
    }, [
        productListStore,
        productAmountStore,
        priceOrderStore,
        pageStore,
        takeStore,
        categoryStore,
        searchStore,
        productListInit,
        productAmountInit,
        priceOrder,
        page,
        take,
        category,
        search,
        setProductListStore,
        setProductAmountStore,
        setPriceOrderStore,
        setPageStore,
        setTakeStore,
        setCategoryStore,
        setSearchStore
    ]);

    // Update context when a store state change
    useEffect(() => {
        if (
            productListStore !== undefined &&
            productAmountStore !== undefined &&
            priceOrderStore !== undefined &&
            pageStore !== undefined &&
            takeStore !== undefined &&
            categoryStore !== undefined &&
            searchStore !== undefined
        ) {
            console.log("Updating context when a store state change...");
            setProductList(productListStore);
            setProductAmount(productAmountStore);
            setPriceOrder(priceOrderStore);
            setPage(pageStore);
            setTake(takeStore);
            setCategory(categoryStore);
            setSearch(searchStore);
        }
    }, [
        productListStore,
        productAmountStore,
        priceOrderStore,
        pageStore,
        takeStore,
        categoryStore,
        searchStore,
        setProductList,
        setProductAmount,
        setPriceOrder,
        setPage,
        setTake,
        setCategory,
        setSearch,
    ]);

    return (
        <FilterContext.Provider
            value={{
                productList,
                setProductList,
                productAmount,
                setProductAmount,
                priceOrder,
                setPriceOrder,
                page,
                setPage,
                take,
                setTake,
                category,
                setCategory,
                search,
                setSearch,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
}
