"use client";

import { ReactNode } from "react";
import { Context } from "./context";

type ProviderProps = {
    itemsAmount: number;
    children: ReactNode;
};

export default function Provider(props: ProviderProps) {
    const { itemsAmount, children } = props;

    const value = { itemsAmount, isLoading: false };

    return <Context.Provider value={value}>{children}</Context.Provider>;
}
