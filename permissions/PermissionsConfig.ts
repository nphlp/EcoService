import { GlobalPermissions, RolePermissions } from "./permissionsType";

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
    User: ["findUnique-HO", "update-HO"],
    Order: ["findMany-HO"],
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
