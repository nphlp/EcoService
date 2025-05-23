import { databaseExists, executeSqlFile } from "./utils";

/**
 * Configure la base de données en exécutant le fichier setup.sql
 * Test si la DB existe et la crée que si nécessaire
 */
export async function setupDb(isDocker: boolean = false, password: string): Promise<void> {
    try {
        const sqlFileName = isDocker ? "setup-docker.sql" : "setup.sql";

        // Vérifier si la base de données existe déjà
        const dbExistsResult = await databaseExists(password, "eco-service-db", isDocker);

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
 * Vérifie si la DB existe et la supprime si nécessaire
 */
export async function resetDb(isDocker: boolean = false, password: string): Promise<void> {
    try {
        const sqlFileName = isDocker ? "reset-docker.sql" : "reset.sql";

        // Vérifier si la base de données existe
        const dbExistsResult = await databaseExists(password, "eco-service-db", isDocker);

        if (dbExistsResult !== true) {
            console.log("ℹ️ Base de données 'eco-service-db' n'existe pas, rien à réinitialiser");
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
 * Recharge la base de données en exécutant reset.sql puis setup.sql
 * Reset si besoin puis crée la DB
 */
export async function reloadDb(isDocker: boolean = false, password: string): Promise<void> {
    try {
        // Vérifier si la base de données existe
        const dbExistsResult = await databaseExists(password, "eco-service-db", isDocker);

        if (dbExistsResult === "ACCESS_DENIED") {
            console.log("❌ Mot de passe MySQL incorrect");
            return;
        } else if (typeof dbExistsResult === "string") {
            if (dbExistsResult.includes("TLS/SSL")) {
                console.log(
                    "❌ It's looks like you're in a Docker container...",
                    "\n   Try adding the --docker flag to use SSL :",
                    `\n   ➡️  \x1b[1mpnpm run db:${process.argv[2]} --docker\x1b[0m`,
                );
                console.log("");
                return;
            } else if (dbExistsResult.startsWith("ERROR:")) {
                console.log(`❌ ${dbExistsResult}`);
                return;
            }
        }

        // Si la base n'existe pas, exécuter uniquement setup.sql
        if (dbExistsResult === false) {
            console.log("ℹ️ Base de données inexistante, création directe sans reset");
            const setupFile = isDocker ? "setup-docker.sql" : "setup.sql";
            const success = await executeSqlFile(setupFile, password, isDocker);
            if (success) {
                console.log(`✅ ${setupFile}`);
            }
            return;
        }

        // Si la base existe, exécuter reset.sql puis setup.sql
        const resetFile = isDocker ? "reset-docker.sql" : "reset.sql";
        const resetSuccess = await executeSqlFile(resetFile, password, isDocker);

        if (!resetSuccess) {
            console.log("❌ Échec de la réinitialisation de la base de données");
            return;
        }

        console.log(`✅ ${resetFile}`);

        const setupFile = isDocker ? "setup-docker.sql" : "setup.sql";
        const setupSuccess = await executeSqlFile(setupFile, password, isDocker);

        if (setupSuccess) {
            console.log(`✅ ${setupFile}`);
            console.log("✅ Base de données rechargée");
        }
    } catch (error) {
        console.log("❌ Erreur :", error);
    }
}

/**
 * Exécute un fichier SQL personnalisé
 * Teste si la DB existe et exécute le script
 * @param sqlFilePath Le nom du fichier SQL ou le chemin relatif à prisma/sql
 * @param isDocker Indique si on est en mode Docker
 * @param password Le mot de passe MySQL
 */
export async function customSqlFile(sqlFilePath: string, isDocker: boolean = false, password: string): Promise<void> {
    try {
        // Vérifier si la base de données existe
        const dbExistsResult = await databaseExists(password, "eco-service-db", isDocker);

        if (dbExistsResult !== true) {
            console.log("❌ Base de données 'eco-service-db' n'existe pas");
            return;
        }

        // Si c'est un chemin avec des dossiers (contient '/')
        if (sqlFilePath.includes("/")) {
            // Utiliser le chemin tel quel (toujours relatif à prisma/sql)
            const success = await executeSqlFile(sqlFilePath, password, isDocker);

            if (success) {
                console.log(`✅ ${sqlFilePath}`);
            }
        } else {
            // C'est juste un nom de fichier, appliquer la logique Docker si nécessaire
            const sqlFileName = isDocker ? sqlFilePath.replace(".sql", "-docker.sql") : sqlFilePath;
            const success = await executeSqlFile(sqlFileName, password, isDocker);

            if (success) {
                console.log(`✅ ${sqlFileName}`);
            }
        }
    } catch (error) {
        console.log("❌ Erreur :", error);
    }
}
