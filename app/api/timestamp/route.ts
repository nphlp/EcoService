import { NextResponse } from "next/server";

export async function GET() {
    try {
        const now = new Date();

        const localTime = now.toLocaleTimeString("fr-FR", { hour: "numeric", minute: "numeric", second: "numeric" });
        const formattedTime = localTime.replace(":", "h ").replace(":", "min ") + "s";

        console.log("🔄 Fetching timestamp...", formattedTime);

        return NextResponse.json({ time: formattedTime }, { status: 200 });
    } catch (error) {
        console.error("Time -> " + (error as Error).message);
        return NextResponse.json({ time: "Something went wrong..." }, { status: 500 });
    }
}
