"use client";

import Select from "@comps/ui/select/select";
import { usePriceOrderQueryParams } from "./queryParamsClientHooks";

export default function PriceOrderFilter() {
    const { priceOrder, setPriceOrder } = usePriceOrderQueryParams();

    return (
        <Select
            label="Trier par prix"
            placeholder="Non trié"
            className={{ label: "text-white" }}
            options={[
                { label: "Prix croissant", slug: "asc" },
                { label: "Prix décroissant", slug: "desc" },
            ]}
            setSelected={(value) => {
                if (value === "") setPriceOrder("not");
                else setPriceOrder(value as "asc" | "desc");
            }}
            selected={priceOrder}
        />
    );
}
