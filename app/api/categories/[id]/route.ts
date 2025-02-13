import { NextResponse } from "next/server";
import prisma from "@lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const category = await prisma.category.findUnique({
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
