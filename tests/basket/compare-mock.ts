import { LocalBasket, LocalBasketItem, ServerBasketItem } from "@comps/basket/basketType";
import { Order } from "@prisma/client";
import { GetServerBasketResponse } from "@process/basket/GetServerBasket";

/** Server item 1 */
export const serverItem1: ServerBasketItem = {
    productId: "product-123",
    name: "Produit test",
    description: "Description du produit",
    price: 10,
    image: "image.jpg",
    quantityId: "quantity-123",
    quantity: 1,
};

/** Server item 2 */
export const serverItem2: ServerBasketItem = {
    productId: "product-456",
    name: "Produit test 2",
    description: "Description du produit 2",
    price: 20,
    image: "image2.jpg",
    quantityId: "quantity-456",
    quantity: 1,
};

/** Local item 1 */
export const localItem1: LocalBasketItem = {
    productId: "product-123",
    name: "Produit test",
    description: "Description du produit",
    price: 10,
    image: "image.jpg",
    quantity: 1,
};

/** Local item 2 */
export const localItem2: LocalBasketItem = {
    productId: "product-456",
    name: "Produit test 2",
    description: "Description du produit 2",
    price: 20,
    image: "image2.jpg",
    quantity: 1,
};

type OrderStatus = { paymentStatus: Order["paymentStatus"]; orderStatus: Order["orderStatus"] };
const pendingStatus: OrderStatus = { paymentStatus: "PENDING", orderStatus: "PENDING" };
const acceptedStatus: OrderStatus = { paymentStatus: "ACCEPTED", orderStatus: "ACCEPTED" };

// ===== SERVER BASKET ===== //

/** Server basket */
export const serverBasket: GetServerBasketResponse = {
    orderId: "order-123",
    items: [serverItem1, serverItem2],
    ...pendingStatus,
};

/** Server basket */
export const serverBasketLessItems: GetServerBasketResponse = {
    orderId: "order-123",
    items: [serverItem1],
    ...pendingStatus,
};

/** Empty server basket */
export const emptyServerBasket: GetServerBasketResponse = {
    orderId: "order-123",
    items: [],
    ...pendingStatus,
};

/** Server basket */
export const serverBasketStatusAccepted: GetServerBasketResponse = {
    orderId: "order-123",
    items: [serverItem1, serverItem2],
    ...acceptedStatus,
};

// ===== LOCAL BASKET ===== //

/** Local basket with orderId */
export const localBasketOrderId: LocalBasket | null = { orderId: "order-123", items: [localItem1, localItem2] };

/** Empty local basket with orderId */
export const emptyLocalBasketOrderId: LocalBasket | null = { orderId: "order-123", items: [] };
