import ProductService from "@services/class/ProductClass";
import { ProductCountProps, ProductFindFirstProps, ProductFindManyProps, ProductFindUniqueProps } from "@services/types/ProductType";
import { cacheLifeApi } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";

export const ProductFindManyCached = async <T extends ProductFindManyProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/product");
    return ProductService.findMany<T>(params);
};

export const ProductFindFirstCached = async <T extends ProductFindFirstProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/product/first");
    return ProductService.findFirst<T>(params);
};

export const ProductFindUniqueCached = async <T extends ProductFindUniqueProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/product/unique");
    return ProductService.findUnique<T>(params);
};

export const ProductCountCached = async (params: ProductCountProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/product/count");
    return ProductService.count(params);
};
