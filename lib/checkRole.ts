"use server";

import { BetterSessionServer, GetSession } from "./authServer";

// ========== Complex checks ========= //

/**
 * Check if the user is a vendor, employee or admin
 * @returns true if the user is a vendor, employee or admin, false otherwise
 */
export const isVendorOrEmployeeOrAdmin = async (): Promise<BetterSessionServer | null> => {
    const session = await GetSession();

    const role = session?.user.role;

    const isVendorOrEmployeeOrAdmin = role === "VENDOR" || role === "EMPLOYEE" || role === "ADMIN";

    if (!session || !isVendorOrEmployeeOrAdmin) {
        return null;
    }

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
