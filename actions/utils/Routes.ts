import { ProductType, SelectProductListProps } from "@actions/types/Product";

export type Routes = {
    "/products": {
        params: SelectProductListProps | undefined;
        response: ProductType[] | null;
    };
};


