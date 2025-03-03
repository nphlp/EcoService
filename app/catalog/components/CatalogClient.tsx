"use client";

import { ProductType } from "@actions/types/Product";
import { useFetch } from "@actions/utils/FetchHook";
import { useBasketStore } from "@comps/Basket/BasketStore";
import ButtonClient from "@comps/client/Button";
import Card from "@comps/server/Card";
import ImageRatio from "@comps/server/ImageRatio";
import Loader from "@comps/server/Loader";
import { combo } from "@lib/combo";
import { CircleCheck, CirclePlus, CircleX, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { MouseEvent, useContext, useEffect } from "react";
import { CatalogContext } from "./ContextProvider";
import { useCatalogParams } from "./useCatalogParams";
import { useCatalogStore } from "./useCatalogStore";

export default function CatalogClient() {
    const { productListLocal } = useContext(CatalogContext);
    const { setProductList, setProductAmount } = useCatalogStore();
    const { priceOrder, page, take, category, search } = useCatalogParams();

    const { data: newProductList, isLoading: isLoadingProductList } = useFetch({
        route: "/products",
        firstFetch: false,
        params: {
            orderBy: priceOrder !== "not" ? { price: priceOrder } : undefined,
            skip: page > 1 ? (page - 1) * take : undefined,
            take,
            where: {
                ...(category && { categoryId: category }),
                ...(search && {
                    name: {
                        contains: search,
                    },
                }),
            },
        },
    });

    const { data: newProductAmount, isLoading: isLoadingProductAmount } = useFetch({
        route: "/products/count",
        firstFetch: false,
        params: {
            where: category ? { categoryId: category } : undefined,
        },
    });

    useEffect(() => {
        setProductList(newProductList);
        setProductAmount(newProductAmount);
    }, [newProductAmount, newProductList, setProductList, setProductAmount]);

    if (isLoadingProductList || isLoadingProductAmount) {
        return (
            <div className="flex w-full flex-1 items-center justify-center px-4">
                <Loader className="size-8 border-4" />
            </div>
        );
    }

    return <ProductList produitList={productListLocal} />;
}

type ProductListProps = {
    produitList: ProductType[] | null;
};

const ProductList = (props: ProductListProps) => {
    const { produitList } = props;

    const { basketProductList, addProductToBasket, removeProductFromBasket } = useBasketStore();
    console.log(basketProductList);

    if (!produitList) {
        return (
            <div className="flex size-full items-center justify-center">Aucun produit disponible pour le moment.</div>
        );
    }

    const handleClick = (e: MouseEvent<HTMLButtonElement>, id: string) => {
        e.preventDefault();

        const product = produitList.find((product) => product.id === id);
        if (!product) return;

        if (basketProductList.some((product) => product.id === id)) {
            removeProductFromBasket(product);
        } else {
            addProductToBasket(product);
        }
    };

    return (
        <div className={combo("grid grid-cols-1 gap-4 overflow-y-auto px-6 pb-6 sm:grid-cols-2 lg:grid-cols-4")}>
            {produitList.map(({ id, name, image, price }, index) => (
                <Link
                    key={index}
                    href={`/product/${id}`}
                    className="outline-none ring-transparent focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-teal-400"
                >
                    <Card className="overflow-hidden p-0">
                        <ImageRatio src={image} alt={name} />
                        <div className="flex flex-row items-center justify-between p-4">
                            <div>
                                <div className="text-lg font-bold">{name}</div>
                                <div className="text-sm text-gray-500">{price} €</div>
                            </div>
                            <ButtonClient
                                type="button"
                                label="add-to-basket"
                                onClick={(e) => handleClick(e, id)}
                                className="group relative size-fit rounded-xl p-[10px] transition-all duration-300 hover:scale-105"
                            >
                                {basketProductList.some((product) => product.id === id) ? (
                                    <>
                                        <CircleCheck className="group-hover:hidden" />
                                        <CircleX className="hidden group-hover:block" />
                                    </>
                                ) : (
                                    <>
                                        <CirclePlus className="absolute translate-x-[45%] translate-y-[-35%] scale-[0.8] fill-white stroke-black stroke-[3px]" />
                                        <ShoppingCart />
                                    </>
                                )}
                            </ButtonClient>
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
    );
};
