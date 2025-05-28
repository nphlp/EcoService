import { NextResponse } from "next/server";

export type HealthResponse = {
    status: "ok" | "error";
    timestamp: string;
    uptime?: number;
    environment?: string;
};

export async function GET(): Promise<NextResponse<HealthResponse>> {
    try {
        const healthCheck = {
            status: "ok" as const,
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env.NODE_ENV,
        };

        return NextResponse.json(healthCheck, { status: 200 });
    } catch {
        return NextResponse.json(
            {
                status: "error" as const,
                timestamp: new Date().toISOString(),
                error: "Health check failed",
            },
            { status: 500 },
        );
    }
}
