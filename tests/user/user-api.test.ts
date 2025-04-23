import { FetchV2 } from "@utils/FetchV2/FetchV2";
import { describe, expect, it } from "vitest";

describe("API /user", () => {
    it("retourne la liste des utilisateurs", async () => {
        const users = await FetchV2({
            route: "/user",
            params: {
                select: {
                    email: true,
                },
            },
        });

        expect(users).toBeDefined();
        expect(Array.isArray(users)).toBe(true);
        expect(users[0]).toHaveProperty("email");
    });
});
