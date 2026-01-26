import { HealthResponse } from "./health/route";
import { type Routes as SolidRoutes } from "./solid/Routes";
import { type Routes as StripeRoutes } from "./stripe/Routes";

type SubRoutes<Input> = StripeRoutes & SolidRoutes<Input>;

export type Routes<Input> = SubRoutes<Input> & {
    "/health": () => {
        response: HealthResponse;
    };
};
