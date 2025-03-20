/**
 * API pour récupérer un(e) user unique avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer un(e) user par son ID.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getUserCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    UserService,
    FindUniqueUserProps,
    FindUniqueUserResponse
} from "@services/class/UserClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Récupère un(e) user mis(e) en cache par ID
 * @param stringParams Paramètres contenant l'ID du/de la user au format JSON
 * @returns Réponse contenant le/la user ou une erreur
 */
const getUserCached = cache(
    async (stringParams: string): Promise<ResponseFormat<FindUniqueUserResponse>> => {
        // Parse les paramètres en objet
        const params: FindUniqueUserProps = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le/la user
        const response = await UserService.findUnique(params);
        
        console.log("getUserUnique -> Revalidating user from database...");
        
        return response;
    },
    ["user/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["user/unique"],
    },
);

/**
 * Gestionnaire de route GET pour récupérer un(e) seul(e) user par ID
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<FindUniqueUserResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getUserCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getUserCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getUserCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getUserCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getUserCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
