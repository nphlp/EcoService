"use client";

import { useBasketStore } from "@comps/Basket/BasketStore";
import ButtonClient from "@comps/client/Button";
import Card from "@comps/server/Card";
import ImageRatio from "@comps/server/ImageRatio";
import Loader from "@comps/ui/Loader";
import { combo } from "@lib/combo";
import { ProductModel } from "@services/types";
import { useFetchV2 } from "@utils/FetchHookV2";
import { CircleCheck, CirclePlus, CircleX, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { MouseEvent, useContext, useEffect } from "react";
import { CatalogContext } from "./catalog.provider";
import { ProductAmountFetchParams, ProductListFetchParams } from "./fetchParams";
import { useCatalogParams } from "./useCatalogParams";
import { useCatalogStore } from "./useCatalogStore";

type CatalogClientProps = {
    className?: string;
};

export default function CatalogClient(props: CatalogClientProps) {
    const { className } = props;

    const { productList: productListLocal } = useContext(CatalogContext);
    const { setDataStore } = useCatalogStore();
    const { priceOrder, page, take, category, search } = useCatalogParams();

    const { data: newProductAmount, isLoading: isLoadingProductAmount } = useFetchV2({
        route: "/product/count",
        params: ProductAmountFetchParams({ category, search }),
    });

    const { data: newProductList, isLoading: isLoadingProductList } = useFetchV2({
        route: "/product",
        params: ProductListFetchParams({ priceOrder, page, take, category, search }),
    });

    useEffect(() => {
        if (newProductList && newProductAmount) {
            setDataStore({
                productList: newProductList,
                productAmount: newProductAmount,
            });
        }
    }, [newProductAmount, newProductList, setDataStore]);

    if (isLoadingProductList || isLoadingProductAmount) {
        return (
            <div className="flex w-full flex-1 items-center justify-center">
                <Loader className="size-8 border-4" />
            </div>
        );
    }

    return <ProductList produitList={productListLocal} className={className} />;
}

type ProductListProps = {
    produitList: ProductModel[] | null;
    className?: string;
};

const ProductList = (props: ProductListProps) => {
    const { produitList, className } = props;

    const { basketProductList, addProductToBasket, removeProductFromBasket } = useBasketStore();

    if (!produitList) {
        return (
            <div className={combo("flex size-full items-center justify-center", className)}>
                Aucun produit disponible pour le moment.
            </div>
        );
    }

    const handleClick = (e: MouseEvent<HTMLButtonElement>, newId: string) => {
        e.preventDefault();

        const product = produitList.find((product) => product.id === newId);
        if (!product) return;

        if (basketProductList.some((currentId) => currentId === newId)) {
            removeProductFromBasket(newId);
        } else {
            addProductToBasket(newId);
        }
    };

    return (
        <div className={combo("grid grid-cols-1 gap-5 overflow-y-auto sm:grid-cols-2 lg:grid-cols-4", className)}>
            {produitList.map(({ id, name, image, price }, index) => (
                <Link
                    key={index}
                    href={`/product/${id}`}
                    className="ring-transparent outline-none focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-teal-400"
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
                                {basketProductList.some((currentId) => currentId === id) ? (
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
