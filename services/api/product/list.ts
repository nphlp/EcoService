/**
 * API pour récupérer une liste de products avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer une liste de products
 * avec filtrage, tri et pagination. Il utilise unstable_cache de Next.js
 * pour mettre en cache les résultats.
 * 
 * La fonction getProductListCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    ProductService,
    FindManyProductProps,
    FindManyProductResponse,
} from "@services/class/ProductClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Récupère une liste de products mise en cache
 */
const getProductListCached = cache(
    async (stringParams: string): Promise<ResponseFormat<FindManyProductResponse>> => {
        // Parse les paramètres en objet
        const params: FindManyProductProps = JSON.parse(stringParams);

        // Utilise le service pour récupérer la liste des products
        const response = await ProductService.findMany(params);

        console.log("getProductList -> Revalidating products list from database...");

        return response;
    },
    ["product"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["product"],
    },
);

/**
 * Gestionnaire de route GET pour l'API de products
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<FindManyProductResponse>>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère la liste des products
        const response = await getProductListCached(stringParams);

        // Retourne la liste des products
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getProductListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getProductListCached -> Invalid Zod params -> " + error.message,
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getProductListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getProductListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
