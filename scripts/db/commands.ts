import { executeMultipleFiles, executeSqlFile } from "./fileUtils";
import { closeReadline, question } from "./utils";

/**
 * Configure la base de données en exécutant le fichier setup.sql
 */
export async function setupDb(isProd: boolean = false, passwordArg?: string): Promise<void> {
    try {
        const sqlFileName = isProd ? "setup-prod.sql" : "setup.sql";
        const password = passwordArg || (await question("🔑 Mot de passe MySQL : "));
        const success = await executeSqlFile(password, sqlFileName);

        if (success) {
            console.log(`✅ ${sqlFileName}`);
        }
    } catch (error) {
        console.log("❌ Erreur :", error);
    } finally {
        closeReadline();
    }
}

/**
 * Réinitialise la base de données en exécutant le fichier reset.sql
 */
export async function resetDb(isProd: boolean = false, passwordArg?: string): Promise<void> {
    try {
        const sqlFileName = isProd ? "reset-prod.sql" : "reset.sql";
        const password = passwordArg || (await question("🔑 Mot de passe MySQL : "));
        const success = await executeSqlFile(password, sqlFileName);

        if (success) {
            console.log(`✅ ${sqlFileName}`);
        }
    } catch (error) {
        console.log("❌ Erreur :", error);
    } finally {
        closeReadline();
    }
}

/**
 * Recharge la base de données en exécutant reset.sql puis setup.sql
 */
export async function reloadDb(isProd: boolean = false, passwordArg?: string): Promise<void> {
    try {
        const files = isProd ? ["reset-prod.sql", "setup-prod.sql"] : ["reset.sql", "setup.sql"];
        const success = await executeMultipleFiles(files, passwordArg);
        if (success) {
            console.log("✅ Base de données rechargée");
        }
    } catch (error) {
        console.log("❌ Erreur :", error);
    } finally {
        closeReadline();
    }
}

/**
 * Exécute un fichier SQL personnalisé
 */
export async function customSqlFile(sqlFile: string, isProd: boolean = false, passwordArg?: string): Promise<void> {
    try {
        // Déterminer le fichier SQL à utiliser en fonction du mode
        const sqlFileName = isProd ? sqlFile.replace(".sql", "-prod.sql") : sqlFile;

        const password = passwordArg || (await question("🔑 Mot de passe MySQL : "));
        const success = await executeSqlFile(password, sqlFileName);

        if (success) {
            console.log(`✅ ${sqlFileName}`);
        }
    } catch (error) {
        console.log("❌ Erreur :", error);
    } finally {
        closeReadline();
    }
}
