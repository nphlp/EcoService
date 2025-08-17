import { GlobalPermissions, RolePermissions } from "./permissionsType";

// Default
const NON_LOGGED: RolePermissions = {
    Account: [],
    Address: [],
    Article: ["findMany", "findUnique", "count"],
    Category: ["findMany", "findUnique", "count"],
    Content: ["findMany", "findUnique", "count"],
    Diy: ["findMany", "findUnique", "count"],
    Fruit: [],
    Order: [],
    Product: ["findMany", "findUnique", "count"],
    Quantity: [],
    Session: [],
    User: [],
    Verification: [],
};

const USER: RolePermissions = {
    // Inherit from NON_LOGGED
    ...NON_LOGGED,

    // Override with
    Quantity: ["createMany-HO", "delete-HO", "deleteMany-HO"],
    Order: ["create-HO", "findMany-HO", "findUnique-HO", "update-HO", "delete-HO"],
    User: ["findUnique-HO", "update-HO"],
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

export const GLOBAL_PERMISSIONS: GlobalPermissions = { NON_LOGGED, USER, VENDOR, EMPLOYEE, ADMIN };
