"use client";

import { useBasketStore } from "@comps/CORE/basket/basketStore";
import { useEffect } from "react";

export default function BasketCleaner() {
    const { clearLocalBasket } = useBasketStore();

    useEffect(() => {
        clearLocalBasket();
    }, [clearLocalBasket]);

    return null;
}
