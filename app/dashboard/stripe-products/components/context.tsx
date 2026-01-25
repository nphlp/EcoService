"use client";

import { createContext } from "react";

export type ContextType = {
    itemsAmount: number | undefined;
    isLoading: boolean;
};

const initialContextData: ContextType = {
    itemsAmount: 0,
    isLoading: false,
};

export const Context = createContext<ContextType>(initialContextData);
