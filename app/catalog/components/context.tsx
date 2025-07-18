"use client";

import { createContext } from "react";

export type ContextType = {
    productAmount: number | undefined;
    isLoading: boolean;
};

const initialContextData: ContextType = {
    productAmount: 0,
    isLoading: false,
};

export const Context = createContext<ContextType>(initialContextData);
