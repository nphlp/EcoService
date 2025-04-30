import { spawn } from "child_process";
import { readFileSync } from "fs";
import { join } from "path";
import { createInterface } from "readline";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const question = (query: string): Promise<string> => {
    return new Promise((resolve) => {
        rl.question(query, resolve);
    });
};

// Fonction pour vérifier si une base de données existe
async function databaseExists(password: string, dbName: string): Promise<boolean | string> {
    return new Promise((resolve) => {
        const mysql = spawn(
            "mysql",
            ["-u", "root", `--password=${password}`, "-e", "SHOW DATABASES LIKE '" + dbName + "'"],
            {
                stdio: ["pipe", "pipe", "pipe"],
            },
        );

        let output = "";
        let errorOutput = "";

        mysql.stdout.on("data", (data) => {
            output += data.toString();
        });

        mysql.stderr.on("data", (data) => {
            const errorMsg = data.toString();
            if (!errorMsg.includes("Using a password on the command line interface can be insecure")) {
                errorOutput += errorMsg;
            }
        });

        mysql.on("close", (code) => {
            if (code !== 0) {
                // Si le code d'erreur n'est pas 0, il y a eu un problème (probablement mot de passe incorrect)
                if (errorOutput.includes("Access denied")) {
                    resolve("ACCESS_DENIED");
                } else {
                    resolve("ERROR");
                }
            } else {
                // Si la base de données existe, le résultat contiendra son nom
                resolve(output.includes(dbName));
            }
        });
    });
}

async function executeSqlFile(password: string, filename: string): Promise<boolean> {
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

async function executeMultipleFiles(files: string[], passwordArg?: string): Promise<boolean> {
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

async function main() {
    try {
        const sqlFile = process.argv[2];
        const passwordArg = process.argv[3];
        if (!sqlFile) {
            console.log("❌ Veuillez spécifier un fichier SQL");
            return; // Ne pas quitter avec un code d'erreur
        }

        if (sqlFile === "reload") {
            const success = await executeMultipleFiles(["reset.sql", "setup.sql"], passwordArg);
            if (success) {
                console.log("✅ Base de données rechargée");
            }
            return; // Toujours quitter avec succès
        }

        const password = passwordArg || (await question("🔑 Mot de passe MySQL : "));
        const success = await executeSqlFile(password, sqlFile);

        if (success) {
            console.log(`✅ ${sqlFile}`);
        }
        // Ne pas quitter avec un code d'erreur
    } catch (error) {
        console.log("❌ Erreur :", error); // Utiliser console.log au lieu de console.error
    } finally {
        rl.close();
    }
}

main();
