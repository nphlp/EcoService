import { spawn } from "child_process";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import { join } from "path";
import { createInterface } from "readline";

// Charger les variables d'environnement du fichier .env
dotenv.config({ quiet: true });

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
export async function databaseExists(
    password: string,
    dbName: string,
    isSSL: boolean = false,
): Promise<boolean | string> {
    return new Promise((resolve) => {
        const host = process.env.MYSQL_HOST ?? "localhost";

        // Arguments de base pour MySQL
        const args = ["-u", "root", `-p${password}`, "-h", host];

        // Ajouter les options SSL si on est en mode Docker
        if (isSSL) {
            args.push(
                "--ssl-ca=./docker/certs/ca.pem",
                "--ssl-cert=./docker/certs/client-cert.pem",
                "--ssl-key=./docker/certs/client-key.pem",
            );
        }

        // Ajouter la requête SQL
        args.push("-e", "SHOW DATABASES LIKE '" + dbName + "'");

        const mysql = spawn("mysql", args, {
            stdio: ["pipe", "pipe", "pipe"],
        });

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
                // Si le code d'erreur n'est pas 0, il y a eu un problème
                if (errorOutput.includes("Access denied")) {
                    resolve("ACCESS_DENIED");
                } else {
                    // Retourner l'erreur détaillée au lieu de juste "ERROR"
                    resolve(`ERROR: ${errorOutput.trim()}`);
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
 * @param isSSL Indique si on est en mode Docker (pour SSL)
 */
export async function executeSqlFile(filename: string, password: string, isSSL: boolean = false): Promise<boolean> {
    // Détermine le chemin du fichier SQL (toujours relatif à prisma/sql)
    const filePath = join(process.cwd(), "prisma", "sql", filename);

    try {
        const host = process.env.MYSQL_HOST ?? "localhost";

        const fileContent = readFileSync(filePath, "utf-8");

        // Arguments de base pour MySQL
        const args = ["-u", "root", `-p${password}`, "-h", host];

        // Ajouter les options SSL si on est en mode Docker
        if (isSSL) {
            args.push(
                "--ssl-ca=./docker/certs/ca.pem",
                "--ssl-cert=./docker/certs/client-cert.pem",
                "--ssl-key=./docker/certs/client-key.pem",
            );
        }

        // Ajouter le contenu SQL
        args.push("-e", fileContent);

        const mysql = spawn("mysql", args, {
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
