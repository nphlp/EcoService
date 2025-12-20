import Link from "@comps/UI/button/link";
import { StripeInstance } from "@lib/stripe";
import { OrderFindUniqueAction, OrderUpdateAction } from "@services/actions/OrderAction";
import { CheckCircleIcon, X } from "lucide-react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import BasketCleaner from "./basketCleaner";

type PageProps = {
    searchParams: Promise<{ payment_intent: string }>;
};

export default async function Page(props: PageProps) {
    return (
        <Suspense>
            <SuspendedPage {...props} />
        </Suspense>
    );
}

const SuspendedPage = async (props: PageProps) => {
    await connection();

    const { searchParams } = props;
    const { payment_intent: paymentIntentId } = await searchParams;

    if (!paymentIntentId) redirect("/");

    const paymentIntent = await StripeInstance.paymentIntents.retrieve(paymentIntentId);

    if (!paymentIntent) redirect("/");

    const { status } = paymentIntent;

    const orderId = paymentIntent.metadata.orderId;

    const order = await OrderFindUniqueAction({
        where: { id: orderId },
    });

    if (status === "succeeded" && order) {
        await OrderUpdateAction({
            where: { id: orderId },
            data: {
                orderStatus: "ACCEPTED",
                paymentStatus: "ACCEPTED",
            },
        });

        return (
            <div className="flex h-full flex-col items-center justify-center gap-6">
                <div className="flex flex-row items-center gap-6">
                    <CheckCircleIcon className="size-12" />
                    <div className="text-2xl font-bold">Paiement réussi</div>
                </div>
                <Link label="Voir mes commandes" href="/profile" />

                {/* Clear local basket */}
                <BasketCleaner />
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col items-center justify-center gap-6">
            <div className="flex flex-row items-center gap-6">
                <X className="size-12" />
                <div className="text-2xl font-bold">Paiement non abouti</div>
            </div>
            <Link label="Retourner au panier" href="/checkout" />
        </div>
    );
};
