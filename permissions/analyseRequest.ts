import { Session, getSession } from "@lib/auth-server";
import { decodeParams } from "@utils/url-parsers";
import { NextRequest } from "next/server";
import { hasPermission } from "./hasPermissions";
import { getMethodFromPathname, getModel } from "./permissionsUtils";

export const analyseRequest = async (request: NextRequest) => {
    // Get headers and pathname
    const pathname = request.nextUrl.pathname;

    // Get session
    const session = await getSession();

    const isStripeRequest = pathname.startsWith("/api/stripe");
    if (isStripeRequest) return parseStripeRequest({ session, request });

    const isApiRequest = pathname.startsWith("/api/internal");
    if (isApiRequest) return await parseApiRequest({ session, request });

    // If the case is not covered, return false
    return true;
};

type PermissionsArgs = {
    session: Session;
    request: NextRequest;
};

/**
 * Stripe requests (GET and POST)
 */
export const parseStripeRequest = (props: PermissionsArgs) => {
    const { session, request } = props;
    console.log("==> 💰 StripePermissions =", session, request.url);

    // TODO: add checks for stripe requests
    return true;
};

/**
 * API fetches (GET requests)
 */
export const parseApiRequest = async (props: PermissionsArgs) => {
    const { session, request } = props;

    // Get pathname
    const pathname = request.nextUrl.pathname;

    // Get model from pathname
    const model = getModel(pathname);
    if (!model) return true;

    // Get params from request
    const params = decodeParams(request.nextUrl.searchParams);

    // Get method from pathname
    const method = getMethodFromPathname(pathname, params, session);

    // Check permissions
    const isAuthorized = await hasPermission(session, { [model]: [method] });

    if (isAuthorized) return true;

    return false;
};
