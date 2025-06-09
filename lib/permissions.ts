"use server";

import { $Enums, Prisma } from "@prisma/client";
import { Operation } from "@prisma/client/runtime/library";
import { GetSession } from "./authServer";

// =============================== //
// ====== Types Operations ======= //
// =============================== //

// Raw operations form Prisma
type Operations = Operation;

// Select only available methods in the app/services
type Find = "findFirst" | "findUnique" | "findMany";
type Create = "create" | "createMany";
type Upsert = "upsert" | "upsertMany";
type Update = "update" | "updateMany";
type Delete = "delete" | "deleteMany";

// Important types
type Roles = $Enums.Role | "NON_LOGGED";
type Models = Prisma.ModelName;
type Methods = Extract<Operations, Find | Create | Upsert | Update | Delete>;
type Permissions = { [value in Models]: Methods[] };

// =============================== //
// ======== Configuration ======== //
// =============================== //

// Default no permissions
const NO_PERMISSIONS: Permissions = {
    Account: [],
    Address: [],
    Article: [],
    Category: [],
    Content: [],
    Diy: [],
    Fruit: [],
    Order: [],
    Product: [],
    Quantity: [],
    Session: [],
    User: [],
    Verification: [],
};

// Configuration
const NON_LOGGED: Permissions = {
    // Inherit from NO_PERMISSIONS
    ...NO_PERMISSIONS,

    // Override with
    Content: ["findMany"],
};

const USER: Permissions = {
    // Inherit from NON_LOGGED
    ...NON_LOGGED,

    // Override with
    Diy: ["findMany"],
};

const VENDOR: Permissions = {
    // Inherit from USER
    ...USER,

    // Override with
    Article: ["findMany"],
};

const EMPLOYEE: Permissions = {
    // Inherit from VENDOR
    ...VENDOR,

    // Override with
    Product: ["findMany"],
};

const ADMIN: Permissions = {
    // Inherit from EMPLOYEE
    ...EMPLOYEE,

    // Override with
    User: ["findMany"],
};

// =============================== //
// ============ Utils ============ //
// =============================== //

// Types
type GlobalPermissions = { [value in Roles]: Permissions };
type PermissionsToCheck = { model: Models; methods: Methods[] }[];

// Permissions
const permissions: GlobalPermissions = { NON_LOGGED, USER, VENDOR, EMPLOYEE, ADMIN };

// Check permissions
export const hasPermission = async (permissionsToCheck: PermissionsToCheck): Promise<boolean> => {
    // Get session and role
    const session = await GetSession();
    const role: Roles = session?.user.role ?? "NON_LOGGED";

    // Check if every permissions are authorized for the role
    return permissionsToCheck.every(({ model, methods }) =>
        methods.every((method) => permissions[role][model].includes(method)),
    );
};
