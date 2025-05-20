import { OrderFindMany } from "@actions/OrderAction";
import { Accordion, AccordionButton, AccordionContent } from "@comps/ui/accordion";
import { BetterSessionServer } from "@lib/authServer";

type OrdersAccordionProps = {
    session: NonNullable<BetterSessionServer>;
    index?: number;
};

export default async function OrdersAccordion(props: OrdersAccordionProps) {
    const { session } = props;

    const orderList = await OrderFindMany({
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
            updatedAt: "desc",
        },
    });

    return (
        <Accordion>
            <AccordionButton>
                <div className="text-lg font-bold">Commandes</div>
                <div className="text-xs text-gray-500">Consulter vos commandes en attente de paiement.</div>
            </AccordionButton>
            <AccordionContent>
                <div className="space-y-4">
                    {orderList.length > 0 ? (
                        orderList.map((order, index) => (
                            <div key={index}>
                                <div className="space-y-2">
                                    <div className="text-lg font-bold">Commande n°{index + 1}</div>
                                    <div className="flex flex-row gap-2 text-xs">
                                        <div className="flex flex-row items-center gap-2 rounded-md bg-gray-500 px-2 py-0.5">
                                            <div className="text-gray-300 uppercase">Statut</div>
                                            <div className="font-semibold text-gray-100">
                                                {order.orderStatus[0] + order.orderStatus.slice(1).toLocaleLowerCase()}
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center gap-2 rounded-md bg-gray-500 px-2 py-0.5">
                                            <div className="text-gray-300 uppercase">Paiement</div>
                                            <div className="font-semibold text-gray-100">
                                                {order.paymentStatus[0] +
                                                    order.orderStatus.slice(1).toLocaleLowerCase()}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {order.Quantity.map(({ quantity, Product }, index) => (
                                            <div key={index} className="flex flex-row items-center gap-2">
                                                <div className="text-gray-800">•</div>
                                                <div>{Product.name}</div>
                                                <div className="text-xs text-gray-500">{quantity} pc(s)</div>
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
