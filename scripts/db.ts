#!/usr/bin/env tsx

/**
 * Gestion de base de données pour l'application EcoService
 *
 * Ce script offre des commandes pour configurer, réinitialiser et recharger la base de données MySQL
 * en utilisant les fichiers SQL stockés dans le dossier prisma/sql.
 *
 * Le mot de passe MySQL est récupéré depuis la variable d'environnement MYSQL_ROOT_PASSWORD
 * ou demandé à l'utilisateur si cette variable n'est pas définie.
 *
 * Architecture:
 * - utils.ts: fonctions utilitaires (readline, vérification de DB)
 * - fileUtils.ts: gestion des opérations de fichiers SQL
 * - commands.ts: implémentation des commandes disponibles
 */

import { customSqlFile, reloadDb, resetDb, setupDb } from "./db/commands";
import { closeReadline, getMySqlPassword } from "./db/utils";

/**
 * Point d'entrée principal du gestionnaire de base de données
 * Analyse les arguments de ligne de commande et exécute la commande appropriée
 */
const main = async (): Promise<void> => {
    try {
        // Filtrer les arguments pour séparer le flag --prod
        const args = process.argv.slice(2);
        const isProd = args.includes("--prod");
        const filteredArgs = args.filter((arg) => arg !== "--prod");

        const sqlFile = filteredArgs[0];

        if (!sqlFile) {
            console.log("❌ Veuillez spécifier un fichier SQL ou une commande");
            console.log("Commandes disponibles: setup, reset, reload, [nom_fichier.sql]");
            return;
        }

        // Récupérer le mot de passe une seule fois
        const password = await getMySqlPassword();

        switch (sqlFile) {
            case "setup":
                // Configuration de la base de données
                await setupDb(isProd, password);
                break;
            case "reset":
                // Réinitialisation de la base de données
                await resetDb(isProd, password);
                break;
            case "reload":
                // Rechargement complet de la base de données
                await reloadDb(isProd, password);
                break;
            default:
                // Exécution d'un fichier SQL personnalisé
                await customSqlFile(sqlFile, isProd, password);
                break;
        }
    } finally {
        // Fermer l'interface readline à la fin
        closeReadline();
    }
};

main();
