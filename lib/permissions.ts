import { $Enums, Prisma } from "@prisma/client";
// import { Operation } from "@prisma/client/runtime/library";
import { parseAndDecodeParams } from "@utils/FetchConfig";
import { NextRequest } from "next/server";
import { GetSession } from "./authServer";

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
    User: ["unique-HO"],
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

const debug = (
    enabled: boolean,
    args: {
        pathname: string;
        model: Models;
        method: Methods;
        methodForHimOnly: Methods;
        params: { where: { id: string } };
        rolePermissions: Methods[];
        hasPermission: boolean;
        hasPermissionForHimOnly: boolean;
        userId: string | undefined;
    },
) => {
    if (!enabled) return;

    const {
        pathname,
        model,
        method,
        methodForHimOnly,
        params,
        rolePermissions,
        hasPermission,
        hasPermissionForHimOnly,
        userId,
    } = args;

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
};

// Types
type GlobalPermissions = { [value in Roles]: Permissions };

// Permissions
const permissions: GlobalPermissions = { NON_LOGGED, USER, VENDOR, EMPLOYEE, ADMIN };

// Check permissions
export const hasPermission = async (request: NextRequest): Promise<boolean> => {
    const { pathname } = request.nextUrl;

    // Get session, userId and role
    const session = await GetSession();
    const userId = session?.user.id;
    const role: Roles = session?.user.role ?? "NON_LOGGED";

    // Check if it's an API request
    const isApiRequest = pathname.startsWith("/api/internal");
    if (!isApiRequest) return true;

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

    debug(true, {
        pathname,
        model,
        method,
        methodForHimOnly,
        params,
        rolePermissions,
        hasPermission,
        hasPermissionForHimOnly,
        userId,
    });

    // Has full permission
    if (hasPermission) return true;

    // Has permission for him only
    if (hasPermissionForHimOnly) return params?.where?.id === userId;

    // Has not permission
    return false;
};
