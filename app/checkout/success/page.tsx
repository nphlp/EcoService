import Link from "@comps/UI/button/link";
import Card from "@comps/UI/card";
import ImageRatio from "@comps/UI/imageRatio";
import { StripeInstance } from "@lib/stripe";
import {
    OrderItem,
    ValidatePaymentProcess,
    ValidatePaymentProcessResponse,
} from "@process/basket/ValidatePaymentProcess";
import { CheckCircle, Package, Receipt, X } from "lucide-react";
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

    if (status === "succeeded" && orderId) {
        const result = await ValidatePaymentProcess({ orderId });

        if (!result.success || !result.order) redirect("/");

        return <SuccessContent order={result.order} />;
    }

    return <FailureContent />;
};

type SuccessContentProps = {
    order: NonNullable<ValidatePaymentProcessResponse["order"]>;
};

const SuccessContent = ({ order }: SuccessContentProps) => {
    const formattedDate = new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "long",
        timeStyle: "short",
    }).format(order.createdAt);

    return (
        <div className="flex w-full max-w-150 flex-col items-center gap-8 px-4 py-7 md:px-7">
            {/* Header */}
            <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="size-10 text-green-600" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Paiement confirmé</h1>
                    <p className="mt-1 text-gray-500">Merci pour votre commande</p>
                </div>
            </div>

            {/* Order Card */}
            <Card className="w-full p-4 md:p-7">
                {/* Order Info */}
                <div className="mb-6 flex flex-col gap-1 border-b border-gray-200 pb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Receipt className="size-4" />
                        <span className="font-semibold">Commande #{order.id.slice(-8).toUpperCase()}</span>
                    </div>
                    <div className="text-sm text-gray-500">{formattedDate}</div>
                </div>

                {/* Products List */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Package className="size-4" />
                        <span>
                            {order.items.length} article{order.items.length > 1 ? "s" : ""}
                        </span>
                    </div>

                    <div className="flex flex-col gap-3">
                        {order.items.map((item) => (
                            <OrderItemRow key={item.productId} item={item} />
                        ))}
                    </div>
                </div>

                {/* Total */}
                <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-gray-900">{order.total.toFixed(2)}</span>
                        <span className="text-lg text-gray-500">€</span>
                    </div>
                </div>
            </Card>

            {/* Actions */}
            <div className="flex flex-col items-center gap-3 md:flex-row">
                <Link label="Voir mes commandes" href="/profile" />
                <Link label="Continuer mes achats" href="/catalog" variant="outline" />
            </div>

            {/* Clear local basket */}
            <BasketCleaner />
        </div>
    );
};

type OrderItemRowProps = {
    item: OrderItem;
};

const OrderItemRow = ({ item }: OrderItemRowProps) => {
    const itemTotal = item.price * item.quantity;

    return (
        <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-2 sm:p-3">
            <ImageRatio src={item.image} alt={item.name} className="size-16 shrink-0 rounded-lg" mode="preloaded" />
            <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-medium text-gray-900 sm:text-base">{item.name}</span>
                <div className="space-x-2">
                    <span className="text-xs text-gray-500 sm:text-sm">{item.price.toFixed(2)} €</span>
                    <span className="rounded-full bg-gray-200 px-2 text-xs sm:text-sm">x{item.quantity}</span>
                </div>
                <span className="shrink-0 text-sm font-semibold text-gray-900 sm:hidden sm:text-base">
                    {itemTotal.toFixed(2)} €
                </span>
            </div>
            <span className="shrink-0 text-sm font-semibold text-gray-900 max-sm:hidden sm:text-base">
                {itemTotal.toFixed(2)} €
            </span>
        </div>
    );
};

const FailureContent = () => {
    return (
        <div className="flex flex-col items-center gap-8 px-4 py-8">
            {/* Header */}
            <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-red-100">
                    <X className="size-10 text-red-600" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Paiement non abouti</h1>
                    <p className="mt-1 text-gray-500">Une erreur est survenue lors du paiement</p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-center gap-3 sm:flex-row">
                <Link label="Retourner au panier" href="/checkout">
                    Retourner au panier
                </Link>
                <Link label="Retour à l'accueil" href="/" variant="outline" />
            </div>
        </div>
    );
};
