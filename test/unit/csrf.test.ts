import { describe, expect, it, vi } from "vitest";

// Create hoisted mock classes
const { NextResponseMock } = vi.hoisted(() => {
    class NextResponseMock {
        status: number;
        body: string;
        type: string;

        constructor(body: string, options?: { status?: number }) {
            this.body = body;
            this.status = options?.status ?? 200;
            this.type = "error";
        }

        static next() {
            const response = new NextResponseMock("");
            response.type = "next";
            response.status = 200;
            return response;
        }

        static json(data: unknown, options?: { status?: number }) {
            return new NextResponseMock(JSON.stringify(data), options);
        }

        static redirect(_url: string | URL, status?: number) {
            return new NextResponseMock("", { status: status ?? 307 });
        }
    }

    return { NextResponseMock };
});

// Mock next/server module with hoisted classes
vi.mock("next/server", () => ({
    NextRequest: class NextRequest {
        method: string;
        headers: Headers;

        constructor(_url: string, init?: { method?: string; headers?: HeadersInit }) {
            this.method = init?.method ?? "GET";
            this.headers = new Headers(init?.headers);
        }
    },
    NextResponse: NextResponseMock,
}));

// Type for our mock NextResponse
interface MockNextResponse {
    status: number;
    body: string;
    type: string;
}

/**
 * Helper to create a mock NextRequest
 */
const createMockRequest = (method: string, origin?: string | null, host?: string | null) => {
    const headers = new Map<string, string>();
    if (origin !== null && origin !== undefined) headers.set("origin", origin);
    if (host !== null && host !== undefined) headers.set("host", host);

    return {
        method,
        headers: {
            get: (name: string) => headers.get(name) ?? null,
        },
    };
};

