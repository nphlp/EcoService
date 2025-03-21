/**
 * API pour récupérer un(e) diy unique avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer un(e) diy par son ID.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getDiyCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    DiyService,
    FindUniqueDiyProps,
    FindUniqueDiyResponse
} from "@services/class/DiyClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Récupère un(e) diy mis(e) en cache par ID
 * @param stringParams Paramètres contenant l'ID du/de la diy au format JSON
 * @returns Réponse contenant le/la diy ou une erreur
 */
const getDiyCached = cache(
    async (stringParams: string): Promise<ResponseFormat<FindUniqueDiyResponse>> => {
        // Parse les paramètres en objet
        const params: FindUniqueDiyProps = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le/la diy
        const response = await DiyService.findUnique(params);
        
        console.log("getDiyUnique -> Revalidating diy from database...");
        
        return response;
    },
    ["diy/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["diy/unique"],
    },
);

/**
 * Gestionnaire de route GET pour récupérer un(e) seul(e) diy par ID
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<FindUniqueDiyResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getDiyCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getDiyCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getDiyCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getDiyCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getDiyCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
