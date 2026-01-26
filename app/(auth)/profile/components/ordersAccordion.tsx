import { Accordion, AccordionButton, AccordionContent } from "@comps/UI/accordion";
import { Session } from "@lib/auth-server";
import { combo } from "@lib/combo";
import { OrderStatus, PaymentStatus } from "@prisma/client/client";
import { OrderFindManyAction } from "@services/actions/OrderAction";

type OrdersAccordionProps = {
    session: NonNullable<Session>;
    index?: number;
};

const orderStatusLabels: Record<OrderStatus, string> = {
    PENDING: "En attente",
    ACCEPTED: "Acceptée",
    PREPARING: "En préparation",
    DELIVERING: "En livraison",
    COMPLETED: "Livrée",
    CANCELLED: "Annulée",
    RETURNING: "En retour",
    REFOUNDED: "Remboursée",
};

const paymentStatusLabels: Record<PaymentStatus, string> = {
    PENDING: "En attente",
    ACCEPTED: "Payé",
    REFUSED: "Refusé",
    REFUNDED: "Remboursé",
};

const orderStatusColors: Record<OrderStatus, string> = {
    PENDING: "bg-amber-500",
    ACCEPTED: "bg-green-600",
    PREPARING: "bg-blue-500",
    DELIVERING: "bg-indigo-500",
    COMPLETED: "bg-emerald-600",
    CANCELLED: "bg-gray-500",
    RETURNING: "bg-orange-500",
    REFOUNDED: "bg-purple-500",
};

const paymentStatusColors: Record<PaymentStatus, string> = {
    PENDING: "bg-amber-500",
    ACCEPTED: "bg-green-600",
    REFUSED: "bg-red-500",
    REFUNDED: "bg-purple-500",
};

export default async function OrdersAccordion(props: OrdersAccordionProps) {
    const { session } = props;

    const orderList = await OrderFindManyAction(
        {
            where: {
                userId: session.user.id,
                orderStatus: { not: "PENDING" },
                paymentStatus: { not: "PENDING" },
            },
            include: {
                Quantity: {
                    include: {
                        Product: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        },
        true, // Disable safe message
    );

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat("fr-FR", {
            dateStyle: "long",
            timeStyle: "short",
        }).format(date);
    };

    return (
        <Accordion>
            <AccordionButton>
                <div className="text-lg font-bold">Commandes</div>
                <div className="text-xs text-gray-500">Consulter l&apos;historique de vos commandes.</div>
            </AccordionButton>
            <AccordionContent>
                <div className="space-y-4">
                    {orderList.length > 0 ? (
                        orderList.map((order, index) => (
                            <div key={index} className="rounded-lg bg-gray-50 p-4">
                                <div className="space-y-3">
                                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="text-base font-bold">
                                            Commande #{order.id.slice(-8).toUpperCase()}
                                        </div>
                                        <div className="text-xs text-gray-500">{formatDate(order.createdAt)}</div>
                                    </div>
                                    <div className="flex flex-row flex-wrap gap-2 text-xs">
                                        <div
                                            className={combo(
                                                "flex flex-row items-center gap-2 rounded-md px-2 py-0.5",
                                                orderStatusColors[order.orderStatus],
                                            )}
                                        >
                                            <div className="text-white/70 uppercase">Statut</div>
                                            <div className="font-semibold text-white">
                                                {orderStatusLabels[order.orderStatus]}
                                            </div>
                                        </div>
                                        <div
                                            className={combo(
                                                "flex flex-row items-center gap-2 rounded-md px-2 py-0.5",
                                                paymentStatusColors[order.paymentStatus],
                                            )}
                                        >
                                            <div className="text-white/70 uppercase">Paiement</div>
                                            <div className="font-semibold text-white">
                                                {paymentStatusLabels[order.paymentStatus]}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        {order.Quantity.map(({ quantity, Product }, index) => (
                                            <div key={index} className="flex flex-row items-center gap-2 text-sm">
                                                <div className="text-gray-400">•</div>
                                                <div className="text-gray-700">{Product.name}</div>
                                                <div className="text-xs text-gray-500">x{quantity}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500">Aucune commande trouvée</div>
                    )}
                </div>
            </AccordionContent>
        </Accordion>
    );
}