describe("CSRF Protection", () => {
    // Dynamic import with fresh env for each test suite
    const MOCK_BASE_URL = "https://example.com";

    describe("Environment validation", () => {
        it("throws error when NEXT_PUBLIC_BASE_URL is not defined", async () => {
            vi.resetModules();
            vi.stubEnv("NEXT_PUBLIC_BASE_URL", "");

            await expect(import("@orpc/csrf")).rejects.toThrow(
                "NEXT_PUBLIC_BASE_URL environment variable is not defined",
            );
        });
    });

    // We need to dynamically import the module after setting env
    const getCsrfProtection = async () => {
        // Reset module cache
        vi.resetModules();
        // Set env before importing
        vi.stubEnv("NEXT_PUBLIC_BASE_URL", MOCK_BASE_URL);
        // Dynamic import
        const csrfModule = await import("@orpc/csrf");
        return csrfModule.default;
    };

    describe("Non-mutation methods (should pass)", () => {
        it("GET request passes without CSRF check", async () => {
            const csrfProtection = await getCsrfProtection();
            const request = createMockRequest("GET");
            const response = (await csrfProtection(request as never)) as unknown as MockNextResponse;

            expect(response.type).toBe("next");
        });

        it("HEAD request passes without CSRF check", async () => {
            const csrfProtection = await getCsrfProtection();
            const request = createMockRequest("HEAD");
            const response = (await csrfProtection(request as never)) as unknown as MockNextResponse;

            expect(response.type).toBe("next");
        });

        it("OPTIONS request passes without CSRF check", async () => {
            const csrfProtection = await getCsrfProtection();
            const request = createMockRequest("OPTIONS");
            const response = (await csrfProtection(request as never)) as unknown as MockNextResponse;

            expect(response.type).toBe("next");
        });
    });

    describe("Mutation methods without headers (should block)", () => {
        it("POST without origin header returns 403", async () => {
            const csrfProtection = await getCsrfProtection();
            const request = createMockRequest("POST", null, "example.com");
            const response = (await csrfProtection(request as never)) as unknown as MockNextResponse;

            expect(response.status).toBe(403);
            expect(response.body).toContain("missing origin or host");
        });

        it("POST without host header returns 403", async () => {
            const csrfProtection = await getCsrfProtection();
            const request = createMockRequest("POST", MOCK_BASE_URL, null);
            const response = (await csrfProtection(request as never)) as unknown as MockNextResponse;

            expect(response.status).toBe(403);
            expect(response.body).toContain("missing origin or host");
        });

        it("PUT without headers returns 403", async () => {
            const csrfProtection = await getCsrfProtection();
            const request = createMockRequest("PUT", null, null);
            const response = (await csrfProtection(request as never)) as unknown as MockNextResponse;

            expect(response.status).toBe(403);
            expect(response.body).toContain("missing origin or host");
        });

        it("PATCH without headers returns 403", async () => {
            const csrfProtection = await getCsrfProtection();
            const request = createMockRequest("PATCH", null, null);
            const response = (await csrfProtection(request as never)) as unknown as MockNextResponse;

            expect(response.status).toBe(403);
        });

        it("DELETE without headers returns 403", async () => {
            const csrfProtection = await getCsrfProtection();
            const request = createMockRequest("DELETE", null, null);
            const response = (await csrfProtection(request as never)) as unknown as MockNextResponse;

            expect(response.status).toBe(403);
        });
    });

    describe("Mutation methods with invalid origin (should block)", () => {
        it("POST from disallowed origin returns 403", async () => {
            const csrfProtection = await getCsrfProtection();
            const request = createMockRequest("POST", "https://evil.com", "example.com");
            const response = (await csrfProtection(request as never)) as unknown as MockNextResponse;

            expect(response.status).toBe(403);
            expect(response.body).toContain("CSRF protection");
        });

        it("PUT from disallowed origin returns 403", async () => {
            const csrfProtection = await getCsrfProtection();
            const request = createMockRequest("PUT", "https://attacker.com", "example.com");
            const response = (await csrfProtection(request as never)) as unknown as MockNextResponse;

            expect(response.status).toBe(403);
            expect(response.body).toContain("CSRF protection");
        });

        it("PATCH from disallowed origin returns 403", async () => {
            const csrfProtection = await getCsrfProtection();
            const request = createMockRequest("PATCH", "http://localhost:3000", "example.com");
            const response = (await csrfProtection(request as never)) as unknown as MockNextResponse;

            expect(response.status).toBe(403);
        });

        it("DELETE from disallowed origin returns 403", async () => {
            const csrfProtection = await getCsrfProtection();
            const request = createMockRequest("DELETE", "https://malicious-site.com", "example.com");
            const response = (await csrfProtection(request as never)) as unknown as MockNextResponse;

            expect(response.status).toBe(403);
        });
    });

    describe("Mutation methods with valid origin (should pass)", () => {
        it("POST from allowed origin passes", async () => {
            const csrfProtection = await getCsrfProtection();
            const request = createMockRequest("POST", MOCK_BASE_URL, "example.com");
            const response = (await csrfProtection(request as never)) as unknown as MockNextResponse;

            expect(response.type).toBe("next");
        });

        it("PUT from allowed origin passes", async () => {
            const csrfProtection = await getCsrfProtection();
            const request = createMockRequest("PUT", MOCK_BASE_URL, "example.com");
            const response = (await csrfProtection(request as never)) as unknown as MockNextResponse;

            expect(response.type).toBe("next");
        });

        it("PATCH from allowed origin passes", async () => {
            const csrfProtection = await getCsrfProtection();
            const request = createMockRequest("PATCH", MOCK_BASE_URL, "example.com");
            const response = (await csrfProtection(request as never)) as unknown as MockNextResponse;

            expect(response.type).toBe("next");
        });

        it("DELETE from allowed origin passes", async () => {
            const csrfProtection = await getCsrfProtection();
            const request = createMockRequest("DELETE", MOCK_BASE_URL, "example.com");
            const response = (await csrfProtection(request as never)) as unknown as MockNextResponse;

            expect(response.type).toBe("next");
        });
    });
});
