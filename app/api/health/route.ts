import { NextResponse } from "next/server";

export async function GET() {
    try {
        const healthCheck = {
            status: "ok",
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env.NODE_ENV,
        };

        return NextResponse.json(healthCheck, { status: 200 });
    } catch {
        return NextResponse.json(
            {
                status: "error",
                timestamp: new Date().toISOString(),
                error: "Health check failed",
            },
            { status: 500 },
        );
    }
}
