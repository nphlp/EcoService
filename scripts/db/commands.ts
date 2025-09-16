import { databaseExists, executeSqlFile } from "./utils";

/**
 * Configure la base de données en exécutant le fichier setup.sql
 * Vérifie d'abord l'existence de la DB et ne la crée que si nécessaire
 */
export async function setupDb(isDocker: boolean = false, isSSL: boolean = false, password: string): Promise<void> {
    try {
        const sqlFileName = isDocker ? "setup-docker.sql" : "setup.sql";

        // Vérifier l'existence de la base de données
        const dbExistsResult = await databaseExists(password, "eco-service-db", isSSL);

        if (dbExistsResult === true) {
            console.log("ℹ️ Base de données 'eco-service-db' existe déjà");
            return;
        }

        const success = await executeSqlFile(sqlFileName, password, isDocker);

        if (success) {
            console.log(`✅ ${sqlFileName}`);
        }
    } catch (error) {
        console.log("❌ Erreur :", error);
    }
}

/**
 * Réinitialise la base de données en exécutant le fichier reset.sql
 * Supprime la base existante (aucune action si elle n'existe pas)
 */
export async function resetDb(isDocker: boolean = false, isSSL: boolean = false, password: string): Promise<void> {
    try {
        const sqlFileName = isDocker ? "reset-docker.sql" : "reset.sql";

        // Vérifier l'existence de la base de données
        const dbExistsResult = await databaseExists(password, "eco-service-db", isSSL);

        if (dbExistsResult !== true) {
            console.log("ℹ️ Base de données 'eco-service-db' n'existe pas, rien à réinitialiser");
            return;
        }

        const success = await executeSqlFile(sqlFileName, password, isSSL);

        if (success) {
            console.log(`✅ ${sqlFileName}`);
        }
    } catch (error) {
        console.log("❌ Erreur :", error);
    }
}

/**
 * Recharge complètement la base de données
 * Exécute reset.sql (si la DB existe) puis setup.sql dans tous les cas
 */
export async function reloadDb(isDocker: boolean = false, isSSL: boolean = false, password: string): Promise<void> {
    try {
        // Vérifier l'existence et l'accessibilité de la base de données
        const dbExistsResult = await databaseExists(password, "eco-service-db", isSSL);

        // Gestion des erreurs d'accès
        if (dbExistsResult === "ACCESS_DENIED") {
            console.log("❌ Mot de passe MySQL incorrect");
            return;
        }

        if (typeof dbExistsResult === "string") {
            if (dbExistsResult.includes("TLS/SSL") || dbExistsResult.includes("SSL connection error")) {
                console.log("❌ Erreur de connexion SSL à MySQL");
                return;
            }
            if (dbExistsResult.startsWith("ERROR:")) {
                console.log(`❌ ${dbExistsResult}`);
                return;
            }
        }

        // Sélectionner les fichiers SQL selon l'environnement (Docker ou natif)
        const setupFile = isDocker ? "setup-docker.sql" : "setup.sql";
        const resetFile = isDocker ? "reset-docker.sql" : "reset.sql";

        // Réinitialiser uniquement si la base de données existe
        if (dbExistsResult === true) {
            const resetSuccess = await executeSqlFile(resetFile, password, isSSL);
            if (!resetSuccess) {
                console.log("❌ Échec de la réinitialisation de la base de données");
                return;
            }
            console.log(`✅ ${resetFile}`);
        }

        if (dbExistsResult === false) {
            console.log("ℹ️  Base de données inexistante, création directe");
        }

        // Créer/configurer la base de données (toujours exécuté)
        const setupSuccess = await executeSqlFile(setupFile, password, isSSL);
        if (setupSuccess) {
            console.log(`✅ ${setupFile}`);
            console.log("✅ Base de données rechargée");
        }
    } catch (error) {
        console.log("❌ Erreur :", error);
    }
}

/**
 * Exécute un fichier SQL personnalisé sur la base de données existante
 * Vérifie d'abord que la base existe avant d'exécuter le script
 *
 * @param sqlFilePath Le nom du fichier SQL ou le chemin relatif à prisma/sql
 * @param isDocker Mode Docker (ajoute le suffixe -docker.sql si nécessaire)
 * @param isSSL Active la connexion SSL
 * @param password Le mot de passe MySQL root
 */
export async function customSqlFile(
    sqlFilePath: string,
    isDocker: boolean = false,
    isSSL: boolean = false,
    password: string,
): Promise<void> {
    try {
        // S'assurer que la base de données est accessible
        const dbExistsResult = await databaseExists(password, "eco-service-db", isSSL);

        if (dbExistsResult !== true) {
            console.log("❌ Base de données 'eco-service-db' n'existe pas");
            return;
        }

        // Chemin complet fourni (avec sous-dossiers)
        if (sqlFilePath.includes("/")) {
            // Utiliser le chemin exact (relatif à prisma/sql)
            const success = await executeSqlFile(sqlFilePath, password, isSSL);

            if (success) {
                console.log(`✅ ${sqlFilePath}`);
            }
        } else {
            // Nom de fichier simple, appliquer le suffixe Docker si nécessaire
            const sqlFileName = isDocker ? sqlFilePath.replace(".sql", "-docker.sql") : sqlFilePath;
            const success = await executeSqlFile(sqlFileName, password, isSSL);

            if (success) {
                console.log(`✅ ${sqlFileName}`);
            }
        }
    } catch (error) {
        console.log("❌ Erreur :", error);
    }
}
