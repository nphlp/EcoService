import { spawn } from "child_process";
import { readFileSync } from "fs";
import { join } from "path";
import { databaseExists } from "./utils";

/**
 * Exécute un fichier SQL avec MySQL
 */
export async function executeSqlFile(password: string, filename: string): Promise<boolean> {
    const sqlPath = join(process.cwd(), "prisma", "sql", filename);
    const sqlContent = readFileSync(sqlPath, "utf-8");

    // Si c'est un fichier reset.sql, vérifier d'abord si la base de données existe
    if (filename === "reset.sql") {
        const dbExistsResult = await databaseExists(password, "eco-service-db");

        if (dbExistsResult === "ACCESS_DENIED") {
            console.log("❌ Mot de passe MySQL incorrect");
            return false;
        } else if (dbExistsResult === "ERROR") {
            console.log("❌ Erreur MySQL");
            return false;
        } else if (dbExistsResult === false) {
            console.log("❌ Base de données 'eco-service-db' inexistante");
            return false; // On considère que c'est un échec car l'opération n'a pas pu être effectuée
        }
    }

    const mysql = spawn("mysql", ["-u", "root", `--password=${password}`, "-e", sqlContent], {
        stdio: ["pipe", "pipe", "pipe"],
    });

    let errorOutput = "";

    mysql.stdout.on("data", (data) => {
        console.log(data.toString());
    });

    mysql.stderr.on("data", (data) => {
        const errorMsg = data.toString();
        if (!errorMsg.includes("Using a password on the command line interface can be insecure")) {
            errorOutput += errorMsg;
        }
    });

    return new Promise((resolve) => {
        mysql.on("close", (code) => {
            if (code === 0) {
                resolve(true);
            } else if (errorOutput.includes("Can't drop database") && errorOutput.includes("database doesn't exist")) {
                console.log("❌ Base de données inexistante");
                resolve(false);
            } else if (errorOutput.includes("Operation CREATE USER failed")) {
                console.log("ℹ️ L'utilisateur existe déjà");
                resolve(true);
            } else if (errorOutput.includes("Access denied")) {
                console.log("❌ Mot de passe MySQL incorrect");
                resolve(false);
            } else {
                console.log("❌ Erreur SQL : " + errorOutput.trim());
                resolve(false);
            }
        });
    });
}

/**
 * Exécute plusieurs fichiers SQL en séquence
 */
export async function executeMultipleFiles(files: string[], passwordArg?: string): Promise<boolean> {
    if (files.length === 0) return true;

    const password = passwordArg || (await question("🔑 Mot de passe MySQL : "));

    // Si nous sommes en train de faire un reload (reset.sql + setup.sql)
    if (files.includes("reset.sql") && files.includes("setup.sql")) {
        // Vérifier si la base de données existe
        const dbExistsResult = await databaseExists(password, "eco-service-db");

        if (dbExistsResult === "ACCESS_DENIED") {
            console.log("❌ Mot de passe MySQL incorrect");
            return false;
        } else if (dbExistsResult === "ERROR") {
            console.log("❌ Erreur MySQL");
            return false;
        } else if (dbExistsResult === false) {
            // Si la base n'existe pas, exécuter uniquement setup.sql
            console.log("ℹ️ Base de données inexistante, création directe sans reset");
            const success = await executeSqlFile(password, "setup.sql");
            if (success) {
                console.log(`✅ setup.sql`);
                return true;
            } else {
                return false;
            }
        }
    }

    // Exécution normale de tous les fichiers
    let allSuccessful = true;
    for (const file of files) {
        const success = await executeSqlFile(password, file);
        if (success) {
            console.log(`✅ ${file}`);
        } else {
            allSuccessful = false;
            break; // Arrêter si une erreur se produit
        }
    }

    return allSuccessful;
}

// Import de la fonction question depuis utils
import { question } from "./utils";
