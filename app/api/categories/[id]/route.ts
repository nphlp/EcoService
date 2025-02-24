import PrismaInstance from "@lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        const category = await PrismaInstance.category.findUnique({
            where: { id },
            include: { products: true },
        });

        if (!category) return NextResponse.json({ error: "Catégorie non trouvée" }, { status: 404 });

        return NextResponse.json(category, { status: 200 });
    } catch (error) {
        console.error("Error fetching category:", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}
