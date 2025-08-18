#!/usr/bin/env tsx
/**
 * Générateur de fichiers backend basé sur le schéma Prisma
 *
 * Ce script examine le schéma Prisma pour générer automatiquement:
 * - Des classes de service pour chaque modèle
 * - Des actions pour les opérations CRUD
 * - Des endpoints API REST
 * - Des fichiers index pour faciliter les imports
 *
 * Architecture:
 * - mapping.ts: définit les templates et leurs destinations
 * - fileUtils.ts: gère les opérations de fichiers (création, suppression)
 * - modelExtractor.ts: analyse le schéma Prisma
 * - fileGenerator.ts: traite les templates et génère le contenu
 * - commands.ts: implémente les commandes CLI disponibles
 */
import { clearModels, generateModels, listModels } from "./generator/commands";

/**
 * Point d'entrée principal du générateur
 * Analyse les arguments de ligne de commande et exécute la commande appropriée
 */
const main = (): void => {
    const args = process.argv.slice(2);
    const command = args[0];

    switch (command) {
        case "list":
            // Affiche la liste des modèles trouvés dans le schéma Prisma
            listModels();
            break;
        case "clear":
            // Supprime tous les fichiers générés
            clearModels();
            break;
        case "all":
            // Génère tous les fichiers pour tous les modèles
            generateModels();
            break;
        default:
            console.log("Commandes disponibles: list, all");
            break;
    }
};

main();
