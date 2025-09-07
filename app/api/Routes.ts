import { HealthResponse } from "./health/route";
import { LocationProps, LocationResponse } from "./location/route";
import { type Routes as RoutesStripe } from "./stripe/Routes";

export type Routes = RoutesStripe & {
    "/health": {
        response: HealthResponse;
    };

    "/location": {
        method: "GET";
        params: LocationProps;
        response: LocationResponse;
    };
};
