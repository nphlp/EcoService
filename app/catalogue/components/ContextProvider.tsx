"use client";

import { ProductType } from "@actions/types/Product";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useCatalogueStore } from "./useCatalogueStore";

export type CatalogueContextType = {
    // State
    productListLocal: ProductType[] | null;
    productAmountLocal: number | null;
};

export const CatalogueContext = createContext<CatalogueContextType>({} as CatalogueContextType);

type CatalogueContextProviderProps = {
    productList: ProductType[] | null;
    productAmount: number | null;
    children: ReactNode;
};

export default function CatalogueContextProvider(props: CatalogueContextProviderProps) {
    const { productList: productListInit, productAmount: productAmountInit, children } = props;

    // Define local states and actions
    const [productListLocal, setProductListLocal] = useState<ProductType[] | null>(productListInit);
    const [productAmountLocal, setProductAmountLocal] = useState<number | null>(productAmountInit);

    // Get store states and actions
    const { productList, productAmount, setProductList, setProductAmount } = useCatalogueStore((state) => state);

    // Initialize store values on first context render
    useEffect(() => {
        if (productList === undefined || productAmount === undefined) {
            console.log("Initializing store values on first context render...");
            setProductList(productListInit);
            setProductAmount(productAmountInit);
        }
    }, [productListInit, productAmountInit, productList, productAmount, setProductList, setProductAmount]);

    // Update context when a store state change
    useEffect(() => {
        if (productList !== undefined && productAmount !== undefined) {
            console.log("Updating context when a store state change...");
            setProductListLocal(productList);
            setProductAmountLocal(productAmount);
        }
    }, [productList, productAmount, setProductListLocal, setProductAmountLocal]);

    // Provide only the local state, but do not provide local actions
    return (
        <CatalogueContext.Provider
            value={{
                productListLocal,
                productAmountLocal,
            }}
        >
            {children}
        </CatalogueContext.Provider>
    );
}
