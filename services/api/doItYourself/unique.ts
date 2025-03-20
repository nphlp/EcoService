/**
 * API pour récupérer un(e) doItYourself unique avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer un(e) doItYourself par son ID.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getDoItYourselfCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    DoItYourselfService,
    FindUniqueDoItYourselfProps,
    FindUniqueDoItYourselfResponse
} from "@services/class/DoItYourselfClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Récupère un(e) doItYourself mis(e) en cache par ID
 * @param stringParams Paramètres contenant l'ID du/de la doItYourself au format JSON
 * @returns Réponse contenant le/la doItYourself ou une erreur
 */
const getDoItYourselfCached = cache(
    async (stringParams: string): Promise<ResponseFormat<FindUniqueDoItYourselfResponse>> => {
        // Parse les paramètres en objet
        const params: FindUniqueDoItYourselfProps = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le/la doItYourself
        const response = await DoItYourselfService.findUnique(params);
        
        console.log("getDoItYourselfUnique -> Revalidating doItYourself from database...");
        
        return response;
    },
    ["doItYourself/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["doItYourself/unique"],
    },
);

/**
 * Gestionnaire de route GET pour récupérer un(e) seul(e) doItYourself par ID
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<FindUniqueDoItYourselfResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getDoItYourselfCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getDoItYourselfCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getDoItYourselfCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getDoItYourselfCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getDoItYourselfCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
