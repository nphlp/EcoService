import { $Enums, Prisma } from "@prisma/client";
// import { Operation } from "@prisma/client/runtime/library";
import { parseAndDecodeParams } from "@utils/FetchConfig";
import { NextRequest } from "next/server";
import { BetterSessionServer, GetSession } from "../lib/authServer";

// =============================== //
// ====== Types Operations ======= //
// =============================== //

// Raw operations form Prisma
// type Operations = Operation;

// Select only available methods in the app/services
// type Find = "findFirst" | "findUnique" | "findMany";
// type Create = "create" | "createMany";
// type Upsert = "upsert" | "upsertMany";
// type Update = "update" | "updateMany";
// type Delete = "delete" | "deleteMany";
// type Count = "count";

// Important types
type Roles = $Enums.Role | "NON_LOGGED";
type Models = Prisma.ModelName;
type Methods = "many" | "many-HO" | "first" | "first-HO" | "unique" | "unique-HO" | "count" | "count-HO";
type Permissions = { [value in Models]: Methods[] };

// =============================== //
// ======== Configuration ======== //
// =============================== //

// Default
const NON_LOGGED: Permissions = {
    Account: [],
    Address: [],
    Article: ["many", "unique"],
    Category: ["many", "unique"],
    Content: ["many", "unique"],
    Diy: ["many", "unique"],
    Fruit: [],
    Order: [],
    Product: ["many", "unique"],
    Quantity: [],
    Session: [],
    User: [],
    Verification: [],
};

const USER: Permissions = {
    // Inherit from NON_LOGGED
    ...NON_LOGGED,

    // Override with
    // User: ["unique-HO"],
};

const VENDOR: Permissions = {
    // Inherit from USER
    ...USER,

    // Override with
    Article: [],
};

const EMPLOYEE: Permissions = {
    // Inherit from VENDOR
    ...VENDOR,

    // Override with
    Product: [],
};

const ADMIN: Permissions = {
    // Inherit from EMPLOYEE
    ...EMPLOYEE,

    // Override with
    User: ["many"],
};

// =============================== //
// ============ Utils ============ //
// =============================== //

const getModel = (pathname: string): Models | null => {
    const model = pathname.split("/")[3];
    if (!model) return null;
    return (model.charAt(0).toUpperCase() + model.slice(1)) as Models;
};

const getMethod = (pathname: string): { method: Methods; methodForHimOnly: Methods } => {
    const method = pathname.split("/")[4] ?? "findMany";
    const methodForHimOnly = method + "-HO";
    return { method: method as Methods, methodForHimOnly: methodForHimOnly as Methods };
};

// Types
type GlobalPermissions = { [value in Roles]: Permissions };

// Permissions
const permissions: GlobalPermissions = { NON_LOGGED, USER, VENDOR, EMPLOYEE, ADMIN };

// Check permissions
export const hasPermission = async (request: NextRequest): Promise<boolean> => {
    // Get headers and pathname
    const headers = request.headers;
    const pathname = request.nextUrl.pathname;

    // Get session
    const session = await GetSession();

    const isStripeRequest = pathname.startsWith("/api/stripe");
    if (isStripeRequest) return StripePermissions({ session, request });

    const isServerAction = headers.get("next-action");
    if (isServerAction) return ActionPermissions();

    const isApiRequest = pathname.startsWith("/api/internal");
    if (isApiRequest) return ApiPermsisions({ session, request });

    // If the case is not covered, return false
    return true;
};

type PermissionsArgs = {
    session: BetterSessionServer | null;
    request: NextRequest;
};

/**
 * Stripe requests (GET and POST)
 */
const StripePermissions = (props: PermissionsArgs) => {
    const { session, request } = props;
    console.log("==> 💰 StripePermissions =", session, request);

    // TODO: add checks for stripe requests
    return true;
};

/**
 * Server Actions (POST requests)
 */
const ActionPermissions = () => {
    return true;
};

/**
 * API fetches (GET requests)
 */
const ApiPermsisions = (props: PermissionsArgs) => {
    const { session, request } = props;
    console.log("==> 📡 ApiPermsisions =", session, request);

    const pathname = request.nextUrl.pathname;
    const role: Roles = session?.user.role ?? "NON_LOGGED";
    const userId = session?.user.id;

    // Get model from pathname
    const model = getModel(pathname);
    if (!model) return true;

    // Get method from pathname
    const { method, methodForHimOnly } = getMethod(pathname);

    // Get params from request
    const params = parseAndDecodeParams(request);

    // Check permissions
    const rolePermissions = permissions[role][model];
    const hasPermission = rolePermissions.includes(method);
    const hasPermissionForHimOnly = rolePermissions.includes(methodForHimOnly);

    console.log(
        "┏━",
        pathname,
        "\n┃ model:",
        model,
        "\n┃ method:",
        method,
        "\n┃ methodForHimOnly:",
        methodForHimOnly,
        "\n┃ params:",
        params,
        "\n┃ rolePermissions:",
        rolePermissions,
        "\n┃ hasPermission:",
        hasPermission,
        "\n┃ hasPermissionForHimOnly:",
        hasPermissionForHimOnly,
        "\n┃ userId (from session):",
        userId,
        "\n┃ params.where.id (from request params):",
        params?.where?.id,
        "\n┃ userId === params.where.id:",
        userId === params?.where?.id,
        "\n┗━ result:",
        hasPermission || (hasPermissionForHimOnly && userId === params?.where?.id),
    );

    // Has full permission
    if (hasPermission) return true;

    // Has permission for him only
    if (hasPermissionForHimOnly) return params?.where?.id === userId;

    // Has not permission
    return false;
};
