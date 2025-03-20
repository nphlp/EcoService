/**
 * API pour compter les fruits avec mise en cache
 * 
 * Ce fichier définit un point d'API pour compter les fruits avec filtres.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getFruitCountCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    FruitService,
    CountFruitProps,
    CountFruitResponse
} from "@services/class/FruitClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Compte les fruits avec mise en cache
 * @param stringParams Paramètres de filtrage au format JSON
 * @returns Réponse contenant le nombre de fruits ou une erreur
 */
const getFruitCountCached = cache(
    async (stringParams: string): Promise<ResponseFormat<CountFruitResponse>> => {
        // Parse les paramètres en objet
        const params: CountFruitProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les fruits
        const response = await FruitService.count(params);
        
        console.log("getFruitCount -> Revalidating fruits count from database...");
        
        return response;
    },
    ["fruit/count"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["fruit/count"],
    },
);

/**
 * Gestionnaire de route GET pour compter les fruits
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<CountFruitResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getFruitCountCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getFruitCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getFruitCountCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getFruitCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getFruitCountCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
