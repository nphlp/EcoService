#!/usr/bin/env tsx

/**
 * Gestion de base de données pour l'application EcoService
 *
 * Ce script offre des commandes pour configurer, réinitialiser et recharger la base de données MySQL
 * en utilisant les fichiers SQL stockés dans le dossier prisma/sql.
 *
 * Architecture:
 * - utils.ts: fonctions utilitaires (readline, vérification de DB)
 * - fileUtils.ts: gestion des opérations de fichiers SQL
 * - commands.ts: implémentation des commandes disponibles
 */

import { customSqlFile, reloadDb, resetDb, setupDb } from "./db/commands";

/**
 * Point d'entrée principal du gestionnaire de base de données
 * Analyse les arguments de ligne de commande et exécute la commande appropriée
 */
const main = (): void => {
    // Filtrer les arguments pour séparer le flag --prod
    const args = process.argv.slice(2);
    const isProd = args.includes("--prod");
    const filteredArgs = args.filter((arg) => arg !== "--prod");

    const sqlFile = filteredArgs[0];
    const passwordArg = filteredArgs[1];

    if (!sqlFile) {
        console.log("❌ Veuillez spécifier un fichier SQL ou une commande");
        console.log("Commandes disponibles: setup, reset, reload, [nom_fichier.sql]");
        return;
    }

    switch (sqlFile) {
        case "setup":
            // Configuration de la base de données
            setupDb(isProd, passwordArg);
            break;
        case "reset":
            // Réinitialisation de la base de données
            resetDb(isProd, passwordArg);
            break;
        case "reload":
            // Rechargement complet de la base de données
            reloadDb(isProd, passwordArg);
            break;
        default:
            // Exécution d'un fichier SQL personnalisé
            customSqlFile(sqlFile, isProd, passwordArg);
            break;
    }
};

main();
