import { spawn } from "child_process";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import { join } from "path";
import { createInterface } from "readline";

// Charger les variables d'environnement du fichier .env
dotenv.config();

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

/**
 * Pose une question à l'utilisateur via le terminal
 */
export const question = (query: string): Promise<string> => {
    return new Promise((resolve) => {
        rl.question(query, resolve);
    });
};

/**
 * Ferme l'interface readline
 */
export const closeReadline = (): void => {
    rl.close();
};

/**
 * Récupère le mot de passe MySQL depuis l'environnement ou l'utilisateur
 */
export async function getMySqlPassword(): Promise<string> {
    // Vérifier d'abord la variable d'environnement
    const envPassword = process.env.MYSQL_ROOT_PASSWORD;

    if (envPassword) {
        return envPassword;
    }

    // Sinon demander à l'utilisateur
    return new Promise((resolve) => {
        rl.question("🔑 Mot de passe MySQL : ", resolve);
    });
}

/**
 * Vérifie si une base de données existe
 */
export async function databaseExists(password: string, dbName: string): Promise<boolean | string> {
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

/**
 * Exécute un fichier SQL avec MySQL
 * @param filename Le nom du fichier SQL ou le chemin relatif à prisma/sql
 * @param password Le mot de passe MySQL
 */
export async function executeSqlFile(filename: string, password: string): Promise<boolean> {
    // Détermine le chemin du fichier SQL (toujours relatif à prisma/sql)
    const filePath = join(process.cwd(), "prisma", "sql", filename);

    try {
        const fileContent = readFileSync(filePath, "utf-8");

        const mysql = spawn("mysql", ["-u", "root", `--password=${password}`, "-e", fileContent], {
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
                } else {
                    console.log("❌ Erreur SQL : " + errorOutput.trim());
                    resolve(false);
                }
            });
        });
    } catch (error) {
        console.log(`❌ Erreur lors de la lecture du fichier ${filePath} : ${error}`);
        return false;
    }
}
