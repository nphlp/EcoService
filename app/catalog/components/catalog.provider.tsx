"use client";

import { ProductModel } from "@class/ProductClass";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useCatalogStore } from "./useCatalogStore";

export type CatalogContextType = {
    // State
    productListLocal: ProductModel[] | null;
    productAmountLocal: number | null;
};

export const CatalogContext = createContext<CatalogContextType>({} as CatalogContextType);

type CatalogContextProviderProps = {
    productList: ProductModel[] | null;
    productAmount: number | null;
    children: ReactNode;
};

export default function CatalogProvider(props: CatalogContextProviderProps) {
    const { productList: productListInit, productAmount: productAmountInit, children } = props;

    // Define local states and actions
    const [productListLocal, setProductListLocal] = useState<ProductModel[] | null>(productListInit);
    const [productAmountLocal, setProductAmountLocal] = useState<number | null>(productAmountInit);

    // Get store states and actions
    const { productList, productAmount, setProductList, setProductAmount } = useCatalogStore((state) => state);

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
        <CatalogContext.Provider
            value={{
                productListLocal,
                productAmountLocal,
            }}
        >
            {children}
        </CatalogContext.Provider>
    );
}
