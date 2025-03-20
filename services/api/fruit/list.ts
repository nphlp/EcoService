/**
 * API pour récupérer une liste de fruits avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer une liste de fruits
 * avec filtrage, tri et pagination. Il utilise unstable_cache de Next.js
 * pour mettre en cache les résultats.
 * 
 * La fonction getFruitListCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    FruitService,
    FindManyFruitProps,
    FindManyFruitResponse,
} from "@services/class/FruitClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Récupère une liste de fruits mise en cache
 */
const getFruitListCached = cache(
    async (stringParams: string): Promise<ResponseFormat<FindManyFruitResponse>> => {
        // Parse les paramètres en objet
        const params: FindManyFruitProps = JSON.parse(stringParams);

        // Utilise le service pour récupérer la liste des fruits
        const response = await FruitService.findMany(params);

        console.log("getFruitList -> Revalidating fruits list from database...");

        return response;
    },
    ["fruit"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["fruit"],
    },
);

/**
 * Gestionnaire de route GET pour l'API de fruits
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<FindManyFruitResponse>>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère la liste des fruits
        const response = await getFruitListCached(stringParams);

        // Retourne la liste des fruits
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getFruitListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getFruitListCached -> Invalid Zod params -> " + error.message,
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getFruitListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getFruitListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
