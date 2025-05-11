import { GetSession } from "@lib/authServer";
import PrismaInstance from "@lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const session = await GetSession();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Update user to be a seller
        await PrismaInstance.user.update({
            where: { id: session.user.id },
            data: { isSeller: true },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: (error as Error).message || "Error becoming a seller" }, { status: 500 });
    }
}
