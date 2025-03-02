"use client";

import { ProductType } from "@actions/types/Product";
import { useFetch } from "@actions/utils/FetchHook";
import ButtonClient from "@comps/client/Button";
import { useEffect, useState } from "react";

type ClientProps = {    
    productList: ProductType[] | null;
};

export default function Client(props: ClientProps) {
    const { productList: productListInit } = props;

    const [productList, setProductList] = useState<ProductType[] | null>(productListInit);
    const [count, setCount] = useState(1);

    const { data, isLoading } = useFetch({ route: "/products", params: { take: count } });

    useEffect(() => {
        if (data) {
            setProductList(data);
        }
    }, [data]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <div>
        <ButtonClient label="Hello" type="button" onClick={() => {
            setCount(count + 1);
        }}>
            +1
        </ButtonClient>

        {productList?.map((product) => (
            <div key={product.id}>
                {product.name}
            </div>
        ))}
    </div>;
}
