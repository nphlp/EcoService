/**
 * Point d'entrée API pour toutes les routes dynamiques
 *
 * Ce fichier utilise un système de routage dynamique pour gérer toutes les requêtes API.
 * Il analyse le chemin de la requête et redirige vers le gestionnaire approprié.
 *
 * Inspiré par l'approche de BetterAuth, ce système permet de centraliser la logique
 * de routage et de simplifier l'architecture des API.
 */
import * as routes from "@services/api";
import { NextRequest, NextResponse } from "next/server";

// Type pour les gestionnaires de route
type Route = (request: NextRequest) => Promise<NextResponse>;

/**
 * Fonction pour obtenir le gestionnaire de route approprié en fonction du chemin
 */
const findRoute = (path: string[]): Route | null => {
    // Api Route List
    const ApiRoutes: Record<string, Route> = routes;

    // Si le chemin est vide, retourner null
    if (path.length === 0) {
        return null;
    }

    // Si le chemin a un seul segment, retourner le gestionnaire principal (liste)
    const ModelName = path[0].charAt(0).toUpperCase() + path[0].slice(1);

    if (path.length === 1) {
        return ApiRoutes[`get${ModelName}List`] ?? null;
    }

    // Si le chemin a deux segments, vérifier les sous-routes
    if (path.length === 2) {
        const subRoute = path[1];

        // Si la sous-route est "unique", retourner le gestionnaire pour obtenir un élément unique
        if (subRoute === "unique") {
            return ApiRoutes[`get${ModelName}Unique`] ?? null;
        }

        // Si la sous-route est "count", retourner le gestionnaire pour obtenir le nombre d'éléments
        if (subRoute === "count") {
            return ApiRoutes[`get${ModelName}Count`] ?? null;
        }
    }

    // Si le chemin est plus long ou la sous-route n'est pas reconnue, retourner null
    return null;
}

// Type pour les paramètres de la requête
type ParamsProps = { params: Promise<{ routes: string[] }> };

/**
 * Gestionnaire GET pour toutes les routes
 */
export async function GET(request: NextRequest, props: ParamsProps): Promise<NextResponse> {
    const { params } = props;
    const { routes } = await params;

    const route = findRoute(routes);

    if (route) {
        try {
            return route(request);
        } catch (error) {
            console.error(`Error in route ${routes.join("/")}: ${(error as Error).message}`);
            return NextResponse.json({ error: "Internal server error" }, { status: 500 });
        }
    }

    return NextResponse.json({ error: "Route not found" }, { status: 404 });
}
