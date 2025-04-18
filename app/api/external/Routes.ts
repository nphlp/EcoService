import { LocationProps, LocationResponse } from "./location/route";

export type Routes = {
    "/external/location": {
        method: "GET";
        params: LocationProps;
        response: LocationResponse;
    };
};
