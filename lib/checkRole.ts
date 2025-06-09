"use server";

import { $Enums } from "@prisma/client";
import { BetterSessionServer, GetSession } from "./authServer";

// ========== Complex checks ========= //

type Roles = $Enums.Role;

/**
 * Check if the user has the given role
 * @returns session or null
 */
export const hasRole = async (roles: Roles[]): Promise<BetterSessionServer | null> => {
    // Get session and role
    const session = await GetSession();
    const role = session?.user.role;

    // If the user is not logged in, return null
    if (!role) return null;

    // Check if the user has the given role
    const hasRole = roles.includes(role);

    // If the user does not have the given role, return null
    if (!hasRole) return null;

    return session;
};

// ========== Simple checks ========= //

/**
 * Check if the user is an admin
 * @returns true if the user is an admin, false otherwise
 */
export const isAdmin = async (): Promise<boolean> => {
    const session = await GetSession();
    return session?.user?.role === "ADMIN";
};

/**
 * Check if the user is an employee
 * @returns true if the user is an employee, false otherwise
 */
export const isEmployee = async (): Promise<boolean> => {
    const session = await GetSession();
    return session?.user?.role === "EMPLOYEE";
};

/**
 * Check if the user is a vendor
 * @returns true if the user is a vendor, false otherwise
 */
export const isVendor = async (): Promise<boolean> => {
    const session = await GetSession();
    return session?.user?.role === "VENDOR";
};

/**
 * Check if the user is a customer
 * @returns true if the user is a customer, false otherwise
 */
export const isUser = async (): Promise<boolean> => {
    const session = await GetSession();
    return session?.user?.role === "USER";
};
