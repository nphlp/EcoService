/**
 * API pour récupérer un(e) fruit unique avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer un(e) fruit par son ID.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getFruitCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    FruitService,
    FindUniqueFruitProps,
    FindUniqueFruitResponse
} from "@services/class/FruitClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Récupère un(e) fruit mis(e) en cache par ID
 * @param stringParams Paramètres contenant l'ID du/de la fruit au format JSON
 * @returns Réponse contenant le/la fruit ou une erreur
 */
const getFruitCached = cache(
    async (stringParams: string): Promise<ResponseFormat<FindUniqueFruitResponse>> => {
        // Parse les paramètres en objet
        const params: FindUniqueFruitProps = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le/la fruit
        const response = await FruitService.findUnique(params);
        
        console.log("getFruitUnique -> Revalidating fruit from database...");
        
        return response;
    },
    ["fruit/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["fruit/unique"],
    },
);

/**
 * Gestionnaire de route GET pour récupérer un(e) seul(e) fruit par ID
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<FindUniqueFruitResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getFruitCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getFruitCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getFruitCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getFruitCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getFruitCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
