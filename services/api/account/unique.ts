/**
 * API pour récupérer un(e) account unique avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer un(e) account par son ID.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getAccountCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    AccountService,
    FindUniqueAccountProps,
    FindUniqueAccountResponse
} from "@services/class/AccountClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Récupère un(e) account mis(e) en cache par ID
 * @param stringParams Paramètres contenant l'ID du/de la account au format JSON
 * @returns Réponse contenant le/la account ou une erreur
 */
const getAccountCached = cache(
    async (stringParams: string): Promise<ResponseFormat<FindUniqueAccountResponse>> => {
        // Parse les paramètres en objet
        const params: FindUniqueAccountProps = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le/la account
        const response = await AccountService.findUnique(params);
        
        console.log("getAccountUnique -> Revalidating account from database...");
        
        return response;
    },
    ["account/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["account/unique"],
    },
);

/**
 * Gestionnaire de route GET pour récupérer un(e) seul(e) account par ID
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<FindUniqueAccountResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getAccountCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getAccountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getAccountCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getAccountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getAccountCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
