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
 * Commandes disponibles:
 * - setup       : Crée la base de données et les tables si elles n'existent pas déjà
 * - reset       : Supprime la base de données si elle existe
 * - reload      : Combine reset + setup (réinitialise complètement la base)
 * - execute     : Exécute un fichier SQL situé dans prisma/sql ou ses sous-dossiers
 *
 * Options:
 * - --docker    : Utilise les fichiers *-docker.sql au lieu des fichiers standards
 * - --ssl       : Utilise le SSL pour la connexion à la base de données
 *
 * Exemples:
 * - pnpm run db:setup            : Configure la base de données
 * - pnpm run db:reset            : Réinitialise la base de données
 * - pnpm run db:reload           : Recharge complètement la base de données
 * - pnpm run db:execute mon.sql  : Exécute prisma/sql/mon.sql
 * - pnpm run db:execute sous-dossier/mon.sql : Exécute prisma/sql/sous-dossier/mon.sql
 *
 * Architecture:
 * - utils.ts: fonctions utilitaires (readline, vérification de DB)
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
        // Filtrer les arguments pour séparer les flags --docker et --ssl
        const args = process.argv.slice(2);
        const isDocker = args.includes("--docker");
        const isSSL = args.includes("--ssl");
        const filteredArgs = args.filter((arg) => arg !== "--docker");

        const sqlFileOrCommand = filteredArgs[0];

        if (!sqlFileOrCommand) {
            console.log("❌ Veuillez spécifier un fichier SQL ou une commande");
            console.log("Commandes disponibles: setup, reset, reload, execute [chemin_relatif.sql]");
            return;
        }

        // Récupérer le mot de passe une seule fois
        const password = await getMySqlPassword();

        switch (sqlFileOrCommand) {
            case "setup":
                // Configuration de la base de données
                await setupDb(isDocker, isSSL, password);
                break;
            case "reset":
                // Réinitialisation de la base de données
                await resetDb(isDocker, isSSL, password);
                break;
            case "reload":
                // Rechargement complet de la base de données
                await reloadDb(isDocker, isSSL, password);
                break;
            case "execute":
                // Exécution d'un fichier SQL avec un chemin relatif à prisma/sql
                const relativePath = filteredArgs[1];

                if (!relativePath) {
                    console.log("❌ Veuillez spécifier un chemin de fichier SQL relatif à prisma/sql");
                    console.log("Exemple: pnpm run db:execute custom/mon-fichier.sql");
                    return;
                }

                // Construction du chemin relatif à prisma/sql
                await customSqlFile(relativePath, isDocker, isSSL, password);
                break;
            default:
                // Exécution d'un fichier SQL dans le dossier prisma/sql
                await customSqlFile(sqlFileOrCommand, isDocker, isSSL, password);
                break;
        }
    } finally {
        // Fermer l'interface readline à la fin
        closeReadline();
    }
};

main();
