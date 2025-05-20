"use client";

import { ProductModel } from "@services/types";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useCatalogStore } from "./useCatalogStore";
import isEqual from "lodash/isEqual";

export type CatalogContextType = {
    // State
    productList: ProductModel[] | null;
    productAmount: number | null;
};

export const CatalogContext = createContext<CatalogContextType>({} as CatalogContextType);

type CatalogContextProviderProps = {
    initialData: {
        productList: ProductModel[] | null;
        productAmount: number | null;
    };
    children: ReactNode;
};

export default function CatalogProvider(props: CatalogContextProviderProps) {
    const { initialData, children } = props;

    // Define local states and actions
    const [dataLocalState, setDataLocalState] = useState(initialData);

    // Get store states and actions
    const { dataStore, setDataStore } = useCatalogStore();

    // Initialize store values on first context render
    useEffect(() => {
        if (dataStore === undefined) {
            console.log("Initializing store ✅");
            setDataStore(initialData);
        }
    }, [initialData, dataStore, setDataStore]);

    // Update context when a store state change
    useEffect(() => {
        const areTheSame = isEqual(dataStore, dataLocalState);
        if (dataStore !== undefined && !areTheSame) {
            console.log("Updating context 🔄");
            setDataLocalState(dataStore);
        }
    }, [dataStore, dataLocalState, setDataLocalState]);

    // Provide only the local state, but do not provide local actions
    return <CatalogContext.Provider value={dataLocalState}>{children}</CatalogContext.Provider>;
}
