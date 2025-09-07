import path from "path";
import { generateIndexFiles, generateModelFiles } from "./fileGenerator";
import { removePath } from "./fileUtils";
import { pathsToRemove } from "./mapping";
import { getModelsInfo } from "./modelExtractor";

/**
 * Implémentation des commandes disponibles via l'interface CLI
 *
 * Ce module expose les commandes principales du générateur:
 * - list: affiche les modèles disponibles
 * - clear: supprime les fichiers générés
 * - generate: génère les fichiers pour tous les modèles
 */

/**
 * Affiche la liste des modèles détectés dans le schéma Prisma
 *
 * Extrait et affiche tous les modèles disponibles pour
 * la génération, avec un formatage console lisible.
 */
export const listModels = (): void => {
    const { models } = getModelsInfo();

    console.log(`📋 ${models.length} modèles disponibles dans le Prisma Client:\n  - ${models.join("\n  - ")}`);
    console.log("\n✅ Listage terminé avec succès!");
};

/**
 * Supprime tous les fichiers générés précédemment
 *
 * Nettoie l'environnement en supprimant tous les répertoires et fichiers
 * qui ont été créés par le générateur.
 */
export const clearModels = (): void => {
    console.log("🚀 Nettoyage des fichiers générés...");

    // Supprimer tous les chemins générés
    for (const pathToRemove of pathsToRemove) {
        removePath(path.join(process.cwd(), pathToRemove));
    }

    console.log("✅ Suppression des fichiers générés terminée avec succès!");
};

/**
 * Génère tous les fichiers pour tous les modèles
 *
 * Processus principal de génération qui:
 * 1. Extrait les modèles du schéma Prisma
 * 2. Nettoie les fichiers existants
 * 3. Génère les fichiers spécifiques à chaque modèle
 * 4. Génère les fichiers d'index et de configuration
 */
export const generateModels = (): void => {
    console.log("🚀 Démarrage de la génération des fichiers...");

    // Extraire les noms des modèles du schéma Prisma
    const { models } = getModelsInfo();

    // Vérifier si des modèles ont été trouvés
    if (models.length === 0) {
        console.error("❌ Aucun modèle trouvé dans le schéma Prisma");
        return;
    }

    // Nettoyer l'environnement avant la génération
    for (const pathToRemove of pathsToRemove) {
        removePath(path.join(process.cwd(), pathToRemove));
    }

    // Générer les fichiers pour chaque modèle individuellement
    for (const namme of models) {
        generateModelFiles(namme);
    }

    // Générer les fichiers globaux (index, routes)
    generateIndexFiles(models);

    console.log("✅ Génération terminée avec succès!");
};
