import { $Enums, Prisma } from "@prisma/client/client";

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
export type WhereHimOnly = { where?: { id?: string; userId?: string } } | undefined;

// Global permissions
export type GlobalPermissions = { [value in Roles]: RolePermissions };
