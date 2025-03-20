/**
 * API pour récupérer un(e) address unique avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer un(e) address par son ID.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getAddressCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    AddressService,
    FindUniqueAddressProps,
    FindUniqueAddressResponse
} from "@services/class/AddressClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Récupère un(e) address mis(e) en cache par ID
 * @param stringParams Paramètres contenant l'ID du/de la address au format JSON
 * @returns Réponse contenant le/la address ou une erreur
 */
const getAddressCached = cache(
    async (stringParams: string): Promise<ResponseFormat<FindUniqueAddressResponse>> => {
        // Parse les paramètres en objet
        const params: FindUniqueAddressProps = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le/la address
        const response = await AddressService.findUnique(params);
        
        console.log("getAddressUnique -> Revalidating address from database...");
        
        return response;
    },
    ["address/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["address/unique"],
    },
);

/**
 * Gestionnaire de route GET pour récupérer un(e) seul(e) address par ID
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<FindUniqueAddressResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getAddressCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getAddressCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getAddressCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getAddressCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getAddressCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
