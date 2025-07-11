import { $Enums, Prisma } from "@prisma/client";

// Fetch methods (GET requests)
type Find = "findFirst" | "findUnique" | "findMany" | "findFirst-HO" | "findUnique-HO" | "findMany-HO";
type Count = "count" | "count-HO";

// Mutations methods (POST requests)
type Create = "create" | "createMany" | "create-HO" | "createMany-HO";
type Upsert = "upsert" | "upsertMany" | "upsert-HO" | "upsertMany-HO";
type Update = "update" | "updateMany" | "update-HO" | "updateMany-HO";
type Delete = "delete" | "deleteMany" | "delete-HO" | "deleteMany-HO";

// Types
export type Roles = $Enums.Role | "NON_LOGGED";
export type Models = Prisma.ModelName;
export type RolePermissions = { [value in Models]: Methods[] };
export type Methods = Find | Count | Create | Upsert | Update | Delete;

// Global permissions
type GlobalPermissions = { [value in Roles]: RolePermissions };

// ┏━━━━━━━━━━━━━━━━━━━━┓
// ┃ Models permissions ┃
// ┗━━━━━━━━━━━━━━━━━━━━┛

// Default
const NON_LOGGED: RolePermissions = {
    Account: [],
    Address: [],
    Article: ["findMany", "findUnique"],
    Category: ["findMany", "findUnique"],
    Content: ["findMany", "findUnique"],
    Diy: ["findMany", "findUnique"],
    Fruit: [],
    Order: [],
    Product: ["findMany", "findUnique"],
    Quantity: [],
    Session: [],
    User: [],
    Verification: [],
};

const USER: RolePermissions = {
    // Inherit from NON_LOGGED
    ...NON_LOGGED,

    // Override with
    User: ["update"],
};

const VENDOR: RolePermissions = {
    // Inherit from USER
    ...USER,

    // Override with
    Article: [],
};

const EMPLOYEE: RolePermissions = {
    // Inherit from VENDOR
    ...VENDOR,

    // Override with
    Product: [],
};

const ADMIN: RolePermissions = {
    // Inherit from EMPLOYEE
    ...EMPLOYEE,

    // Override with
    User: ["findMany"],
};

// ┏━━━━━━━━━━━━━━━━━━━━┓
// ┃ Global permissions ┃
// ┗━━━━━━━━━━━━━━━━━━━━┛

export const globalPermissions: GlobalPermissions = { NON_LOGGED, USER, VENDOR, EMPLOYEE, ADMIN };
