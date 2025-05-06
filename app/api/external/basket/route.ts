import { CreateOrder } from "@actions/OrderAction";
import { Basket } from "@comps/basket/basketType";
import { GetSession } from "@lib/authServer";
import { ResponseFormat } from "@utils/FetchConfig";
import { FetchV2 } from "@utils/FetchV2/FetchV2";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export type BasketResponse = Basket | null;

export async function GET(): Promise<NextResponse<ResponseFormat<BasketResponse>>> {
    try {
        const session = await GetSession();

        if (!session) {
            return NextResponse.json({ data: null }, { status: 200 });
        }

        const userId = session.user.id;

        const order = await FetchV2({
            route: "/order/first",
            params: {
                where: {
                    userId,
                    orderStatus: "PENDING",
                    paymentStatus: "PENDING",
                },
                include: {
                    Quantity: {
                        include: {
                            Product: true,
                        },
                    },
                },
            },
        });

        console.log("Order ->", order);

        if (order) {
            const basket: Basket = {
                userId,
                orderId: order.id,
                items: order.Quantity.map(({ id, quantity, Product }) => ({
                    /// Product
                    productId: Product.id,
                    name: Product.name,
                    description: Product.description,
                    price: Product.price,
                    image: Product.image,
                    /// Quantity
                    quantity,
                    quatityId: id,
                })),
            };

            return NextResponse.json({ data: basket }, { status: 200 });
        }

        const newOrder = await CreateOrder({
            data: {
                userId,
            },
        });

        const newBasket: Basket = {
            userId,
            orderId: newOrder.id,
            items: [],
        };

        return NextResponse.json({ data: newBasket }, { status: 200 });
    } catch (error) {
        console.error("Basket -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "Basket -> Invalid Zod params -> " + error.message });
            return NextResponse.json({ error: "Basket -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}
