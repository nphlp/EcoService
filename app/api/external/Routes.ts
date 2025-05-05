import { BasketResponse } from "./basket/route";
import { LocationProps, LocationResponse } from "./location/route";

export type Routes = {
    "/external/location": {
        method: "GET";
        params: LocationProps;
        response: LocationResponse;
    };

    "/external/basket": {
        response: BasketResponse;
    };
};
