import { Fetch } from "@utils/Fetch/Fetch";

export const getBasket = async () => {
    const basket = await Fetch({
        route: "/external/basket",
    });

    return basket;
};
