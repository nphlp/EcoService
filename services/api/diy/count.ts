/**
 * API pour compter les diys avec mise en cache
 * 
 * Ce fichier définit un point d'API pour compter les diys avec filtres.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getDiyCountCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    DiyService,
    CountDiyProps,
    CountDiyResponse
} from "@services/class/DiyClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Compte les diys avec mise en cache
 * @param stringParams Paramètres de filtrage au format JSON
 * @returns Réponse contenant le nombre de diys ou une erreur
 */
const getDiyCountCached = cache(
    async (stringParams: string): Promise<ResponseFormat<CountDiyResponse>> => {
        // Parse les paramètres en objet
        const params: CountDiyProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les diys
        const response = await DiyService.count(params);
        
        console.log("getDiyCount -> Revalidating diys count from database...");
        
        return response;
    },
    ["diy/count"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["diy/count"],
    },
);

/**
 * Gestionnaire de route GET pour compter les diys
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<CountDiyResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getDiyCountCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getDiyCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getDiyCountCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getDiyCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getDiyCountCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
