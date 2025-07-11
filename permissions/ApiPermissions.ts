import { BetterSessionServer } from "@lib/authServer";
import { NextRequest } from "next/server";
import { getModel, getMethod, getRole } from "./PermissionsUtils";
import { parseAndDecodeParams } from "@utils/FetchConfig";
import { globalPermissions } from "./PermissionsConfig";

type PermissionsArgs = {
    session: BetterSessionServer | null;
    request: NextRequest;
};

/**
 * Stripe requests (GET and POST)
 */
export const StripePermissions = (props: PermissionsArgs) => {
    const { session, request } = props;
    console.log("==> 💰 StripePermissions =", session, request);

    // TODO: add checks for stripe requests
    return true;
};

/**
 * API fetches (GET requests)
 */
export const ApiPermsisions = async (props: PermissionsArgs) => {
    const { session, request } = props;
    console.log("==> 📡 ApiPermsisions =", session, request);

    const pathname = request.nextUrl.pathname;

    const role = getRole(session);
    const userId = session?.user.id;

    // Get model from pathname
    const model = getModel(pathname);
    if (!model) return true;

    // Get method from pathname
    const { method, methodForHimOnly } = getMethod(pathname);

    // Get params from request
    const params = parseAndDecodeParams(request);

    // Check permissions
    const authorizedMethods = globalPermissions[role][model];
    const hasPermission = authorizedMethods.includes(method);
    const hasPermissionForHimOnly = authorizedMethods.includes(methodForHimOnly);

    // Has full permission
    if (hasPermission) return true;

    // Has permission for him only
    if (hasPermissionForHimOnly) return params?.where?.id === userId;

    // Has not permission
    return false;
};
