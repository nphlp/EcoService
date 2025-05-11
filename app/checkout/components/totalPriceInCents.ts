import { LocalBasket } from "@comps/basket/basketType";

/**
 * A safe javascript function to calculate the total price of a basket in cents
 */
export const totalPriceInCents = (basket: LocalBasket) => {
    return Math.trunc(basket.items.reduce((acc, product) => acc + product.price * product.quantity, 0) * 100);
};
