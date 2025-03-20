/**
 * API pour récupérer un(e) quantity unique avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer un(e) quantity par son ID.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getQuantityCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    QuantityService,
    FindUniqueQuantityProps,
    FindUniqueQuantityResponse
} from "@services/class/QuantityClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Récupère un(e) quantity mis(e) en cache par ID
 * @param stringParams Paramètres contenant l'ID du/de la quantity au format JSON
 * @returns Réponse contenant le/la quantity ou une erreur
 */
const getQuantityCached = cache(
    async (stringParams: string): Promise<ResponseFormat<FindUniqueQuantityResponse>> => {
        // Parse les paramètres en objet
        const params: FindUniqueQuantityProps = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le/la quantity
        const response = await QuantityService.findUnique(params);
        
        console.log("getQuantityUnique -> Revalidating quantity from database...");
        
        return response;
    },
    ["quantity/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["quantity/unique"],
    },
);

/**
 * Gestionnaire de route GET pour récupérer un(e) seul(e) quantity par ID
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<FindUniqueQuantityResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getQuantityCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getQuantityCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getQuantityCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getQuantityCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getQuantityCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
